import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info={
    firstname:'Tarek',
    lastname:'Samoud',
    email:'tareksamoud@live.com'
  };
  commentaires=[];
  commentaire={message:'',date:null};
  msgStatus=false;
  constructor() { }

  ngOnInit() {
  }

  onAjoutMessage(){
    //console.log("commentaire ajouter");
    if(this.commentaire.message!=''){
    this.commentaire.date=new Date();
    this.commentaires.push({
      message:this.commentaire.message,
      date:this.commentaire.date
    });
    this.commentaire.message='';
    }
  }

}
