import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//My components
import { RegisterComponent } from './pages/register/register.component';
import { UserCrudComponent } from './pages/user-crud/user-crud.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { CommentCrudComponent } from './pages/comment-crud/comment-crud.component';
import { AddressCrudComponent } from './pages/address-crud/address-crud.component';
import { OrderCrudComponent } from './pages/order-crud/order-crud.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
import {MatMenuModule} from '@angular/material/menu';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserCrudComponent,
    LobbyComponent,
    NavbarComponent,
    LoginComponent,
    MainLayoutComponent,
    ProductCrudComponent,
    CommentCrudComponent,
    AddressCrudComponent,
    OrderCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
