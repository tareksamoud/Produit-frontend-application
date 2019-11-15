import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';
import { Router, RouterLinkActive  } from '@angular/router';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  listProduits:Produit[];
  currentPage:number=0;
  size:number=10;
  motCleCourant:string="";
  totalPages:number;
  pages:Array<number>;

  url:string;
  constructor(private produitService:ProduitService,
    private routes:Router) { }

  ngOnInit() {
  }

  onGetProduitsByDesignation(mc:any){
    this.motCleCourant=mc.motCle;
    this.currentPage=0;
    this.chercherParDesignation();
  }


  chercherParDesignation(){
    this.produitService.getProduitsByDesignation(this.motCleCourant,this.currentPage,this.size)
    .subscribe(
      data=>{
        this.totalPages=data['page'].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.listProduits=data;
    },
      e=>{
        console.log(e);
      }
    );
  }

  onChangeIndex(index:number){
    this.currentPage=index;
    this.chercherParDesignation();
  }

  onClickSupprimer(p:Produit){
    this.produitService.deleteProduit(p['_links']['self'].href).subscribe(
      data=>{
        this.chercherParDesignation();
      },
      erreur=>{
        console.log(erreur);
      }
    );
  }
  onClickModifier(p:Produit){
    this.url= p['_links'].self.href;
    return this.routes.navigateByUrl("/modifier/"+btoa(this.url));
    //window.alert("element modifier");
  }
}
