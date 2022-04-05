import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  // private apiURL='http://localhost:8080';
  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get(environment.apiURL+'/api/rooms')
  }
  save(room:any){
    return this.httpClient.post(environment.apiURL+'/api/rooms',room)
  }
  delete(room:any){
    return this.httpClient.delete(environment.apiURL+'/api/rooms/'+room.id)
  }
  update(room:any){
    return this.httpClient.put(environment.apiURL+'/api/rooms/'+room.id,room)
  }
  findRoomByBlock_Id(id:any){
    return this.httpClient.get(environment.apiURL+'/api/rooms/blocks/'+ id);
  }
  findRoomByBlock_Name(name:any){
    return this.httpClient.get(environment.apiURL+'/api/rooms/blocks/'+ name);
  }
  findRoomById(id:any){
    return this.httpClient.get(environment.apiURL+'/api/rooms/'+ id);
  }
  searchRoom(idBlock:any,name:any,description:any){
    return  this.httpClient.get(environment.apiURL+'/api/rooms/search?idBlock='+idBlock+'&name='+ name+'&description='+description);
}

}
