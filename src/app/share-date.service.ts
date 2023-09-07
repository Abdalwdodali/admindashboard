import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDateService {

    sharedValueProduct: any;
    constructor(private http: HttpClient) {
       this.sharedValue = localStorage.getItem('dataValue');
       this.updateADD = localStorage.getItem('dataValue_2');
    }
    private sharedValue:any;
    private updateADD:any;
    setSharedValue(value: string){
      this.sharedValue=value;
    }
  
    getSharedValue(){
      return this.sharedValue;
    }
    
    setupdateADD(value: string){
      this.updateADD=value;
    }
  
  
  
  
    getupdateADD(){
      return this.updateADD;
    }
  
    getModelsData() {
     
    }
    getForeignKeyValue(id: number) {
     
    }
  
    private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    data$ = this.dataSubject.asObservable();
  
    sendData(data: any) {
      this.dataSubject.next(data);
    }
  
    private API_URL = 'http://localhost:8000';
  
  
  
    getUserMessages(userId: number, otherUserId: number) {
      return this.http.get(`${this.API_URL}/users/${userId}/messages/${otherUserId}/`);
    }
  
  
  
    sendMessage(senderId: number, receiverId: number, message: string) {
   
    }
   }

