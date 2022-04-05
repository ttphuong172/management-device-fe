import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../../../service/device.service";
import {DeviceEditComponent} from "../device-edit/device-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {DeviceDeleteComponent} from "../device-delete/device-delete.component";

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
  device:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private deviceService:DeviceService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id);
    this.deviceService.findById(id).subscribe(
      (data)=>{
        this.device=data;
        console.log(this.device)
      }
    )
  }

  openDialogEdit(device: any) {
    const dialogRefAdd = this.matDialog.open(DeviceEditComponent, {
      width: '800px',
      data: device,
      disableClose: true
    })
    dialogRefAdd.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }

  openDialogDelete(device: any) {
    const dialogRefDelete = this.matDialog.open(DeviceDeleteComponent, {
      width: '800px',
      data: device,
      disableClose: true
    })
    dialogRefDelete.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }
}
