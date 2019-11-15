import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public recommandation:Contact;
  constructor(
    private contactService:ContactService,
    private routes:Router
    ) { }

  ngOnInit() {
  }

  onSendClick(data:Contact) {
    this.contactService.addRessource(this.contactService.host+"/contacts",data)
      .subscribe(resp=>{
        window.alert("Recommandation bien envoyée :)");
        this.recommandation=resp;
        this.routes.navigateByUrl("/produits");
      },erreur=>{
        console.log(erreur);
      });
  }
}
