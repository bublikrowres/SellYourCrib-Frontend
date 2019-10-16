import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from "../shared/config";
import { Advert } from "../shared/models/advert";

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  url: string = `${config.baseUrl}/anunt`;

  constructor(
    private http: HttpClient
  ) { }

  advert : Advert;

  getAdverts(){
    return this.http.get(this.url);
  }

  createAdvert(advert: Advert){
    return this.http.post<Advert>(this.url,advert);
  }

  sendEdit(editRequest){
    const email = editRequest.email;
    const ref = editRequest.ref;
    return this.http.post(`${this.url}/show`,{email,ref});
  }

  markSold(editRequest){
    const email = editRequest.email;
    const ref = editRequest.ref;
    return this.http.put(`${this.url}`,{email,ref});
  }
  deleteAdvert(editRequest){
    const email = editRequest.email;
    const ref = editRequest.ref;
    return this.http.post(`${this.url}/delete`,{email,ref});

  }

}
