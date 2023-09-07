import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TweenMax } from 'gsap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private router: Router,private http: HttpClient){}
  back(){
    this.router.navigate(['']);
  }
amount:any=1;
submitPayment() {
    
    const requestData = { amount: this.amount }; 
    alert(this.amount);
  this.http.post<any>('https://abdulwadoud.pythonanywhere.com/api/create-payment-intent/', requestData)
    .subscribe(response => {
      this.handleStripeResponse(response.client_secret);
    });
  }

  handleStripeResponse(clientSecret: string) {
    // Use Stripe.js to handle payment flow
    // Implement Stripe's payment methods and confirmations here
  }
  Facebook() {
    window.open('https://www.facebook.com', '_blank');
  }
  Twitter() {
    window.open('https://www.facebook.com', '_blank');
  }
  Github() {
    window.open('https://www.facebook.com', '_blank');
  }
  Instagram() {
    window.open('https://www.twitter.com', '_blank');
  }
  ngOnInit(): void{ 
  const image = document.querySelector('#image');
  TweenMax.to(image, 1, { opacity: 1, y: -150,delay:.3 });
}
}
