import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../service/room.service";
import {DeviceService} from "../../../service/device.service";
import {DeviceEditComponent} from "../../device/device-edit/device-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {DeviceAddComponent} from "../../device/device-add/device-add.component";
import {DeviceDeleteComponent} from "../../device/device-delete/device-delete.component";
import {DeviceMoveComponent} from "../../device/device-move/device-move.component";


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: any;
  deviceList: any;
  deviceSetList = [];
  quantityDeviceMap = new Map;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private deviceService: DeviceService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getRoom()
  }

  getRoom() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.roomService.findRoomById(id).subscribe(
      (data) => {
        this.room = data;
        console.log(this.room)
      },
      () => {
      },
      () => {
        this.deviceService.findAllByRoom_Id(id).subscribe(
          (data) => {
            this.deviceList = data;
            console.log(this.deviceList)
          },
          () => {
          },
          () => {
            this.getdeviceNameListNoDupication();
            this.countQuantityDevice()
          }
        )
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

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(DeviceAddComponent, {
      width: '1000px',
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

  openDialogMove(device: any) {
    const dialogRefMove = this.matDialog.open(DeviceMoveComponent, {
      width: '1000px',
      disableClose: true,
      data: device
    })
    dialogRefMove.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }

  getdeviceNameListNoDupication(){
    for (let device of this.deviceList) {
      let name = device.category.name;
      // @ts-ignore
      if (this.deviceSetList.indexOf(name) == -1) {
        // @ts-ignore
        this.deviceSetList.push(name)
      }
    }
  }
  countQuantityDevice(){
    for (let i = 0; i < this.deviceSetList.length; i++) {
      let count = 0;
      // console.log(this.deviceSetList[i])
      for (let j = 0; j < this.deviceList.length; j++) {
        // console.log(this.deviceList[j].category.name)
        if (this.deviceSetList[i] == this.deviceList[j].category.name) {
          count++;
        }
      }
      // console.log(this.deviceSetList[i])
      // console.log(count)
      this.quantityDeviceMap.set(this.deviceSetList[i],count)
    }
  }

}
