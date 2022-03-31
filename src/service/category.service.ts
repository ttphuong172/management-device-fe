import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private apiURL='http://localhost:8080';
  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get(environment.apiURL+'/api/categorys')
  }
  save(category:any){
    return this.httpClient.post(environment.apiURL+'/api/categorys',category)
  }
  delete(category:any){
    return this.httpClient.delete(environment.apiURL+'/api/categorys/'+ category.id)
  }
  update(category:any){
    return this.httpClient.put(environment.apiURL+'/api/categorys/'+ category.id,category)
  }

}
