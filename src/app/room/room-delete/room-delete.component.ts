import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../../../service/room.service";

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.css']
})
export class RoomDeleteComponent implements OnInit {

  constructor(
    private roomService:RoomService,
    public dialogRefDelete: MatDialogRef<RoomDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }

  delete(data: any) {
    this.roomService.delete(data).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }
}
