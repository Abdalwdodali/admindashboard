import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthUsersService } from '../auth-users.service';
import { Router } from '@angular/router';
import { ShareDateService } from '../share-date.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)',transition:'all .8s'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class TypeComponent {
  constructor(private share:ShareDateService,private authService:AuthUsersService,private http:HttpClient,private router: Router,private route: ActivatedRoute){this.get();}

  listCategory:any=[];items:any=[];listType:any=[];listProduct:any=[];
DeleteProduct(id:number){
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
  
    if (confirm("Do you want to proceed?")) {
      this.http.delete('https://abdulwadoud.pythonanywhere.com/api/product/'+id+'/',{headers}).subscribe((Response:any)=>{
        this.get();
        this.ngOnInit();
        $('.save_all').show();
        setTimeout(() => {  
          $('.save_all').hide();
        }, 1000);
     },
     error=>{});}
  }
  get(){ 
    return this.http.get('https://abdulwadoud.pythonanywhere.com/api/category/').subscribe((Response:any)=>{
      this.listCategory=Response;
      this.items=Response;
},
error=>{});
}
back_products(){
  $('.add_box_product').hide();
  this.nameColorAdd='';
  this.offerColorAdd='';
  this.mainPriceColorAdd='';
  this.profitColorAdd='';
  this.taxColorAdd='';
  this.descriptionColorAdd='';
this.nameColor='';
  this.priseColorAdd='';
  this.imageFileNameColor1=null;
  this.imageFileNameColor2=null;
  this.imageFileNameColor3=null;
  this.imageFileNameColor4=null;
  $('.name').show();

}
idColorMainProduct:any;
nameColorMainProduct:any;
typeColorMainProduct:any;

ColorProduct(id:any,type:any,name:any){
$('.add_box_product').show();$('.ChoiceColor').show();this.UpdateAdd='Add';
this.idColorMainProduct=id;
this.nameColorMainProduct=name;
this.typeColorMainProduct=type;
$('.name').hide();
}
imageFileNameColor1:any;
imageFileNameColor2 :any;
imageFileNameColor3:any;
imageFileNameColor4:any;descriptionColorAdd:any;nameColorAdd:any;priseColorAdd:any;
name:any;prise:any;description:any;
fileColor_1:any=null;fileColor_2:any=null;fileColor_3:any=null;fileColor_4:any=null;
onFileSelectedColor1(event: any) {this.fileColor_1 = event.target.files[0];
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {this.imageFileNameColor1 = e.target.result;};
    reader.readAsDataURL(input.files[0]);
  }}
  onFileSelectedColor2(event: any) {this.fileColor_2 = event.target.files[0];
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {this.imageFileNameColor2 = e.target.result;};
    reader.readAsDataURL(input.files[0]);
  }}
  onFileSelectedColor3(event: any) {this.fileColor_3 = event.target.files[0];
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {this.imageFileNameColor3 = e.target.result;};
    reader.readAsDataURL(input.files[0]);
  }}
  onFileSelectedColor4(event: any) {this.fileColor_4 = event.target.files[0];
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {this.imageFileNameColor4 = e.target.result;};
    reader.readAsDataURL(input.files[0]);
  }}
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
  UpdateformDataProduct:any;
  add(event:any){
    if(this.nameColorMainProduct&&this.priseColorAdd&&this.offerColorAdd&&this.mainPriceColorAdd&&this.profitColorAdd&&this.taxColorAdd&&this.descriptionColorAdd&&this.fileColor_1&&this.nameColor){
    this.formData__ = new FormData();
    this.formData__.append('offer', this.offerColorAdd);
    this.formData__.append('mainPrice', this.mainPriceColorAdd);
    this.formData__.append('profit', this.profitColorAdd);
    this.formData__.append('tax', this.taxColorAdd);
    
    this.formData__.append('name', this.nameColorMainProduct);
    this.formData__.append('prise', this.priseColorAdd);
    this.formData__.append('description', this.descriptionColorAdd);
    if(this.fileColor_1){this.formData__.append('image_1', this.fileColor_1);}
      if(this.fileColor_2){this.formData__.append('image_2', this.fileColor_2);}
      if(this.fileColor_3){this.formData__.append('image_3', this.fileColor_3);}
      if(this.fileColor_4){this.formData__.append('image_4', this.fileColor_4);}

    this.formData__.append('type',''+this.typeColorMainProduct+'');
    this.formData__.append('nameColor', ''+this.nameColor+'');
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
     this.http.post('https://abdulwadoud.pythonanywhere.com/api/product/', this.formData__,{headers}).subscribe((response:any) => {
        $('.add_box_product').hide();this.ngOnInit();
       $('.add_box_product').hide();
        this.router.navigate(['/category/type',this.typeColorMainProduct]);
              },
       (error) => {alert('Error uploading file:');});
            }
            else{
              if(!this.nameColorAdd){ $('.name').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.name').css('background-color','#FFF');;}, 100);}
              if(!this.taxColorAdd){ $('.tax').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.tax').css('background-color','#FFF');;}, 100);}
              if(!this.priseColorAdd){ $('.prise').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.prise').css('background-color','#FFF');;}, 100);}
              if(!this.mainPriceColorAdd){ $('.mainPrice').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.mainPrice').css('background-color','#FFF');;}, 100);}
              if(!this.profitColorAdd){ $('.profit').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.profit').css('background-color','#FFF');;}, 100);}
              if(!this.offerColorAdd){ $('.offer').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.offer').css('background-color','#FFF');;}, 100);}
              if(!this.fileColor_1){ $('.set_image_big').css('color','rgba(200,0,0,.4)');setTimeout(function() {$('.set_image_big').css('color','#353535');;}, 300);}
              if(!this.nameColor){ $('.ChoiceColor').css('background-color','rgba(200,0,0,.2)');setTimeout(function() {$('.ChoiceColor').css('background-color','#FFF');;}, 100);}
            }
  
  
  
  }
 
    


  

clickedText:any;
colorDisplay(spanElement:any,image_1:any,nameColor:any,id:any){$('.display2').show();$('.display').hide();
spanElement.style.width = '130px';spanElement.style.height = '130px';this.idColor=id;this.nameColor=nameColor;

  spanElement.setAttribute('src', image_1);
}
inputValue:any;
nameColor:any;idColor:any;
newRoute(id:any){
  this.router.navigate(['/category/type/product/',this.nameColor, id]);
}
objectId:any;response_:any;imagesDisplay:any; 
uniqueProductNames: string[] = [];
uniqueProducts: any[] = [];
getProductsByName(productName: string): any[] {
  return this.listProduct.filter((product:any) => product.name === productName);
}
roueBack:any;
back(){
  this.router.navigate([this.roueBack]);
}
selectedDivIndex = 0; selectedColor: string | null = null;
changeProduct(element:any){

  
}

changeProductColor(element:any,obj: any, objColor:any,i:any) {

  $('.color div').css('outline','none');$('.color div').css('border','none');
  element.style.border= '1px solid #FFF';element.style.outline='1px solid '+objColor.nameColor;
  if(objColor.nameColor=='white'){element.style.outline='1px solid #409';}
  obj.image_1 = objColor.image_1;
  obj.image_2 = objColor.image_2;
  obj.image_3 = objColor.image_3;
  obj.image_4 = objColor.image_4;
  obj.prise = objColor.prise;
  obj.description = objColor.description;
  obj.id = objColor.id;
if(i==0){
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.objectId = this.route.snapshot.paramMap.get('id');
     this.http.get('https://abdulwadoud.pythonanywhere.com/type/'+this.objectId+'/',{headers}).subscribe((Response:any)=>{
      this.listProduct=Response; const uniqueProductMap = new Map();
     
      this.listProduct.forEach((product:any) => {
        if (!uniqueProductMap.has(product.name)) {
          uniqueProductMap.set(product.name, product);
        }
      });
      this.uniqueProducts = Array.from(uniqueProductMap.values());
});

}
}
ngOnInit(){
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.objectId = this.route.snapshot.paramMap.get('id');
     this.http.get('https://abdulwadoud.pythonanywhere.com/type/'+this.objectId+'/',{headers}).subscribe((Response:any)=>{
      this.http.get('https://abdulwadoud.pythonanywhere.com/api/type/'+Response[0].type+'/',{headers}).subscribe((Response:any)=>{
        this.http.get('https://abdulwadoud.pythonanywhere.com/api/category/'+Response.category+'/',{headers}).subscribe((Response:any)=>{
          this.roueBack='category/'+Response.name;  
          
      });
      });
      
      setTimeout(() => {
        $('.display .image_1 img').css('transform','translateX(70%)'); 
      }, 0);
      $('.display .image_1 img').hover(function() {$('.display .image_1 img').css('transform','translateX(+70%) scale(1.2,1.2)');},function() {$('.display .image_1 img').css('transform','translateX(70%) scale(1,1)');});
      this.listProduct=Response; const uniqueProductMap = new Map();

      this.listProduct.forEach((product:any) => {
        if (!uniqueProductMap.has(product.name)) {
          uniqueProductMap.set(product.name, product);
        }
      });
      this.uniqueProducts = Array.from(uniqueProductMap.values());
},
error=>{});}
flip: string = 'inactive';
listImages:any;
toggleFlip(object:any){
  object.flip = object.flip === 'active' ? 'inactive' : 'active';
}

showDive(spanElement:any,image_1:any){
  spanElement.setAttribute('src', image_1);
}
type:any;
formData__:any;imageFileName4:any;imageFileName_2:any;imageFileName3:any;
imageFileName1:any;
GetColor(event:any,color:any){
  this.nameColor=color;$('.ChoiceColor li').css('outline','none');$('.ChoiceColor li').css('border','none');
  event.style.border= '1px solid #FFF';event.style.outline='1px solid '+this.nameColor;
  if(this.nameColor=='white'){event.style.outline='1px solid #999';}
}
id_marke:any;  UpdateAdd=localStorage.getItem('dataValue_2');array_get_cars_filter:any=[];
UpdateProduct(id:any,type:any){
  $('.add_box_product').show();this.type=type;$('.ChoiceColor').hide();
  this.UpdateAdd='Update';this.id_marke=id;
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
  return this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/'+id+'/',{headers}).subscribe((Response:any)=>{
    this.array_get_cars_filter=Response;
    this.nameColorAdd=this.array_get_cars_filter.name;
    this.offerColorAdd=this.array_get_cars_filter.offer;
    this.mainPriceColorAdd=this.array_get_cars_filter.mainPrice;
    this.profitColorAdd=this.array_get_cars_filter.profit;
    this.taxColorAdd=this.array_get_cars_filter.tax;


    this.descriptionColorAdd=this.array_get_cars_filter.description;
this.nameColor=this.array_get_cars_filter.nameColor;
    this.priseColorAdd=this.array_get_cars_filter.prise;
    this.imageFileNameColor1=this.array_get_cars_filter.image_1;
    this.imageFileNameColor2=this.array_get_cars_filter.image_2;
    this.imageFileNameColor3=this.array_get_cars_filter.image_3;
    this.imageFileNameColor4=this.array_get_cars_filter.image_4;
      
  },error=>{alert('error');});
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
  
  getFileNameFromUrl(url: string): string {
    const matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return '';
  }
  formDataUpdate:any;
  offerColorAdd:any;mainPriceColorAdd:any;profitColorAdd:any;taxColorAdd:any;
  async Update(): Promise<void>{
  
          if(this.imageFileNameColor1){this.fileColor_1 = await this.downloadImageAsFile(this.imageFileNameColor1);}
          if(this.imageFileNameColor2){this.fileColor_2 = await this.downloadImageAsFile(this.imageFileNameColor2);}
          if(this.imageFileNameColor3){this.fileColor_3 = await this.downloadImageAsFile(this.imageFileNameColor3);;}
          if(this.imageFileNameColor4){this.fileColor_4 = await this.downloadImageAsFile(this.imageFileNameColor4);}
          this.formDataUpdate = new FormData();
          this.formDataUpdate.append('name', this.nameColorAdd);
          this.formDataUpdate.append('prise', this.priseColorAdd);
          this.formDataUpdate.append('offer', this.offerColorAdd);
          this.formDataUpdate.append('mainPrice', this.mainPriceColorAdd);
          this.formDataUpdate.append('profit', this.profitColorAdd);
          this.formDataUpdate.append('tax', this.taxColorAdd);
          this.formDataUpdate.append('description', this.descriptionColorAdd);
        

          if(this.fileColor_1){this.formDataUpdate.append('image_1', this.fileColor_1);}
          if(this.fileColor_2){this.formDataUpdate.append('image_2', this.fileColor_2);}
          if(this.fileColor_3){this.formDataUpdate.append('image_3', this.fileColor_3);}
          if(this.fileColor_4){this.formDataUpdate.append('image_4', this.fileColor_4);}
          

          
          this.formDataUpdate.append('nameColor', ''+this.nameColor+'');  
          this.formDataUpdate.append('type', ''+this.type+'');
          const access_token= this.authService.getAccessToken();
          const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
           this.http.patch('https://abdulwadoud.pythonanywhere.com/api/product/'+this.id_marke+'/', this.formDataUpdate,{headers}).subscribe((response:any) => {
               this.get();
               this.ngOnInit();  $('.add_box_product').hide();



 this.nameColorAdd='';
  this.offerColorAdd='';
  this.mainPriceColorAdd='';
  this.profitColorAdd='';
  this.taxColorAdd='';
  this.descriptionColorAdd='';
this.nameColor='';
  this.priseColorAdd='';
  this.imageFileNameColor1=null;this.fileColor_1=null;
  this.imageFileNameColor2=null;this.fileColor_2=null;
  this.imageFileNameColor3=null;this.fileColor_3=null;
  this.fileColor_4=null;
  this.imageFileNameColor4=null;

},(error) => {alert('error.name')});     
   }  



  DownloadImage(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response);
      link.download = 'image.jpg';
      link.click();
      URL.revokeObjectURL(link.href);
    });}
}
