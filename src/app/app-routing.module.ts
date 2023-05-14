import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { UserCrudComponent } from './pages/user-crud/user-crud.component';

const routes: Routes = [
  {path: '', redirectTo: 'lobby', pathMatch: 'full'},
  {path: 'lobby', component: LobbyComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-crud', component: UserCrudComponent},
  {path: '**', redirectTo: 'lobby', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
