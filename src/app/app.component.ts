import { Component ,HostListener  } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthUsersService } from './auth-users.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 


  downloadImage(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response);
      link.download = 'image.jpg';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

   

  constructor(private sanitizer: DomSanitizer,private http:HttpClient,private service:AuthUsersService, private router: Router,private authService:AuthUsersService)
  {
    this.http.get('https://abdulwadoud.pythonanywhere.com/api/story/').subscribe((Response:any)=>{
     if(Response.length==0){
     $('.story_show').hide();
    }}
    );
    
    $(document).ready(function () {
$('.box_inside').hover(
  function () {
   $('.animationDotted').css({"transform":"scale(1.1,1.1)","transition": "all .5s"});
  },
  function () {
    $('.animationDotted').css({"transform":"scale(1,1)","transition": "all .5s"});
  }
);
$('.titel,.titelNavbar').hover(
  function () {
   $('.story_show').css({"transform":"scale(1.2,1.2)","transition": "all .5s"});
   $('.icon,.iconNavbar').css({"transform":"scale(1.2,1.2)","transition": "all .5s"});
  },
  function () {
    $('.icon,.iconNavbar').css({"transform":"scale(1,1)","transition": "all .5s"});
    $('.story_show').css({"transform":"scale(1,1)","transition": "all .5s"});
  }
);
});
$(document).ready(function () {
  $('.cropperAnimation').hover(
    function () {
     $('.animationDotted').css({"transform":"scale(1.1,1.1)","transition": "all .5s"});
    },
    function () {
      $('.animationDotted').css({"transform":"scale(1,1)","transition": "all .5s"});
    }
  );});
  this.screenWidth=window.innerWidth;;
  if(this.screenWidth<1000){
    $('.dachboardleftToNavbar').show();
    }
    else{
      $('.dachboardleftToNavbar').hide(); 
    }
    this.username=this.authService.getUsername();;
}
username:any;
counterHamburger=false;

hideNavbar(){
  $('.ListNavbar').slideUp();
  $('.behindList').hide();
  $('.barTwo').css('opacity','1');
  $('.barOne').css('transform','translate(0, 15px) rotate(0deg)');
  $('.barThree').css('transform','translate(0, -15px) rotate(0deg)');
  this.counterHamburger=false;
}
logOut(){
  $('.ListNavbar').slideUp();
  $('.behindList').hide();
  $('.barTwo').css('opacity','1');
  $('.barOne').css('transform','translate(0, 15px) rotate(0deg)');
  $('.barThree').css('transform','translate(0, -15px) rotate(0deg)');
  this.counterHamburger=false;
  this.service.logout();
  this.router.navigate(['/login']);
  }

Hamburger(){
  if(this.counterHamburger==false){$('.ListNavbar').slideDown();$('.behindList').show();
  $('.barTwo').css('opacity','0');
  $('.barOne').css('transform','translate(0, 8px) rotate(45deg)');
  $('.barThree').css('transform','translate(0, -8px) rotate(-45deg)');
  this.counterHamburger=true;}
else if(this.counterHamburger==true){$('.ListNavbar').slideUp();$('.behindList').hide();
  $('.barTwo').css('opacity','1');
  $('.barOne').css('transform','translate(0, 15px) rotate(0deg)');
  $('.barThree').css('transform','translate(0, -15px) rotate(0deg)');
  this.counterHamburger=false;}}
  screenWidth: any;
  screenHeight: any;

@HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if(this.screenWidth>1000){
      $('.barTwo').css('opacity','1');$('.ListNavbar').hide();$('.behindList').hide();
      $('.barOne').css('transform','translate(0, 15px) rotate(0deg)');
      $('.barThree').css('transform','translate(0, -15px) rotate(0deg)');this.counterHamburger=false;}
  }
  behindList(){
    $('.ListNavbar').slideUp();$('.behindList').hide();
    $('.barTwo').css('opacity','1');
  $('.barOne').css('transform','translate(0, 15px) rotate(0deg)');
  $('.barThree').css('transform','translate(0, -15px) rotate(0deg)');this.counterHamburger=false;
  }
