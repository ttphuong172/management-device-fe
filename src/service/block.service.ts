import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class BlockService {
  // private apiURL='http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }
  findAll(){
    return this.httpClient.get(environment.apiURL+'/api/blocks');
  }
  save(block:any){
    return this.httpClient.post(environment.apiURL+'/api/blocks',block);
  }

  update(block:any){
    return this.httpClient.put(environment.apiURL+'/api/blocks/'+ block.id,block);
  }
  delete(block:any){
    return this.httpClient.delete(environment.apiURL+'/api/blocks/'+block.id);
  }

}
