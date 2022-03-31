import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../../service/room.service";
import {BlockAddComponent} from "../../block/block-add/block-add.component";
import {RoomAddComponent} from "../room-add/room-add.component";
import {MatDialog} from "@angular/material/dialog";
import {RoomDeleteComponent} from "../room-delete/room-delete.component";
import {RoomEditComponent} from "../room-edit/room-edit.component";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  roomList:any;
  constructor(
    private roomService:RoomService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.roomService.findAll().subscribe(
      (data)=>{this.roomList=data}
    )
  }

  openDialogAdd() {
    const dialogRefAdd=this.matDialog.open(RoomAddComponent,{
      width:'800px',
      disableClose:true
    })
    dialogRefAdd.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }

  openDialogDelete(room:any) {
    const dialogRefAdd=this.matDialog.open(RoomDeleteComponent,{
      width:'600px',
      data:room,
      disableClose:true
    })
    dialogRefAdd.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }

  openDialogEdit(room: any) {
    const dialogRefEdit=this.matDialog.open(RoomEditComponent,{
      width:'800px',
      data:room,
      disableClose:true
    })
    dialogRefEdit.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }
}
