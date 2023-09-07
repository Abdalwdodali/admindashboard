import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {

  constructor(private http: HttpClient) { }

  private isAuthenticated = false;

private Isfirstentry:any= 'false';
private username:any;

  login(username: string, password: string) {
    return this.http.post("https://abdulwadoud.pythonanywhere.com/api/token/", { username, password })
      .pipe(
        tap((response:any) => {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('username', username);
          this.isAuthenticated = true;

        })
      );
  }

getIsfirstentry(){
     this.Isfirstentry = localStorage.getItem('Isfirstentry');
    return this.Isfirstentry;
  }

  Setfirstentry(value:any) {
    localStorage.setItem('Isfirstentry',value);
    
  }

  IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  getUsername(): string | null {
    const username = localStorage.getItem('username');
    return username ? username : null;
  }

  getUserIdByUsername(username: string): Observable<any> {
    const url = `https://abdulwadoud.pythonanywhere.com/users/username/${username}/`;  
    return this.http.get<any>(url);
  }
 

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');localStorage.removeItem('userid');
    this.isAuthenticated = false;
  }
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
