import { Component,HostListener ,OnInit} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthUsersService } from '../auth-users.service';
import { Router } from '@angular/router';
import { ShareDateService } from '../share-date.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BarchartService } from '../barchart.service';
import { forkJoin } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 24,
      lng: 12
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  constructor(private barchart:BarchartService,private share:ShareDateService,private authService:AuthUsersService,private http:HttpClient,private router: Router,private route: ActivatedRoute){
    this.get();
  }
  currentIndex = 0;
  showPreviousImage() {  $('.catigure').css('left','-60px');
  setTimeout(function() {
    $('.catigure').css('left','0px');
  },100);
    this.currentIndex = this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
      this.updateList();
  }
  showNextImage(){
    $('.catigure').css('left','60px');
    setTimeout(function() {
      $('.catigure').css('left','0px');
    }, 100);
    this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.updateList();
  }
  updateList() {
    const shiftedItems = this.items.slice(this.currentIndex);
    const wrappedItems = this.items.slice(0, this.currentIndex);
    this.listCategory = [...shiftedItems, ...wrappedItems];
  }
  listCategory:any=[];items:any=[];listType:any=[];listProduct:any=[];
  OneCatigure(id:number,name:string){
    this.http.get(`https://abdulwadoud.pythonanywhere.com/category/${id}/`).subscribe((response: any) => {
      this.listType = response;
      this.lineChartData.datasets[0].label = name;
      this.arrayData = [];this.arrayLabels = [];
      const observables = this.listType.map((item:any) => {
        return this.barchart.get_ProductFromType(item.id);
      });
      forkJoin(observables).subscribe(
        (responses:any) => {
          for (let i = 0; i < responses.length; i++) {
            if(i===0){this.arrayData.push(i);this.arrayLabels.push('');}
            this.arrayData.push(responses[i]);
            this.arrayLabels.push(this.listType[i].name);
          }
          this.lineChartData.labels = this.arrayLabels;
          this.lineChartData.datasets[0].data = this.arrayData;
          this.lineChartData = { ...this.lineChartData };    
        });
    });
  }
  get(){ 
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
      return this.http.get('https://abdulwadoud.pythonanywhere.com/api/category/',{headers}).subscribe((Response:any)=>{
        this.listCategory=Response;
        this.items=Response;
        const observables = this.listCategory.map((item:any) => {                    //http://127.0.0.1:8000/category/2/
          return this.barchart.get_TypeFromCategory(item.id);
        });
        forkJoin(observables).subscribe(
          (responses:any) => {
            for (let i = 0; i < responses.length; i++) {
  
              this.arrayDataPie.push(responses[i]);
              this.arrayLabelsPie.push(this.listCategory[i].name);
  
            }
            this.pieChartLabels = this.arrayLabelsPie;
            this.pieChartDatasets[0].data = this.arrayDataPie;
          });
  },
  error=>{});
  }
  arrayLabels:any=['2','6','4','1','9','8','5','3'];
  arrayData:any=[2,6,4,1,9,8,5,3];
  public tittel ='';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.arrayLabels,
    datasets: [
      {
        data: this.arrayData,
        label: this.tittel,
        fill: true,
        tension: 0,
        borderColor: '#dfb78d',
        backgroundColor: 'rgba(223, 183, 141,.3)'
      },
  
    ]
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Adjust this based on your layout needs
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)' // Change grid color
        }
      }
    }
  };
  public lineChartLegend = true;
  arrayLabelsPie:any=[];
  arrayDataPie:any=[];
  public pieChartOptions: ChartOptions<'pie'> = {responsive: true,
    maintainAspectRatio: false, // Adjust this based on your layout needs
  };
  public pieChartLabels = [];
  public pieChartDatasets = [{data: []}];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  IdCategory:any;
}