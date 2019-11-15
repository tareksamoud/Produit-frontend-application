import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';

@Injectable({providedIn:'root'})
export class ProduitService{
  host:string="http://localhost:8080";

  constructor(private http:HttpClient){}

  public getProduitsByDesignation(mc:string, page:number, size:number):Observable<any>{
    return this.http.get(this.host+"/produits/search/chercherByDescriptionPage?motCle="+mc+"&page="+page+"&size="+size);
  }

  public deleteProduit(url:string):Observable<Produit>{
    return this.http.delete<Produit>(url);
  }

  public saveProduit(url:string, data:Produit):Observable<Produit>{
    return this.http.post<Produit>(url, data);
  }

  public alterProdut(url:string, data:Produit):Observable<Produit>{
    return this.http.put<Produit>(url,data);
  }

  public getProduitUrl(url:string):Observable<Produit>{
    return this.http.get<Produit>(url);
  }

}
