import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  // private apiURL='http://localhost:8080';
  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get(environment.apiURL+'/api/devices')
  }
  findById(id:any){
    return this.httpClient.get(environment.apiURL+'/api/devices/' + id)
  }
  save(device:any){
    return this.httpClient.post(environment.apiURL+'/api/devices',device)
  }
  update(device:any){
    return this.httpClient.put(environment.apiURL+'/api/devices/'+ device.id,device)
  }

  upgrade(device:any){
    return this.httpClient.put(environment.apiURL+'/api/devices/upgrade/'+ device.id,device)
  }

  move(id:any,roomDTO:any){
    return this.httpClient.put(environment.apiURL+'/api/devices/move/'+ id,roomDTO)
  }

  delete(device: any) {
    return this.httpClient.delete(environment.apiURL+'/api/devices/' + device.id)
  }
  searchDevice(idCategory:any,brand:any,idBlock:any,idRoom:any,model:any,cpuType:any,memory:any,storageType:any){
    return this.httpClient.get(environment.apiURL+'/api/devices/search?idCategory='+ idCategory + '&idBlock=' + idBlock + '&brand=' + brand + '&idRoom=' + idRoom + '&model=' + model + '&cpuType=' + cpuType  + '&memory=' + memory + '&storageType=' + storageType);
  }
  findAllByRoom_Id(id:any){
    return this.httpClient.get(environment.apiURL+'/api/devices/rooms/'+id);
  }
}
