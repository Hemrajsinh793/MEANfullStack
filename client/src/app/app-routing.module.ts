//modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { PagesNotFoundComponent } from './pages/pages-not-found/pages-not-found.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent, data:{title: 'Home'}},
  {path: 'about', component:AboutComponent, data:{title:'About'}},
  {path:'contact', component:ContactComponent, data:{title: 'Contact'}},
  {path: 'products', component:ProductsComponent, data:{title: 'Products'}},
  {path:'services', component:ServicesComponent, data:{title: 'Sevices'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PagesNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
