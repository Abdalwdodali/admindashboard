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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  home:any=0;
  constructor(private barchart:BarchartService,private share:ShareDateService,private authService:AuthUsersService,private http:HttpClient,private router: Router,private route: ActivatedRoute){
    this.get();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  listCategory:any=[];items:any=[];listType:any=[];listProduct:any=[];
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
  //_____________________________________________________________
  arrayLabelsPie:any=[];
  arrayDataPie:any=[];
  public pieChartOptions: ChartOptions<'pie'> = {responsive: true,
    maintainAspectRatio: false, // Adjust this based on your layout needs
  };
  public pieChartLabels = [];
  public pieChartDatasets = [{data: []}];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  //________________________________________________________________________________________________________________
  public canvasStyle: { [key: string]: string } = {
    'border': '1px solid #ccc',
    'backgroundColor':'#098',
    'border-radius': '5px',
  };
  
  screenWidth:any;screenHeight:any;
  @HostListener('window:resize', ['$event'])
    onWindowResize(event: any): void {
      if (window.innerHeight < 600) {
        alert();
        window.resizeTo(600, window.innerHeight);
      }
    }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
   
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if( this.home==1){
    if(this.screenWidth>1000){
      if(this.screenWidth<1500){
      $('.chartBox').css({'width':'40%'});
      }
      else{
      $('.chartBox').css({'width':'30%'});
    }}
    if(this.screenWidth<1000){
      $('.chartBox').css({'width':'100%'});$('.chartBox').css({'padding-left':'0%'});
    }}
  }
  OneCatigure(id:number,name:string){
    this.http.get(`https://abdulwadoud.pythonanywhere.com/category/${id}/`).subscribe((response: any) => {
      this.home=1;
  
        if(this.screenWidth>1000){
         
          if(this.screenWidth<1500){
            $('.Box').css('width','90%'); $('.chartBox').css({'width':'40%'});
            }
            else{
              $('.Box').css('width','90%'); $('.chartBox').css({'width':'30%'});
          }
        }
        if(this.screenWidth<1000){
          $('.Box').css('width','100%');$('.chartBox').css({'width':'100%'});
        }
   
      $('.BoxTypeBySearch').show();
      $('.chartBoxPie').hide();
  
      this.listType = response;
      this.array_get_cars_ = response;
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
  //________________________________________________________________________
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
  //________________________________________________________________________
  
  currentIndex = 0;
  showNextImage(){
    $('.catigure').css('left','60px');
    setTimeout(function() {
      $('.catigure').css('left','0px');
    }, 100);
    this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.updateList();
  }
  
  showPreviousImage() {  $('.catigure').css('left','-60px');
  setTimeout(function() {
    $('.catigure').css('left','0px');
  },100);
    this.currentIndex = this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
      this.updateList();
  }
  updateList() {
    const shiftedItems = this.items.slice(this.currentIndex);
    const wrappedItems = this.items.slice(0, this.currentIndex);
    this.listCategory = [...shiftedItems, ...wrappedItems];
  }
  
  
  
  
  
  
  chartWidth = 1000; 
  chartHeight = 550;
  
  
  userList:any;
  array_get_cars_:any=[];
  filterValue: string = ''; 
  filterList(): void {
    this.listType = this.array_get_cars_.filter((item:any) =>
      item.name.toLowerCase().includes(this.filterValue.toLowerCase())
    );
   }
  
  
  linkNavi:any;
  
  back(){
    this.router.navigate(['']);
  }
  
  DownloadImage(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response);
      link.download = 'image.jpg';
      link.click();
      URL.revokeObjectURL(link.href);
    });}
  
  deleteType(id:any,name:string){
      if (confirm("Do you want to proceed?")){
         this.http.delete('https://abdulwadoud.pythonanywhere.com/api/type/'+id+'/').subscribe((Response:any)=>{
           this.OneCatigure(id,name);this.ngOnInit();
        },
        error=>{});}}
  deleteCategory(id:any){
    if (confirm("Do you want to proceed?")) {
      this.http.delete('https://abdulwadoud.pythonanywhere.com/api/category/'+id+'/').subscribe((Response:any)=>{
        this.get();$('.save_all').show();
        setTimeout(() => {  
          $('.save_all').hide();
        }, 1000);
     },
     error=>{});}
  }
  DeleteProduct(id:any){
    if (confirm("Do you want to proceed?")) {
      this.http.delete('https://abdulwadoud.pythonanywhere.com/api/product/'+id+'/').subscribe((Response:any)=>{
        this.get();
     },
     error=>{});}
  }
  type:any;
  UpdateProduct(id:any,type:any){this.type=type;
  $('.add_box_product').show();
  this.UpdateAdd='Update';this.id_marke=id;
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
  return this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/'+id+'/',{headers}).subscribe((Response:any)=>{
    this.array_get_cars_filter=Response;
    this.name=this.array_get_cars_filter.name;
    this.description=this.array_get_cars_filter.description;
    this.prise=this.array_get_cars_filter.prise;
    this.imageFileNameaddProduct=this.array_get_cars_filter.image_1;
    this.imageFileName_2=this.array_get_cars_filter.image_2;
    this.imageFileName3=this.array_get_cars_filter.image_3;
    this.imageFileName4=this.array_get_cars_filter.image_4;
      
  },error=>{alert('error');});
  }
  imageFileName2:any;titelAddType:any='';IdCategory:any;
  AddCategory2:any;fileAddTypePost:any;formData:any;
  AddTypePost(){
    if(this.fileAddTypePost && this.titelAddType){
    this.formData = new FormData();
    this.formData.append('name', this.titelAddType);
    this.formData.append('image', this.fileAddTypePost);
    this.formData.append('category', this.IdCategory);
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
     this.http.post('https://abdulwadoud.pythonanywhere.com/api/type/', this.formData,{headers}).subscribe((response:any) => {
      $('.add_box_').hide();this.ngOnInit();
       },
       (error) => {alert('Error uploading file:');});}
 if(this.titelAddType==''){
        $('.InputTittle').css('background-color','rgba(200,0,0,.3)');
        setTimeout(function() {
          $('.InputTittle').css('background-color','#FFF');
        }, 100);
        }
if(!this.fileAddTypePost){
          $('.set_image_big').css({'color':'rgba(200,0,0,.6)','font-size':'60px'});
          setTimeout(function() {
            $('.set_image_big').css({'color':'#f7cb9c','font-size':'50px'});
          }, 200);
          }

  }
  back_(){$('.add_box_').hide();}
  onFileSelected_1(event:any){
  
    this.fileAddTypePost = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {this.imageFileName2 = e.target.result;};
      reader.readAsDataURL(input.files[0]);
    }
  }
  AddType(id:any){
  $('.add_box_').show();this.IdCategory=id;
  
  }
  
  imageFileNameaddProduct:any;
  name_component=localStorage.getItem('dataValue');
  
  imageFileName_2 :any;
  imageFileName3:any;
  imageFileName4:any;
  name:any;prise:any;description:any;
  file_1_addProduct:any=null;
  file_2:any=null;
  file_3:any=null;
  file_4:any=null;
  onFileSelected1addproduct(event: any) {
    this.file_1_addProduct = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {this.imageFileNameaddProduct = e.target.result;};
      reader.readAsDataURL(input.files[0]);
    }}
  onFileSelected2(event: any) {this.file_2 = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {this.imageFileName_2 = e.target.result;};
      reader.readAsDataURL(input.files[0]);
    }}
  onFileSelected3(event: any) {this.file_3 = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {this.imageFileName3 = e.target.result;};
      reader.readAsDataURL(input.files[0]);
    }}
  onFileSelected4(event: any) {this.file_4 = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {this.imageFileName4 = e.target.result;};
      reader.readAsDataURL(input.files[0]);
    }}
    imageFileName='images/add.png';
    getImagePath() {
      return `assets/${this.imageFileName}`;
    }
    array_get_cars:any=[];
  
    local_id:any;objectName:any;objectId:any;username_login:any;
    ngOnInit(){
          this.objectId = this.route.snapshot.paramMap.get('id');
          this.objectName = this.route.snapshot.paramMap.get('Name');
          this.http.get('https://abdulwadoud.pythonanywhere.com/api/category/').subscribe((Response:any)=>{
               for(let i=0;i<Response.length;i++){
                   if(Response[i].name==this.objectName){
                         this.http.get('https://abdulwadoud.pythonanywhere.com/category/'+Response[i].id+'/').subscribe((Response:any)=>{
                            this.listType=Response;
                            this.array_get_cars_=Response;  
                            $('.BoxTypeBySearch').show();
                            $('.chartBoxPie').hide();
                            $('.chartBox').css('width','30%');
  });
}}},
      error=>{});
const storedUsername = this.authService.getIsfirstentry();this.username_login= this.authService.getUsername();
 if(storedUsername=='true'){$('.firstentry').show();
}
  }
  firstEntry(){
    $('.firstentry').hide();
    this.authService.Setfirstentry('false');
  }
    formData__:any;
    id_marke:any;
    offer:any;    
    mainPrice:any;
    profit:any;
    tax:any;


    AddProduct(id:any){this.id_marke=id;$('.add_box_product').show();}
    UpdateAdd=localStorage.getItem('dataValue_2');
    add(event:any){this.post(this.file_1_addProduct,this.file_2,this.file_3,this.file_4);}
    post(image_1: File,image_2: File,image_3: File,image_4: File) { 
     if(this.name&&this.prise&&this.offer&&this.mainPrice&&this.profit&&this.tax&&this.description&&image_1){
      this.formData__ = new FormData();
      this.formData__.append('name', this.name);
      this.formData__.append('prise', this.prise);
      this.formData__.append('offer', this.offer);
      this.formData__.append('mainPrice', this.mainPrice);
      this.formData__.append('profit', this.profit);
      this.formData__.append('tax', this.tax);
      this.formData__.append('description', this.description);
      if(image_1){this.formData__.append('image_1', image_1);}
      if(image_2){this.formData__.append('image_2', image_2);}
      if(image_3){this.formData__.append('image_3', image_3);}
      if(image_4){this.formData__.append('image_4', image_4);}
      this.formData__.append('type',''+this.id_marke+'');
      this.formData__.append('nameColor', ''+this.nameColor+'');
      const access_token= this.authService.getAccessToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
       this.http.post('https://abdulwadoud.pythonanywhere.com/api/product/', this.formData__,{headers}).subscribe((response:any) => {
        $('.add_box_product').hide();
        this.router.navigate(['/category/type',this.id_marke]);
         },
         (error) => {alert('Error uploading file:');});
        }
        else{
          if(!this.name){ $('.name').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.name').css('background-color','#FFF');;}, 100);}
          if(!this.tax){ $('.tax').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.tax').css('background-color','#FFF');;}, 100);}
          if(!this.prise){ $('.prise').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.prise').css('background-color','#FFF');;}, 100);}
          if(!this.mainPrice){ $('.mainPrice').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.mainPrice').css('background-color','#FFF');;}, 100);}
          if(!this.profit){ $('.profit').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.profit').css('background-color','#FFF');;}, 100);}
          if(!this.offer){ $('.offer').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.offer').css('background-color','#FFF');;}, 100);}
          if(!image_1){ $('.set_image_big').css('color','rgba(200,0,0,.4)');setTimeout(function() {$('.set_image_big').css('color','#353535');;}, 300);}
        }
    }
    nameColor:any='';
    id:any;
    GetColor(event:any,color:any){
      this.nameColor=color;$('.ChoiceColor li').css('outline','none');$('.ChoiceColor li').css('border','none');
      event.style.border= '1px solid #FFF';event.style.outline='1px solid '+this.nameColor;
      if(this.nameColor=='white'){event.style.outline='1px solid #999';}
    }
    Colors:any[] = [
      {value: 'red', viewValue: 'red'},
      {value: 'blue', viewValue: 'blue'},
      {value: 'green', viewValue: 'green'},
      {value: 'white', viewValue: 'white'},
      {value: 'Gray', viewValue: 'gray'},
      {value: 'yellow', viewValue: 'yellow'},
      {value: 'brown', viewValue: 'brown'},
      {value: 'black', viewValue: 'Black'},
  
    ];
    clickInput(){
      $('.backgroundSearch').show();
    }
    backgroundSearch(){
      $('.backgroundSearch').hide();
    }
  
  getFileNameFromUrl(url: string): string {
    const matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return '';
  }
  array_get_cars_filter:any=[];
  get_id(id:any){
   
  }
  downloadImageAsFile(imageUrl: string): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe(
        (response: any) => {
          const fileName = this.getFileNameFromUrl(imageUrl);
          const file = new File([response], fileName);
          resolve(file);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
  
  has_error='';
 
  back_products(){
    $('.add_box_product').hide();
  }
  
}
