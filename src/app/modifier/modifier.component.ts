import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  etat:number=1;
  currentProduit:Produit;
  url:string;
  constructor(
    private produitService:ProduitService,
    private routes:Router,
    private activatedRout:ActivatedRoute
    ) { }

  ngOnInit() {
    this.url=atob(this.activatedRout['snapshot'].params.id);
    this.produitService.getProduitUrl(this.url).
    subscribe(resp=>{
      this.currentProduit=resp;
    },
    err=>{
      console.log(err);
    })
  }

  onModifierProduit(v:Produit){
    this.produitService.alterProdut(this.url,v).
    subscribe(
      data=>{
        this.currentProduit=data;
        this.etat=2;
      },
      erreur=>{
        console.log(erreur);
      }
    );
  }
  onRetourVersRecherche(){
    return this.routes.navigateByUrl("/produits")
  }
}
