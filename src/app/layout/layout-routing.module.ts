import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CoWorkerComponent } from './co-worker/co-worker.component';
import { MarketingComponent } from './marketing/marketing.component';
import { ProfileComponent } from './reservation/profile/profile.component';
import { SellerIntroComponent } from './shop/seller-intro/seller-intro.component';
import { ProductsComponent } from './shop/products/products.component';
import { ProductComponent } from './shop/product/product.component';
import { ShopComponent } from './shop/shop.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'reservation',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ReservationComponent,
      },
    ],
  },
  {
    path: 'reservation/profile/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'marketing',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MarketingComponent,
      },
    ],
  },
  {
    path: 'shop',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
      },
    ],
  },
  {
    path: 'shop/product/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
      },
    ],
  },
  {
    path: 'shop/products/:sellerID',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
    ],
  },
  {
    path: 'shop/products',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
    ],
  },
  {
    path: 'seller-intro',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SellerIntroComponent,
      },
    ],
  },
  {
    path: 'co-worker',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CoWorkerComponent,
      },
    ],
  },
  {
    path: 'team',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TeamComponent,
      },
    ],
  },
  {
    path: 'faqs',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: FaqsComponent,
      },
    ],
  },
  {
    path: 'terms',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TermsComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      },
    ],
  },
  {
    path: 'about',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      },
    ],
  },

  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AuthComponent,
      },
    ],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../core/user/user.module').then((m) => m.UserModule),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('../core/admin/admin.module').then((m) => m.AdminModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
