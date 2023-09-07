import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private route: Router,private http:HttpClient,private router: ActivatedRoute,private backRoute:ActivatedRoute){}
  back(){
    this.objectId_ = this.backRoute.snapshot.paramMap.get('id');
    this.objectName = this.backRoute.snapshot.paramMap.get('Name');
    this.backRoute.url.subscribe(urlSegments => {
      this.objectName = urlSegments.map(segment => segment.path).join('/');
      if(this.objectName.includes('user')){this.route.navigate(['user']);}
      if(this.objectName.includes('mailBox')){this.route.navigate(['mailBox']);}
      if(this.objectName.includes('story')){this.route.navigate(['story']);}
      if(this.objectName.includes('product')){
      let segments = this.objectName.split('/');
      segments.pop();
      let newUrl = segments.join('/');
      this.route.navigate([newUrl]);
    }
    });

}
objectName:any;objectId_:any;
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
   objectId:any;
   ngOnInit(){
    this.objectId = this.router.snapshot.paramMap.get('id');
     this.http.get('https://abdulwadoud.pythonanywhere.com/api/users/'+this.objectId+'/').subscribe((Response:any)=>{
      this.response_=Response;
      this.image_background=this.response_.profile.image_background;
      this.image=this.response_.profile.image;
      this.username=this.response_.username;
       this.status=this.response_.profile.status;
       this.date_joined=this.response_.date_joined;
       this.last_name=this.response_.last_name;
       this.first_name=this.response_.first_name;
       this.email=this.response_.email;
       this.telephone_Number=this.response_.profile.telephone_Number;
       this.facebook=this.response_.profile.facebook;
       this.twitter=this.response_.profile.twitter;
       this.instagram=this.response_.profile.instagram;
       this.whatsapp=this.response_.profile.whatsapp;
       this.address=this.response_.profile.address;

},
error=>{});
  }
}
