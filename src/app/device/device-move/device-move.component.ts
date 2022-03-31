import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../../../service/room.service";
import {BlockService} from "../../../service/block.service";
import {DeviceService} from "../../../service/device.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-device-move',
  templateUrl: './device-move.component.html',
  styleUrls: ['./device-move.component.css']
})
export class DeviceMoveComponent implements OnInit {
  blockList: any;
  nameBlockSelected: any;
  roomListByBlock_Id: any;
  room: any;
  formMoveDTO=new FormGroup({
    moveDate:new FormControl(),
    room:new FormControl()
  })

  constructor(
    private blockService:BlockService,
    private roomService:RoomService,
    private deviceService:DeviceService,
    public dialogRefMove: MatDialogRef<DeviceMoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.blockService.findAll().subscribe(
      (data)=>{this.blockList=data}
    )
  }

  loadRoom(event: any) {
    this.nameBlockSelected = event.target.selectedOptions[0].innerHTML;
    console.log(this.nameBlockSelected);
    console.log(event.target.selectedOptions[0].innerHTML);
    // this.roomService.findRoomByBlock_Id(this.idBlockSelected).subscribe(
    this.roomService.findRoomByBlock_Name(this.nameBlockSelected).subscribe(
      (data) => {
        this.roomListByBlock_Id = data
      }
    )
  }

  closeDialogMove() {
    this.dialogRefMove.close();
  }

  move() {
    this.deviceService.move(this.data.id,this.formMoveDTO.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefMove.close();
      }
    )
  }
}