pdfFile: any;
onFile_Selected(event: any) {
    this.pdfFile = event.target.files[0];
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
FileCropper:any;
  imageCropped(event: any) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
      this.getBlobFromUrl(event.objectUrl).subscribe(blob => {
        const file = new File([blob], 'cropped_image.png', { type: 'image/png' }); 
        this.FileCropper=file;  
        this.imageFileName= this.croppedImage;
    });
  }

  
  public getBlobFromUrl(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }
  imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight(){
      this.canvasRotation++;
      this.flipAfterRotate();
  }
  public flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }
  cropperShape=3;
  shapes4x4(){this.cropperShape=4;}
  shapes4x3(){this.cropperShape=3;}
  shapes4x2(){this.cropperShape=2;}
  shapes4x1(){this.cropperShape=1;}

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }
fileCategory:any=false;
onFileSelectedCategory(event: any) {
  $('.cropperIcon').show();this.imageChangedEvent = event;this.FileCropper=event.target.files[0];
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]){
        const reader = new FileReader();
        reader.onload = (e: any) => {this.imageFileName = e.target.result;};
        reader.readAsDataURL(input.files[0]);
      }}

setImage(){
  $('.cropper').hide();
      }
editCrooper(){
        $('.cropper').show();
      }


xxxx:any=[];
formData_:any;
formData:any;
uploadPDF(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfFile', this.pdfFile);
  
    this.http.post('https://abdulwadoud.pythonanywhere.com/pdf/', formData)
      .subscribe(
        (response) => {
          this.xxxx=response;
      alert(response);
        },
        (error) => {
          console.error('Error uploading PDF', error);
        }
      );
  }
//____________________________________________________LOgout
counter: any;
currentIndex:any;
itemss:any;
titelAddCategory:any='';
titel:any;
items:any;
numberObject:any;
productStory:any;created_at:any;
getStory(){
}
  back(){
    this.currentIndex=0;$('.display').hide();this.counter = 0;
clearInterval(this.intervalCounter);clearInterval(this.intervalId);
  }
period=4500;
left(){
  this.number=this.counter*30;
  clearInterval(this.intervalCounter);clearInterval(this.intervalId);
  if( this.currentIndex>0){this.currentIndex--;this.counter=0;this.itemss=this.items[this.currentIndex].image;this.created_at=this.items[this.currentIndex].created_at;this.titel=this.items[this.currentIndex].titel;this.created_at=this.items[this.currentIndex].created_at;this.productStory=this.items[this.currentIndex].product;
   
 }else{this.counter=0;}
 this.counter=0; this.intervalCounter= setInterval(() => {if (this.counter < 100) {this.counter++; }if(this.counter==100){this.counter=0;}}, 45);
 this.itemss=this.items[0].image;  this.intervalId =setInterval(() => {this.currentIndex++; if(this.currentIndex==this.items.length){$('.display').hide();
clearInterval(this.intervalId);clearInterval(this.intervalCounter)}this.itemss=this.items[this.currentIndex].image;this.titel=this.items[this.currentIndex].titel;this.created_at=this.items[this.currentIndex].created_at;this.productStory=this.items[this.currentIndex].product;}, this.period);
this.itemss=this.items[this.currentIndex].image;this.created_at=this.setTimeStory(this.created_at);
this.showStory(this.items[this.currentIndex].id);}

right(){
  if(this.currentIndex+1==this.items.length){$('.display').hide();}
 
this.number=this.counter*30-300;
clearInterval(this.intervalCounter);
clearInterval(this.intervalId);
if(this.currentIndex<this.items.length){ 
this.itemss=this.items[0].image;  this.intervalId =setInterval(() => {this.currentIndex++; if(this.currentIndex==this.items.length){$('.display').hide();
clearInterval(this.intervalId);
clearInterval(this.intervalCounter)}
this.itemss=this.items[this.currentIndex].image;this.titel=this.items[this.currentIndex].titel;this.created_at=this.items[this.currentIndex].created_at;this.productStory=this.items[this.currentIndex].product;}, this.period);
this.currentIndex++;this.counter=0; this.intervalCounter= setInterval(() => {if (this.counter < 100) {this.counter++; }if(this.counter==100){this.counter=0;}}, 45);
this.itemss=this.items[this.currentIndex].image;this.titel=this.items[this.currentIndex].titel;this.created_at=this.items[this.currentIndex].created_at;this.productStory=this.items[this.currentIndex].product;
this.showStory(this.items[this.currentIndex].id);
}
this.created_at=this.setTimeStory(this.created_at);
}
number:any;
open_story(){
  this.currentIndex=0;this.counter = 0;
const access_token= this.authService.getAccessToken();
const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
return this.http.get('https://abdulwadoud.pythonanywhere.com/api/story/',{headers}).subscribe((Response:any)=>{
this.items=Response;
if(this.items.length!=0){
$('.display').show();
this.showStory(this.items[this.currentIndex].id);
clearInterval(this.intervalCounter);
clearInterval(this.intervalId);
this.changeImage();
;this.lineMove();}
},error=>{});
}

