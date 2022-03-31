import {Component, Inject, OnInit} from '@angular/core';
import {RoomService} from "../../../service/room.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeviceService} from "../../../service/device.service";

@Component({
  selector: 'app-device-delete',
  templateUrl: './device-delete.component.html',
  styleUrls: ['./device-delete.component.css']
})
export class DeviceDeleteComponent implements OnInit {

  constructor(
    private deviceService:DeviceService,
    public dialogRefDelete: MatDialogRef<DeviceDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  closeDialogDelete() {
this.dialogRefDelete.close();
  }

  delete(data: any) {
    this.deviceService.delete(data).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }
}
