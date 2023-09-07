import { Injectable } from '@angular/core';
import { AuthUsersService } from './auth-users.service';
import { ShareDateService } from './share-date.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BarchartService {

  
  constructor(private http:HttpClient,private service:AuthUsersService, private router: Router,private authService:AuthUsersService,private share:ShareDateService){}
  runFunctionsSequentially(all:any) {
    
    
  }
  
  charts_products:any=[0];
  
  
  get_car_:any;
  get_food_:any;
  get_pc_:any;
  get_drink_:any;
  get_furniture_:any;
  get_mobil_:any;
  
  objectArray:any[] = [];
  get(name:string){
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get('https://abdulwadoud.pythonanywhere.com/api/'+name+'/',{headers}).pipe(
      map((response: any) => {
        return [name+'s', response.length]; 
      })
    );
  }
  
  
  
  get_TypeFromCategory(id:any){
    const access_token= this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get('https://abdulwadoud.pythonanywhere.com/category/'+id+'/',{headers}).pipe(
      map((response: any) => {
        return response.length;   
      })
    );
  }
  
  get_ProductFromType(id:any){
      const access_token= this.authService.getAccessToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
      return this.http.get('https://abdulwadoud.pythonanywhere.com/type/'+id+'/',{headers}).pipe(
        map((response: any) => {
          return response.length;   
        })
      );
  }
  
}
