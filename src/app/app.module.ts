import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { ShareDateComponent } from './share-date/share-date.component';
import { StoryComponent } from './story/story.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { NgChartsModule } from 'ng2-charts';
import { TypeComponent } from './type/type.component';
import { ProductComponent } from './product/product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MapComponent } from './map/map.component';
import { AboutAppComponent } from './about-app/about-app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const routes: Routes = [
  { path: 'mailBox', component: MailboxComponent  },
  { path: 'product/:id', component: ProductComponent  },
  { path: 'category/type/:id', component: TypeComponent  },
  { path: 'profile', component: ProfileComponent  },
  { path: 'profile/:id', component: ProfileComponent  },
  { path: 'editProfile', component: EditProfileComponent  },
  { path: '', component: CategoryComponent  },
  { path: 'category/:Name', component: CategoryComponent  },
   {path:'display',component:ProductComponent},
   {path:'category',component:CategoryComponent},
  { path: 'story', component: StoryComponent  },
  { path: 'login' ,component:LoginComponent},
  { path: 'about' ,component:AboutComponent},
  { path: 'user' ,component:UsersComponent},
  { path: 'user/:id' ,component: ProfileComponent},
  { path: 'mailBox/:id' ,component: ProfileComponent},
  { path: 'story/:id' ,component: ProfileComponent},
  { path: 'product/:id/:id', component: ProfileComponent  },
  { path: 'map' ,component: MapComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ProfileComponent,
    MailboxComponent,
    ShareDateComponent,
    StoryComponent,
    AboutComponent,
    CategoryComponent,
    TypeComponent,
    ProductComponent,
    EditProfileComponent,
    MapComponent,
    AboutAppComponent
  ],
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' }),
    BrowserModule,
    AppRoutingModule,GoogleMapsModule,FontAwesomeModule,ImageCropperModule,HttpClientModule, BrowserAnimationsModule,MatIconModule,FormsModule,MatInputModule,MatSelectModule,MatMenuModule,MatButtonModule,
    MatTableModule,NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
