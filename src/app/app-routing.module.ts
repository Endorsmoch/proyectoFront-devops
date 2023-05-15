import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { UserCrudComponent } from './pages/user-crud/user-crud.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: 'lobby', pathMatch: 'full'},
      {path: 'lobby', component: LobbyComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'user-crud', component: UserCrudComponent},
      {path: '**', redirectTo: 'lobby', pathMatch: 'full'},
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