showStory(story_id:any){
  const username = this.authService.getUsername();
  const url = `https://abdulwadoud.pythonanywhere.com/viewStory/${story_id}/${username}/`;
   this.http.post(url,{}).subscribe((response: any) => {},
  (error:any)=>{
      alert('error'+error);});
}

setTimeStory(Data:any){
const storedDateTimeString =Data; 
const storedDateTime = new Date(storedDateTimeString);
const now = new Date();
const differenceInMilliseconds = now.getTime() - storedDateTime.getTime();
const seconds = Math.floor(differenceInMilliseconds / 1000);
const minutes = Math.floor(seconds / 60);
const hours = Math.floor(minutes / 60);
const days = Math.floor(hours / 24);
const months = Math.floor(days / 30);
if (hours< 1) {
 if(minutes==0){ Data=`now`;}
 else{Data=`before ${minutes % 60} m`;}

} else {
 Data=` before ${hours % 24} h`;
}
return Data;
}
intervalCounter:any;
intervalId:any;
is_stop:any;
changeImage(){
  this.itemss=this.items[0].image;this.titel=this.items[this.currentIndex].titel;this.created_at=this.items[this.currentIndex].created_at; this.created_at=this.setTimeStory(this.created_at);
  this.productStory=this.items[this.currentIndex].product;this.intervalId =setInterval(() => {this.number=this.currentIndex*30;this.currentIndex++; 
    if(this.currentIndex==this.items.length){$('.display').hide();

clearInterval(this.intervalId);clearInterval(this.intervalCounter)}
this.itemss=this.items[this.currentIndex].image;this.titel=this.items[this.currentIndex].titel;this.created_at=this.items[this.currentIndex].created_at;this.created_at=this.setTimeStory(this.created_at);this.productStory=this.items[this.currentIndex].product;}, this.period);}

lineMove(){this.intervalCounter= setInterval(() => {if (this.counter < 100) {this.counter++; }
if(this.counter==100){this.counter=0;}}, 45);}
appearProduct(id:any){
  this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/'+id+'/').subscribe((Response:any)=>{
$('.display').hide();
this.router.navigate(['/product/',Response.id]);
},error=>{});
}



valueFromSender: any;
onValueEmitted(value: string){
this.valueFromSender = value;
}

 
private initialized: boolean = false;
array_key1:any=[];
array_key2:any=[];
array_key_line:any=[];



ngOnInit(): void{ 
 
}


imageFileName:any;
back_(){$('.add_box').hide();}
ShowCategory(){$('.add_box').show();}
postCategory(){
  
  if(this.FileCropper && this.titelAddCategory){
  this.formData = new FormData();
  this.formData.append('name', this.titelAddCategory);
  this.formData.append('image', this.FileCropper);
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
   this.http.post('https://abdulwadoud.pythonanywhere.com/api/category/', this.formData,{headers}).subscribe((response:any) => {
   window.location.reload(); $('.add_box').hide();this.titelAddCategory='';
     },
     (error) => {alert('Error uploading file:');});
}
if(this.titelAddCategory==''){
$('.InputTittle').css('background-color','rgba(200,0,0,.3)');
setTimeout(function() {
  $('.InputTittle').css('background-color','#FFF');
}, 100);
}
if(!this.FileCropper){
  $('.set_image_big').css({'color':'rgba(200,0,0,.6)','font-size':'50px'});
  setTimeout(function() {
    $('.set_image_big').css({'color':'#f7cb9c','font-size':'35px'});
  }, 200);
  }}







//_________________Map


}
