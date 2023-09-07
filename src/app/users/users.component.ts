import { Component } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { AuthUsersService } from '../auth-users.service';
import { Router } from '@angular/router';
import { TweenMax } from 'gsap';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private router: Router,private http: HttpClient,private authService:AuthUsersService){this.get();}
  back(){
    this.router.navigate(['']);
  }
  back_user(){ this.router.navigate(['user']);$('.show_user').hide(); 
    const image = document.querySelector('#image');
  TweenMax.to(image, 1, {opacity:0, y: -300,delay:0 });
}
  userList: any[] = [];
  displayedColumns: string[] = ['username', 'email', 'image', 'select'];
  downloadImage(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response);
      link.download = 'image.jpg';
      link.click();
      URL.revokeObjectURL(link.href);
    });}
 


  dataSource:any;
  get(): void {
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    this.http.get<any[]>('https://abdulwadoud.pythonanywhere.com/api/users/',{headers}).subscribe(
      (response) => {
        this.userList = response;
        this.dataSource=response;
        this.array_get_cars_=response; 
      },
      (error) => {
        console.error('Error retrieving user list:', error);
      }
    );
  }
delete(username:number){
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    if (confirm("Do you want to proceed?")) {
       this.http.delete('https://abdulwadoud.pythonanywhere.com/delete_users/'+username+'/',{headers}).subscribe((Response:any)=>{
    this.get();
      },
      error=>{});
    } 

  } 
  objectId:any;array_get_cars_:any;
  filterValue:any;
  filterList(): void {
    this.dataSource = this.array_get_cars_.filter((item:any) =>
      item.username.toLowerCase().includes(this.filterValue.toLowerCase())
    );
   }
  

}
