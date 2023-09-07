import { Component } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { AuthUsersService } from '../auth-users.service';
import {  Router } from '@angular/router';
import { ShareDateService } from '../share-date.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(private route: ActivatedRoute,private http: HttpClient, private authService: AuthUsersService, private router: Router, private share: ShareDateService) {}
  objectId:any;objectName:any;prise:any;NameProduct:any;offer:any;
  getProductsByName(productName: string, productType: string): any[] {
    return this.listProduct.filter((product:any) => product.name === productName && product.type === productType);
  }
  listProduct:any;

  ngOnInit(){
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
      this.objectId = this.route.snapshot.paramMap.get('id');
      this.objectName= this.route.snapshot.paramMap.get('Name'); 
       this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/'+this.objectId+'/',{headers}).subscribe((Response:any)=>{
        this.NameProduct=Response.name;this.RouteBack='category/type/'+Response.type;
        this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/',{headers}).subscribe((Response:any)=>{
          this.listProduct=Response;
        });
        $('.displayProduct .image_1 img').hover(function() {$('.displayProduct .image_1 img').css('transform',' scale(1.2,1.2)');},function() {$('.displayProduct .image_1 img').css('transform','scale(1,1)');});
        this.response_=Response;
        this.prise=this.response_.prise;
        this.offer=this.response_.offer;
        this.HowManyImages=0;
    
        if(this.response_.image_1){this.imagesDisplay[0]=this.response_.image_1;this.HowManyImages+=1;}
        if(this.response_.image_2){this.imagesDisplay[1]=this.response_.image_2;this.HowManyImages+=1;}
        if(this.response_.image_3){this.imagesDisplay[2]=this.response_.image_3;this.HowManyImages+=1;}
        if(this.response_.image_4){this.imagesDisplay[3]=this.response_.image_4;this.HowManyImages+=1;}

        this.description=this.response_.description.replace(/\n/g, '<br>');
        
       this.http.get('https://abdulwadoud.pythonanywhere.com/CommentByProduct/'+this.objectId+'/',{headers}).subscribe((Response:any)=>{ 
        this.filter_Commentcar=Response;
        for(let i=0;i<this.filter_Commentcar.length;i++){
          this.all_referance=this.all_referance+this.filter_Commentcar[i].rating;
        }
        if(this.all_referance!=0){
        this.all_referance=this.all_referance/this.filter_Commentcar.length;
        this.all_referance = Math.round( this.all_referance * 10) / 10;
        this.all_referance = Math.round(this.all_referance * 2) / 2;
        this.floatOrInt=Number.isInteger(this.all_referance);
      }
      });
  
  },
  error=>{});}
  
  changeColor(event:any,color:any,i:any){
    $('.color li').css('outline','none');$('.color li').css('border','none');this.all_referance=0;
    this.prise=color.prise;
    this.offer=color.offer;
    event.style.border= '1px solid #FFF';event.style.outline='1px solid '+color.nameColor;
    this.HowManyImages=0;
    if(color.nameColor=='white'){event.style.outline='1px solid #999';}
    if(color.image_1){this.imagesDisplay[0]=color.image_1;this.HowManyImages+=1;}
    if(color.image_2){this.imagesDisplay[1]=color.image_2;this.HowManyImages+=1;}
    if(color.image_3){this.imagesDisplay[2]=color.image_3;this.HowManyImages+=1;}
    if(color.image_4){this.imagesDisplay[3]=color.image_4;this.HowManyImages+=1;}
      
    this.description=color.description.replace(/\n/g, '<br>');
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
  
    this.http.get('https://abdulwadoud.pythonanywhere.com/CommentByProduct/'+color.id+'/',{headers}).subscribe((Response:any)=>{ 
      this.filter_Commentcar=Response;
      for(let i=0;i<this.filter_Commentcar.length;i++){
        this.all_referance=this.all_referance+this.filter_Commentcar[i].rating;
      }
      if(this.all_referance!=0){
      this.all_referance=this.all_referance/this.filter_Commentcar.length;
      this.all_referance = Math.round( this.all_referance * 10) / 10;
      this.all_referance = Math.round(this.all_referance * 2) / 2;
      this.floatOrInt=Number.isInteger(this.all_referance);
    }
    });
  
  }
  RouteBack:any;
  back_display(){
    $('.display').hide(); this.counter=0; this.all_referance=0; this.router.navigate([this.RouteBack]);
  }
  stars = [1, 2, 3, 4, 5];imagesDisplay:any=[];filter_Commentcar:any;description:any;
  floatOrInt:any;counter=0;
  all_referance=0;response_:any=[];
  id_marke:any=''; 
  HowManyImages:any=0;
  next_image(){
      this.counter++;
      if(this.counter==this.HowManyImages){this.counter=0;} 
  }
  right(){this.counter++;if(this.counter==this.HowManyImages){this.counter=0;}}
  left(){if(this.counter!=0){this.counter--;} }
}
