
import { LayoutComponent } from './layout.component';
import { GoalComponent } from './about/goal/goal.component';
import { ServicesComponent } from './about/services/services.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TermsComponent } from './terms/terms.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MobileHeaderComponent } from './shared/header/mobile-header/mobile-header.component';
import { PcHeaderComponent } from './shared/header/pc-header/pc-header.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomePartComponent } from './home/home-part/home-part.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import { PrimengListModule } from './../primeng-list.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RatingModule} from 'primeng/rating';
//import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialListModule } from './../angular-material-list.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeAboutComponent } from './home/home-about/home-about.component';
import { ReservationComponent } from './reservation/reservation.component';
import {MatStepperModule} from '@angular/material/stepper';
import {TimelineModule} from 'primeng/timeline';
import {AuthComponent} from './auth/auth.component';
import {ProfileComponent} from './reservation/profile/profile.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CoWorkerComponent } from './co-worker/co-worker.component';
import { CoWorkerAddComponent } from './co-worker/co-worker-add/co-worker-add.component';
import { ResultRequestComponent } from './co-worker/result-request/result-request.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './shop/products/products.component';
import { ProductComponent } from './shop/product/product.component';
import { SellerIntroComponent } from './shop/seller-intro/seller-intro.component';
import { HeaderShopComponent } from './shop/header-shop/header-shop.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    ProfileComponent,
    GoalComponent,
    ServicesComponent,
    HeaderComponent,
    PcHeaderComponent,
    MobileHeaderComponent,
    FooterComponent,
    HomePartComponent,
    FaqsComponent,
    TermsComponent,
    ContactComponent,
    AboutComponent,
    TeamComponent,
    HomeAboutComponent,
    ReservationComponent,
    AuthComponent,
    MarketingComponent,
    CoWorkerComponent,
    CoWorkerAddComponent,
    ResultRequestComponent,
    ShopComponent,
    ProductsComponent,
    ProductComponent,
    SellerIntroComponent,
    HeaderShopComponent,
  
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    PrimengListModule,
    CarouselModule,
  //  NgOtpInputModule,
    AngularMaterialListModule,
   // NgxPaginationModule,
    BreadcrumbModule,
    RatingModule,
    MatStepperModule,
    TimelineModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LayoutModule { }
