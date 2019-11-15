import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:'root'})
export class ContactService {
  host:string="http://localhost:8080";
  constructor(private http:HttpClient){}

  addRessource(url:string, data:Contact):Observable<any>{
    return this.http.post(url,data);
  }
}
