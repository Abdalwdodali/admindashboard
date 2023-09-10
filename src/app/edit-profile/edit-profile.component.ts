import { Component ,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import { AuthUsersService } from '../auth-users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private route: Router,private http:HttpClient,private router: ActivatedRoute,private authService:AuthUsersService){}
  back(){this.route.navigate(['']);}
  response_:any;image:any;username:any;status:any;image_background:any;

  date_joined:any;
  last_name:any;
   first_name:any;
      email:any;
  facebook:any;
   twitter:any;
      instagram:any;
   whatsapp:any;
   telephone_Number:any; address:any;

   userId:any;
   fileImageProfile:any;fileImageProfile2:any;

@ViewChild('input_label_2', { static: false }) fileInputRef!: ElementRef;
onFileSelected_1(event: any){this.fileImageProfile = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {this.imageFileName_1 = e.target.result;};
      reader.readAsDataURL(input.files[0]);
    }
  
   
      const fileInputElement = this.fileInputRef.nativeElement as HTMLInputElement;
      if (fileInputElement.files && fileInputElement.files.length > 0) {
        const selectedFile = fileInputElement.files[0];
       alert('Selected file:');
      } else {
       alert('No file selected.');
      }
  

  
  
  }
    onFileSelected_2(event: any){this.fileImageProfile2 = event.target.files[0];
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {this.imageFileName_2 = e.target.result;};
        reader.readAsDataURL(input.files[0]);
      }}
         idProfile:any;
   ngOnInit() {
    this.username= this.authService.getUsername();
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.authService.getUserIdByUsername(this.username).subscribe((data:any) => {

      this.userId=data.user_id;
      this.http.get('https://abdulwadoud.pythonanywhere.com/api/users/'+this.userId+'/',{headers}).subscribe((Response:any)=>{
        this.response_=Response;
        this.image_background=this.response_.profile.image_background;
        this.image=this.response_.profile.image;
        this.imageFileName2=this.response_.profile.image;this.imageFileName_2=this.image;
        this.username=this.response_.username;
         this.status=this.response_.profile.status;
         this.date_joined=this.response_.date_joined;
         const dateObject = new Date(this.date_joined);
         const formattedDate = dateObject.toLocaleDateString();
         const formattedTime  = dateObject.toLocaleTimeString();
         this.date_joined = `${formattedDate}`;
         this.last_name=this.response_.last_name;
         this.first_name=this.response_.first_name;
         this.email=this.response_.email;
         this.telephone_Number=this.response_.profile.telephone_Number;
         this.facebook=this.response_.profile.facebook;this.imageFileName_1=this.image_background;
         this.twitter=this.response_.profile.twitter;
         this.instagram=this.response_.profile.instagram;
         this.whatsapp=this.response_.profile.whatsapp;
         this.address=this.response_.profile.address;
         this.idProfile=this.response_.profile.id;
  
  },
  error=>{});

    });


  }
  onButtonClick(): void {
    this.isFileInputClicked = true;
    const fileInput = document.getElementById('input_label_1');
    if (fileInput) {
      fileInput.click();
    }
  }

  
  isFileInputClicked = false;
  edit(){
    $('.edit').hide();$('.editBox').hide();


 
  }
  StartEdit(){$('.edit_socialMedia').show(); this.ftwi=this.facebook;$('.fab').css('color','#f7cb9c');$('.socialMedia_edit .fa-facebook-f').css('color','#999');
   $('.save_change').show();$('.fa-edit').hide();$('.socialMedia').hide();$('.socialMedia_edit').show();
    $('.textarea_telephone_Number').show() ;$('.textarea_status').show()
    $('.textarea_address').show();$('.BackgroundImageProfileEdit').addClass('editBackImage');$('.ImageProfileEdit').addClass('editImage');
    $('.textarea_telephone_Number_label').hide();$('.textarea_status_label').hide()
    $('.textarea_address_label').hide()
    $('.textarea_email_label').hide()
    $("#facebook").val(this.facebook);
    $("#twitter").val(this.twitter);
    $("#whatsapp").val(this.whatsapp);
    $("#instagram").val(this.instagram);
    $("#telephone_Number").val(this.telephone_Number);
    $("#email").val(this.email);
    $("#address").val(this.address);
    $("#status").val(this.status);
  }
  done:any='done';
  ftwi:any;
  facebook_(val:any){  this.done='done';
    this.ftwi=this.facebook;$('.edit_socialMedia').show();this.what_change='facebook';$('.fab').css('color','#f7cb9c');$('.socialMedia_edit .fa-facebook-f').css('color','#999');
  }
  twitter_(val:any){this.done='done';this.ftwi=this.twitter;$('.edit_socialMedia').show();this.what_change='twitter';$('.fab').css('color','#f7cb9c');$('.socialMedia_edit .fa-twitter').css('color','#999');}
  whatsapp_(val:any){this.done='done';this.ftwi=this.whatsapp;$('.edit_socialMedia').show();this.what_change='whatsapp';$('.fab').css('color','#f7cb9c');$('.socialMedia_edit .fa-whatsapp').css('color','#999');}
  instagram_(val:any){this.done='done';this.ftwi=this.instagram;$('.edit_socialMedia').show();this.what_change='instagram';$('.fab').css('color','#f7cb9c');$('.socialMedia_edit .fa-instagram').css('color','#999');}
