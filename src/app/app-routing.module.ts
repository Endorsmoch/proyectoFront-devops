import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { UserCrudComponent } from './pages/user-crud/user-crud.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { CommentCrudComponent } from './pages/comment-crud/comment-crud.component';
import { AddressCrudComponent } from './pages/address-crud/address-crud.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], 
    children: [
      {path: '', redirectTo: 'lobby', pathMatch: 'full'},
      {path: 'lobby', component: LobbyComponent},
      {path: 'user-crud', component: UserCrudComponent},
      {path: 'product-crud', component: ProductCrudComponent},
      {path: 'comment-crud', component:CommentCrudComponent},
      {path: 'address-crud', component:AddressCrudComponent},
      {path: '**', redirectTo: 'lobby', pathMatch: 'full'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
