import {ElementRef, Component,ViewChildren,QueryList,HostListener,OnDestroy , OnInit,ViewChild ,Renderer2 ,ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthUsersService } from '../auth-users.service';
import { ShareDateService } from '../share-date.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewChecked() {
   
  }
 
  scrollToBottom(){
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, .5);
  
    
  }
  messages: any;
  userId: any;
  otherUserId: any;
  constructor(private cdr: ChangeDetectorRef,private elementRef: ElementRef,private renderer: Renderer2,private route: ActivatedRoute, private share: ShareDateService,private router: Router,private http:HttpClient,private authService:AuthUsersService) {
     this.get();
     
     this.screenWidth = window.innerWidth;
     this.screenHeight = window.innerHeight;
  }
  ngOnInit(): void{ 
    

  }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const maxLength = 300;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
  screenWidth:any;screenHeight:any;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
if(this.screenWidth>1000){
   $('.backChat').hide();$('.back').show(); $('.chat').show();$('.box .users').show();
  }
  if(this.screenWidth<1000){
    if($('.chat').css('display')=='none'){ $('.backChat').hide();$('.back').show();}
    else{ 
    $('.backChat').show();$('.back').hide();
  }
   
  }
  }
  back(){this.router.navigate(['']);}
  backChat(){
    $('.backChat').hide();
    $('.box .users').show();
    $('.back').show();
    $('.chat').hide();
   
    
  }
  image_user: any=[];
  likes:any=[];
  username:any;
  object_id:any;



 isHovered_left = false;
 isHovered_right = false;
 onMouseLeave_left() {
   this.isHovered_left = false;$('.chat-bubble-another').css('margin-left','0px');
 }
 onMouseLeave_right() {
   this.isHovered_right = false;$('.chat-bubble').css('margin-right','0px');
 }
 selectedImage: string | undefined;


 postpone_right(id:any,i:any,spanElement: any){this.isHovered_right = true;
     $('.chat-bubble').css('margin-right','0px');
    
     const right = '30px'; 
     spanElement.style.marginRight = right;
 }
 postpone_left(id:any,i:any,spanElement: any){this.isHovered_left = true;
   $('.chat-bubble-another').css('margin-left','0px');
   const left = '30px'; 
   spanElement.style.marginLeft = left;}


isPressing = false;
onPressStart_left(spanElement: any,message: any) {$('.BoxPutLike').hide();
  this.isPressing = true;
  message.style.background='#ccc';
  setTimeout(() => {  
    if (this.isPressing) {
     this.attr_left='block';
  spanElement.style.display = this.attr_left;$('.overlay').show();
  message.style.background='#FFF';
    }
  }, 500);
}
attr_left:any;
onPressEnd_left(spanElement: any,message: any) {$('.BoxPutLike').hide();$('.overlay').hide();this.isPressing = false;this.attr_left='none';message.style.background='#FFF';}

isPressing_right=false;
onPressStart_right(spanElement: any,message: any) {$('.BoxPutLike').hide();
  this.isPressing_right = true;
  message.style.background='#e6ba8b';
  setTimeout(() => {  
    if (this.isPressing_right) {
     this.attr_right='block';
  spanElement.style.display = this.attr_right;$('.overlay').show();
  message.style.background='#f7cb9c';
    }
  }, 500); 
}
attr_right:any;
onPressEnd_right(spanElement: any,message: any) {$('.BoxPutLike').hide();$('.overlay').hide();this.isPressing_right = false;this.attr_right='none';
}



    adjustTextareaHeight() {
      const textarea = this.elementRef.nativeElement.querySelector('#myTextarea');
      textarea.style.height = `${textarea.scrollHeight}px`;
    }  