what_change:any;
  save_socialMedia(what_change:any){ this.done='donut_large';$('.input_save').css('color','#999');
    setTimeout(() => {  
      this.done='done_all';$('.input_save').css('color','#FFF');
    }, 400);
   
if(this.what_change=='facebook'){
  this.facebook=this.ftwi;
}
if(this.what_change=='twitter'){
  this.twitter=this.ftwi;
}
if(this.what_change=='whatsapp'){
  this.whatsapp=this.ftwi;
}
if(this.what_change=='instagram'){
  this.instagram=this.ftwi;
}
const body = {
  facebook: this.facebook,
  twitter:  this.twitter,
  instagram: this.instagram,
  whatsapp: this.whatsapp,
};
  this.authService.getUserIdByUsername(this.username).subscribe((data:any) => {
    this.userId=data.user_id;
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.http.patch("https://abdulwadoud.pythonanywhere.com/api/profile/"+this.userId+'/', body,{headers}).subscribe(()=>{
      $('.edit').hide();$('.editBox').hide();
  });
});
  }
  imageFileName_1:any; imageFileName_2:any;
  imageFileName2:any;file2:any;
  formData:any;
  save(){ $('.edit_socialMedia').hide();$('.BackgroundImageProfileEdit').removeClass('editBackImage');$('.ImageProfileEdit').removeClass('editImage');
    $('.save_change').hide();$('.textarea_status_label').show();$('.textarea_status').hide();$('.fa-edit').show();
    $('.textarea_telephone_Number').hide();$('.socialMedia').show();$('.socialMedia_edit').hide();
    $('.textarea_address').hide()
    $('.textarea_telephone_Number_label').show()
    $('.textarea_address_label').show()
    $('.textarea_email_label').show();
    this.formData = new FormData();
    if(this.fileImageProfile2){this.formData.append('image', this.fileImageProfile2);}
    if(this.fileImageProfile){this.formData.append('image_background', this.fileImageProfile);}
    this.formData.append('facebook', this.facebook);
    this.formData.append('twitter', this.twitter);
    this.formData.append('instagram', this.instagram);
    this.formData.append('whatsapp', this.whatsapp);
    this.formData.append('telephone_Number', this.telephone_Number);
    this.formData.append('status', this.status);
    this.formData.append('address', this.address);
    this.formData.append('user', this.userId);
      this.authService.getUserIdByUsername(this.username).subscribe((data:any) => {
        this.userId=data.user_id;
        const access_token= this.authService.getAccessToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
        this.http.patch("https://abdulwadoud.pythonanywhere.com/api/profile/"+this.idProfile+'/', this.formData,{headers}).subscribe(()=>{
          $('.edit').hide();$('.editBox').hide();
          $('.save_all').show();
          setTimeout(() => {  
            $('.save_all').hide();
          }, 1000);
      },
      error=>{
        const access_token= this.authService.getAccessToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
         this.http.post('https://abdulwadoud.pythonanywhere.com/api/profile/', this.formData,{headers}).subscribe((response:any) => {
         $('.edit').hide();$('.editBox').hide();
         $('.save_all').show();
         setTimeout(() => {  
           $('.save_all').hide();
         }, 1000);
           },
           (error) => {alert('Error uploading file:');});




      });
    });
  }
}
