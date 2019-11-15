import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-nv-produit',
  templateUrl: './nv-produit.component.html',
  styleUrls: ['./nv-produit.component.css']
})
export class NvProduitComponent implements OnInit {
  currentProduct:Produit;
  state=false;
  constructor(
    private produitService:ProduitService,
    private routes:Router
    ) { }

  ngOnInit() {
  }

  onAjoutProduit(data:Produit){
    this.produitService.saveProduit(this.produitService.host+"/produits", data)
    .subscribe(
      resp=>{
        this.currentProduct=resp;
        this.state=true;
        //this.routes.navigateByUrl("/ajouterProduit");
      },
      err=>{
       console.log(err);
      });
  }

  rederigerVersAjouterProduit(){
    this.state=false;
  }
}
