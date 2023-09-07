import { Component ,OnInit } from '@angular/core';
import { AuthUsersService } from '../auth-users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthUsersService,private http:HttpClient,private router:Router){}
  username: any;
  password: any;
  error: any;



login(){
    this.authService.login(this.username, this.password).subscribe((response:any) => {
      this.router.navigate(['/']);
        },
        (error:any) => {
          this.error = 'Invalid username or password';
          console.error('Login error:', error);
        }
      );
  }
  new_username:any;
  new_email:any;
  new_password:any;
  new_password_2:any;
  first_name:any;
  last_name:any;
create(){
    const body = {
      "username": this.new_username,
      "password": this.new_password,
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.new_email
    };
    if(this.new_password==this.new_password_2){
     this.http.post('https://abdulwadoud.pythonanywhere.com/regester/',body).subscribe((response: any) => {
     if(response=='error'){
     alert('error');
     }
     else{

      this.authService.login(this.new_username, this.new_password).subscribe((response:any) => {
        this.authService.Setfirstentry('true');
        this.router.navigate(['/']);
          },
          (error:any) => {
            this.error = 'Invalid username or password';
            console.error('Login error:', error);
          }
        );

     }
       },
       (error:any)=>{
        $('.save_all').show();
        setTimeout(() => {  
          $('.save_all').hide();
        }, 1000);
       });
      }
      else{alert('password not same');}
 }
 ngOnInit() {
  $('#signUp').click(() => {
$('#create').show();
$('#login').hide(); $('.btm-sep').text('create new account');
  });

  $('.btm-sep').click(() => {
    $('#create').hide();$('.btm-sep').text('Login');
    $('#login').show();
      });
  
}
}
