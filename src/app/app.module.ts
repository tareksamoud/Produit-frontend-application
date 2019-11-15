import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { ProduitComponent } from './produit/produit.component';
import { NvProduitComponent } from './nv-produit/nv-produit.component';
import { ProduitService } from './services/produit.service';
import { ModifierComponent } from './modifier/modifier.component';
import {ContactService} from './services/contact.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    ProduitComponent,
    NvProduitComponent,
    ModifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [ProduitService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