deleteMessage(id:any,i:any){
      if (confirm("Do you want to proceed?")) {
        const access_token= this.authService.getAccessToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
        this.http.delete('https://abdulwadoud.pythonanywhere.com/messages/'+id+'/',{headers}).subscribe(() => {
       this.getUserMessages(this.otherUserId);
       this.scrollToBottom();
       this.get();
            },
            (error)=>{
              alert('error');
            }
          );}
    }

    show_like_info(like:any){

    }





  filteredItems: any[] = []; 
  filterValue: string = ''; 
  filterList(): void {
    this.userList = this.userList_all.filter((item:any) =>
      item.username.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
  addChat(object_:any){
    if(this.screenWidth<1000){ $('.users').hide();$('.chat').show();$('.backChat').show();$('.back').hide();}
    this.username= this.authService.getUsername();this.messages=[]; $('.userList').hide();
    this.authService.getUserIdByUsername(this.username).subscribe((data) => {
      this.userId=data.user_id;
      this.otherUserId=object_.id;
    this.image_user=[];
    this.image_user.push(object_.profile.image);
    this.image_user.push(object_.username);
    this.image_user.push(object_.profile.status);
    this.image_user.push(object_.profile.telephone_Number);
    this.image_user.push(object_.email);
    this.getUserMessages(this.otherUserId);
    });

    

}
formDataUpdate:any;
getUserMessages_(object_:any){ 
  if(this.screenWidth<1000){ $('.box .chat').show();$('.backChat').show(); $('.back').hide();}
  $('.userList').hide();
     this.image_user=[];
     this.otherUserId = object_.nameId;
     this.username= this.authService.getUsername()
   this.authService.getUserIdByUsername(this.username).subscribe((data) => {
     this.userId=data.user_id;
     this.http.get("https://abdulwadoud.pythonanywhere.com/users/"+this.userId+"/messages/"+this.otherUserId+"/").subscribe((data: any) => {

     this.messages = data;
      for(let i=0;i<data.length;i++){
        if(data[i].sender_id!=this.userId){
          this.formDataUpdate = new FormData();
          this.formDataUpdate.append('readReciever', 'readed');
          this.http.patch("https://abdulwadoud.pythonanywhere.com/messages/"+data[i].id+"/",this.formDataUpdate).subscribe(()=>{
          });
         
      }}

      this.http.get('https://abdulwadoud.pythonanywhere.com/Boxmessages/'+this.userId).subscribe((Response:any)=>{
        this.array_get_cars=Response;
      for(let j=0;j<Response.length;j++){
        this.http.get("https://abdulwadoud.pythonanywhere.com/users/"+this.userId+"/messages/"+Response[j].nameId+"/").subscribe((data: any) => {
          this.counterMessagenotRead=0;
          for(let i=0;i<data.length;i++){
            if(data[i].sender_id!=this.userId && data[i].readReciever==''){
              this.counterMessagenotRead=this.counterMessagenotRead+1; 
          }}
          Response[j].readReciever=this.counterMessagenotRead;
        });
      }});

      this.http.get('https://abdulwadoud.pythonanywhere.com/Boxmessages/'+this.userId).subscribe((Response:any)=>{
        this.array_get_cars=Response;

        for(let i=0;i<Response.length;i++){
          const dtObject = new Date(Response[i].timestamp);
          const old_day = dtObject.getUTCDate();
          const  old_month = dtObject.getUTCMonth() + 1; 
          const  old_year = dtObject.getUTCFullYear();
          const old_hour = dtObject.getUTCHours()+2;
          const  old_minute = dtObject.getUTCMinutes();
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const day = now.getDate();
          if(old_year==year && old_month == month && old_day!=day){
            if(day-old_day==1){ this.array_get_cars[i].timestamp='yesterday';}
            if(day-old_day==2){ this.array_get_cars[i].timestamp='2 days';}
            if(day-old_day==3){ this.array_get_cars[i].timestamp='3 days';}
            if(day-old_day==4){ this.array_get_cars[i].timestamp='4 days';}
            if(day-old_day==5){ this.array_get_cars[i].timestamp=old_hour+':'+old_minute;}
            if(day-old_day==6){ this.array_get_cars[i].timestamp=old_hour+':'+old_minute;}
            if(day-old_day==7){ this.array_get_cars[i].timestamp=old_hour+':'+old_minute;}
          }
          else if(old_year==year && old_month == month && old_day==day){
              this.array_get_cars[i].timestamp=old_hour+':'+old_minute;
          }
          else{
            alert(Response[i].timestamp);
            this.array_get_cars[i].timestamp=Response[i].timestamp.split(".").slice(0,3); 
          }}
  
      
      });
      this.object_id=object_.id;
           this.image_user.push(object_.image);
           this.image_user.push(object_.name); 
           this.image_user.push(object_.status);
           this.image_user.push(object_.telephone_Number);
           this.image_user.push(object_.email);
           this.scrollToBottom();
 });
 });}

 getUserMessages(otherUserId:number){
  this.otherUserId = otherUserId;
  this.username= this.authService.getUsername()
this.authService.getUserIdByUsername(this.username).subscribe((data) => {
  this.userId=data.user_id;
  this.share.getUserMessages(this.userId, this.otherUserId)
      .subscribe((data: any) => {
        this.messages = data;
        this.scrollToBottom();
        for(let i=0;i<this.messages.length;i++){
           if(this.messages[i].receiver_id==this.otherUserId){
            this.image_user.push(this.messages[i].receiver_image);
            this.image_user.push(this.messages[i].receiver_username);
            this.image_user.push(this.messages[i].receiver_email);
            break;}}});
},
(error)=>{
  alert('errororororoor');
});

  }

like(message:any,like:any){
this.username= this.authService.getUsername();$('.overlay').hide();
const access_token= this.authService.getAccessToken();
const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
this.authService.getUserIdByUsername(this.username).subscribe((data) => {
  this.userId=data.user_id;
  const body = {
    like: like,
    user:  this.userId,
    message: message.id
  };
  this.http.post("https://abdulwadoud.pythonanywhere.com/Like/", body,{headers}).subscribe(()=>{
    this.getUserMessages(this.otherUserId);
    $('.BoxPutLike').hide();
    this.get();
  },
  (error)=>{
      for(let i=0;i<message.likes.length;i++){
if(message.likes[i].user==this.username){
  this.http.patch("https://abdulwadoud.pythonanywhere.com/Like/"+message.likes[i].id+'/', body).subscribe(()=>{
        this.getUserMessages(this.otherUserId);
        this.get();
     
      });
}}  });
});
 
}

delete(recevier:any){
  this.username= this.authService.getUsername();
  const access_token= this.authService.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.http.get('https://abdulwadoud.pythonanywhere.com/delete_messages/'+this.userId+'/'+recevier,{headers}).subscribe(() => {
      this.getUserMessages(this.otherUserId);
this.get();
$('.save_all').show();
setTimeout(() => {  
  $('.save_all').hide();
}, 1000);
        },
        (error)=>{
          alert('error');
        }
      );


  }


  userList:any;
  overlay_(){
    $('.overlay').hide(); $('.BoxPutLike').hide(); $('.userList').hide(); $('.smiley-list').hide();
  }
  smile_list(){
    $('.smiley-list').fadeToggle(0);$('.overlay').show();$('.smils').css('height','600px');
  }
  
  userList_all:any;
  newChat(){ 
    $('.overlay').show();
    $('.userList').fadeToggle(30);
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.http.get<any[]>('https://abdulwadoud.pythonanywhere.com/api/users/',{headers}).subscribe(
      (response) => {
        this.userList=response;
        this.userList_all=response;
 this.array_get_cars;
 for(const username in this.array_get_cars){
 const index  = response.findIndex(obj => obj.username === this.array_get_cars[username].name);
if(index !== -1){
  response.splice(index, 1);
}}

     
      },
      (error) => {
        console.error('Error retrieving user list:', error);
      }
    );
  }

  imageFileNameMessage:any;fileImageMessage:any;

@ViewChild('fileInput') fileInput!: ElementRef;
 onFileSelectedImageSend(event: any): void {
$('.smils').css('height','600px');$('.imageFileChice').show();
 this.fileImageMessage = event.target.files[0];
 const input = event.target as HTMLInputElement;
 if (input.files && input.files[0]){
   const reader = new FileReader();
   reader.onload = (event: any) => {this.selectedImage = event.target.result;};
   reader.readAsDataURL(input.files[0]);
 }

}

  newMessage:any;formData__:any;
  sendMessage(message: string) {$('.smils').css('height','0px');
    this.smiley='';this.newMessage='';$('.smiley-list').hide();$('.imageFileChice').hide();
   $('.send_input').css('height','40px');
    this.formData__ = new FormData();
    if (message === undefined) {
      message='';}
    if (message.trim() || this.fileImageMessage){
      this.formData__.append('sender', this.userId);
      this.formData__.append('receiver', this.otherUserId);
      this.formData__.append('body', message);
      if(this.fileImageMessage){
      this.formData__.append('imageMessage', this.fileImageMessage);}
       this.http.post("https://abdulwadoud.pythonanywhere.com/messages/", this.formData__).subscribe(()=>{
        
        this.getUserMessages(this.otherUserId);
        this.get();
        this.fileImageMessage=null; 
        this.fileInput.nativeElement.value = '';
      });
    }
  }
  array_get_cars:any=[];
  get(){
    this.username= this.authService.getUsername()
    this.authService.getUserIdByUsername(this.username).subscribe((data) => {
      const access_token= this.authService.getAccessToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
      this.userId=data.user_id;
      this.http.get('https://abdulwadoud.pythonanywhere.com/Boxmessages/'+this.userId,{headers}).subscribe((Response:any)=>{
        this.array_get_cars=Response;
        for(let i=0;i<Response.length;i++){
          const dtObject = new Date(Response[i].timestamp);
          const old_day = dtObject.getUTCDate();
          const  old_month = dtObject.getUTCMonth() + 1; 
          const  old_year = dtObject.getUTCFullYear();
          const old_hour = dtObject.getUTCHours()+2;
          const  old_minute = dtObject.getUTCMinutes();
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const day = now.getDate();
          if(old_year==year && old_month == month && old_day!=day){
            if(day-old_day==1){ this.array_get_cars[i].timestamp='yesterday';}
            if(day-old_day==2){ this.array_get_cars[i].timestamp='2 days';}
            if(day-old_day==3){ this.array_get_cars[i].timestamp='3 days';}
            if(day-old_day==4){ this.array_get_cars[i].timestamp='4 days';}
            if(day-old_day==5){ this.array_get_cars[i].timestamp=old_hour+':'+old_minute;}
            if(day-old_day==6){ this.array_get_cars[i].timestamp=old_hour+':'+old_minute;}
            if(day-old_day==7){ this.array_get_cars[i].timestamp=old_hour+':'+old_minute;}
          }
          else if(old_year==year && old_month == month && old_day==day){
              this.array_get_cars[i].timestamp=old_hour+':'+old_minute;
          }
          else{
            alert(Response[i].timestamp);
            this.array_get_cars[i].timestamp=Response[i].timestamp.split(".").slice(0,3); 
          }}
          

          this.otherUserId=Response[0].nameId;
          this.username= this.authService.getUsername()
          this.authService.getUserIdByUsername(this.username).subscribe((data) => {
            this.userId=data.user_id;
           
            this.http.get("https://abdulwadoud.pythonanywhere.com/users/"+this.userId+"/messages/"+Response[0].nameId+"/").subscribe((data: any) => {
              this.messages = data; 
              this.image_user=[];
              this.image_user.push(Response[0].image);
              this.image_user.push(Response[0].name); 
              this.image_user.push(Response[0].status);
              this.image_user.push(Response[0].telephone_Number);
              this.image_user.push(Response[0].email);
              this.scrollToBottom();
        });
        });

        for(let j=0;j<Response.length;j++){
          this.http.get("https://abdulwadoud.pythonanywhere.com/users/"+this.userId+"/messages/"+Response[j].nameId+"/").subscribe((data: any) => {
            this.counterMessagenotRead=0;
            for(let i=0;i<data.length;i++){
              if(data[i].sender_id!=this.userId && data[i].readReciever==''){
                this.counterMessagenotRead=this.counterMessagenotRead+1; 
            }}
            Response[j].readReciever=this.counterMessagenotRead;
          });
        }
  







    },error=>{}); 
      });  
}
counterMessagenotRead:any;
    smiley:any='';
    smileys: string[] = ["😊", "😃", "😄", "😆", "😍","😊", "😃", "😋", "😆", "😎",'❤️', "😃", '👍', "😂","😊", "😃", "😄", "😆", "😍","😊", "😃", "😋", "😆", "😎",'❤️', "😃", '👍', "😂"];
    selectSmiley(smiley: string) {
    this.smiley=this.smiley+smiley;
    this.newMessage=this.smiley;

    }
 
}
