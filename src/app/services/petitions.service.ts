import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PetitionsService {
  public headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
  public API = 'https://legendofgodsapi.azurewebsites.net/api'
  public Chapter_id = ""
  public Element:number = 1;  //Change to 1
  public Chapters_length = ''

  constructor(private http: HttpClient) {
  }
  async get_all_chapters(){
    return await this.http.post(`${this.API}/get-all-chapters`,{}, {'headers':this.headers}).toPromise()
   }
  async get_one_chapter(data:any){
    return await this.http.get(`${this.API}/get-one-chapter/${data.chapter}/${data.languaje}/${data.page}`, {'headers':this.headers}).toPromise()
   }
  async get_chapters_fullnames(languaje:string){
    return await this.http.get(`${this.API}/get-chapters-fullnames/${languaje}`, {'headers': this.headers}).toPromise()
  }

  //Admin petitions

  async get_chapters_info(){
    return await this.http.get(`${this.API}/get-chapters-info`, {headers:this.headers}).toPromise()
  }
  async add_new_chapter(data:any){
    return await this.http.post(`${this.API}/add-new-chapter`, data, {headers:this.headers}).toPromise()
  }
  
}
