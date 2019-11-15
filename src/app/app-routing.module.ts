import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitComponent } from './produit/produit.component';
import { ContactComponent } from './contact/contact.component';
import { NvProduitComponent } from './nv-produit/nv-produit.component';
import { ModifierComponent } from './modifier/modifier.component';


const routes: Routes = [
  { path:'', redirectTo:'/produits', pathMatch:'full'},
  { path:'produits', component:ProduitComponent },
  {path: 'ajouterProduit',component:NvProduitComponent},
  {path:'contact', component:ContactComponent},
  {path:'modifier/:id', component:ModifierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
