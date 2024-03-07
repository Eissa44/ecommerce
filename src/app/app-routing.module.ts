import { SettingModule } from './components/setting/setting.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/shared/guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Product Details',
      },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'payment/:id', component: PaymentComponent, title: 'Payment' },
      { path: 'wish', component: WishlistComponent, title: 'Wishlist' },
      { path: 'product', component: ProductsComponent, title: 'Product' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Cotegories',
      },
      {
        path: 'categorydetails/:id',
        component: CategoryDetailsComponent,
        title: 'Category details',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },

      // {
      //   path: 'setting',
      //   loadChildren: () =>
      //     import('./components/setting/setting.module').then(
      //       (m) => m.SettingModule
      //     ),
      // },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgotpasswordComponent },
    ],
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
