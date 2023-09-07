import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthUsersService } from '../auth-users.service';
declare var $: any;
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
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
export class StoryComponent {
  constructor(private http:HttpClient,private authService:AuthUsersService,private router: Router,private location: Location){this.get(); this.getProduct();this.GetViewstory();
  }
  
  listCategory:any=[];
  back(){this.router.navigate(['']);} 
   back_(){$('.add_boxStory').hide();}
  array_get_story:any;

    getProduct(){ 
      return this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/').subscribe((Response:any)=>{
        this.listType=Response;
        this.array_get_cars_=Response; 
  },
  error=>{});
}

get(){
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get('https://abdulwadoud.pythonanywhere.com/api/story/',{headers}).subscribe((Response:any)=>{
      this.array_get_story=Response;
      this.items=Response;
      for(let i=0;i<Response.length;i++){
         const storedDateTimeString =Response[i].created_at; 
         const storedDateTime = new Date(storedDateTimeString);
         const now = new Date();
         const differenceInMilliseconds = now.getTime() - storedDateTime.getTime();
         const seconds = Math.floor(differenceInMilliseconds / 1000);
         const minutes = Math.floor(seconds / 60);
         const hours = Math.floor(minutes / 60);
         const days = Math.floor(hours / 24);
         const months = Math.floor(days / 30);
         if (hours< 1) {
          if(minutes==0){ this.array_get_story[i].created_at=`now`;}
          else{this.array_get_story[i].created_at=`before ${minutes % 60} m`;}

        } else {
          this.array_get_story[i].created_at=` before ${hours % 24} h`;
        }
      }
    },error=>{});
}
formDataStory:any;
postStory() {
 
if(this.titelStory&&this.fileStory&&this.idProducttoStory){
    this.formDataStory = new FormData();
    this.formDataStory.append('titel', this.titelStory);
    this.formDataStory.append('image', this.fileStory);
    this.formDataStory.append('product',this.idProducttoStory);
     this.http.post('https://abdulwadoud.pythonanywhere.com/api/story/', this.formDataStory).subscribe((response:any) => {
         this.get();
       },
       (error) => {alert('this product is found choice another product');});
      }else{
       if(!this.fileStory){
        $('.set_image_big').css({'color':'rgba(200,0,0,.6)','font-size':'60px'});
        setTimeout(function() {
          $('.set_image_big').css({'color':'#f7cb9c','font-size':'50px'});
        }, 200);
        }
        if(!this.titelStory){
          $('.InputTittle').css({'background-color':'rgba(200,0,0,.1)'});
          setTimeout(function() {
            $('.InputTittle').css({'background-color':'#FFF'});
          }, 100);
          }
          if(!this.idProducttoStory){
            $('.choice').css({'background-color':'rgba(200,0,0,.1)'});
            setTimeout(function() {
              $('.choice').css({'background-color':'#FFF'});
            }, 100);
            } }
  }

deleteStory(id:any){
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
  if (confirm("Do you want to proceed?")) {
     this.http.delete('https://abdulwadoud.pythonanywhere.com/api/story/'+id+'/',{headers}).subscribe((Response:any)=>{
      this.array_get_story=Response;
       this.get();
    },
    error=>{});}
}
fileStory:any;
titelStory:any;
imageFileNameStory:any;
onFileSelectedStory(event: any) {this.fileStory = event.target.files[0];
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {this.imageFileNameStory = e.target.result;};
    reader.readAsDataURL(input.files[0]);
  }}
downloadImage(url: string) {
  this.http.get(url, { responseType: 'blob' }).subscribe(response => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(response);
    link.download = 'image.jpg';
    link.click();
    URL.revokeObjectURL(link.href);
  });
}
backgroundSearch(){
  $('.backgroundSearch').hide();
}
filterValue: string = ''; 
clickInput(){
  $('.backgroundSearch').show();
}
selectedOptionText:any;
listType:any=[];
isDropdownOpen=false;
selectedImage:any;
array_get_cars_:any=[];
idProducttoStory:any;
toggleDropdown(){
  this.isDropdownOpen = !this.isDropdownOpen;
}
selectOption(option:any) {
  this.selectedOptionText = option.name;
  this.selectedImage = option.image_1;
  this.isDropdownOpen = false; 
  this.idProducttoStory=option.id;
  this.filterValue=option.name;
}
filterList(): void {
  this.listType = this.array_get_cars_.filter((item:any) =>
    item.name.toLowerCase().includes(this.filterValue.toLowerCase())
  );
  if(this.filterValue!=''){
    this.isDropdownOpen=true;
  }
  else{ this.isDropdownOpen=false;}
 }
isHovered = false;
count_view:any;
onMouseEnter(viewCounterUser:any,id:any,i:any){
  this.isHovered = true;
  const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get('https://abdulwadoud.pythonanywhere.com/filter_story/'+id+'/',{headers}).subscribe((Response:any)=>{
      this.count_view=Response.length;
      viewCounterUser[i] = 'New content';
    },error=>{});
}

addStory(){
  if(this.fileStory && this.titelStory){  $('.add_boxStory').hide();
}
}
newStory(){
  $('.add_boxStory').show();
}


counter: any;
currentIndex:any;
itemss:any;
items:any;
numberObject:any;

open_story(){this.itemss=this.items[0].image;this.currentIndex=0;
  setInterval(() => {this.changeOrder();}, 3000);
  this.counter = 0;
  setInterval(() => {if (this.counter < 100) {this.counter++; }
  if(this.counter==100){this.counter=0;}}, 30);
}
changeOrder() { this.currentIndex++;if(this.currentIndex==this.items.length){$('.display').hide();}this.itemss=this.items[this.currentIndex].image;}

ngOnInit(){
this.get();
}

flip: string = 'inactive';

WhoWhatched:any=[];
viewStory(story_id:number,object:any){
  object.flip = object.flip === 'active' ? 'inactive' : 'active';
}
listviewstory:any=[];ListHowwhached:any=[];
GetViewstory(){
  this.http.get('https://abdulwadoud.pythonanywhere.com/api/viewstory/').subscribe((Response:any)=>{
    this.listviewstory=Response;
});
}
Howwhached(id: string): any[] {
  return this.listviewstory.filter((story:any) => story.story === id).length;

}
viewstorybyId(id: string): any[] {
  return this.listviewstory.filter((story:any) => story.story === id);
}
appearProduct(id:any){
  this.http.get('https://abdulwadoud.pythonanywhere.com/api/product/'+id+'/').subscribe((Response:any)=>{
this.router.navigate(['/category/type/product/',Response.nameColor,Response.id]);
},error=>{});
}
}
