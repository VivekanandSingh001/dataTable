import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
Name:any=[];
  constructor(private http:HttpClient) { }
  GetData(){
     this.http.get("http://localhost:3000/users").subscribe(res=>{
      console.log("sjwsj",res);
     })
  }
}
