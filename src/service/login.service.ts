import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private apiURL='http://localhost:8080';

  constructor(
    private httpClient:HttpClient
  ) { }
  login(jwtRequest:any){
    return this.httpClient.post(environment.apiURL+'/api/auth/signin', jwtRequest)
  }
}
