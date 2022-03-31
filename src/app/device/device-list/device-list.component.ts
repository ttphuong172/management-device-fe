import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../../../service/device.service";
import {MatDialog} from "@angular/material/dialog";
import {DeviceAddComponent} from "../device-add/device-add.component";
import {DeviceEditComponent} from "../device-edit/device-edit.component";
import {DeviceDeleteComponent} from "../device-delete/device-delete.component";
import {CategoryService} from "../../../service/category.service";
import {BlockService} from "../../../service/block.service";
import {RoomService} from "../../../service/room.service";
import {DeviceMoveComponent} from "../device-move/device-move.component";


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  deviceList: any;
  categoryList: any;
  blockList: any;
  roomList: any;
  idCategory = '';
  idBlock = '';
  idRoom = '';
  brand = '';
  nameBlock: any;
  model = '';
  cpuType = '';
  memory='';
  storageType='';
  deviceNameSetList = [];
  quantityDeviceMap = new Map;


  constructor(
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private blockService: BlockService,
    private roomService: RoomService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.deviceService.findAll().subscribe(
      (data) => {
        this.deviceList = data;
      },
      () => {
      },
      () => {
        this.categoryService.findAll().subscribe(
          (data) => {
            this.categoryList = data
          },
          () => {
          },
          () => {
            this.blockService.findAll().subscribe(
              (data) => {
                this.blockList = data
              },
              ()=>{},
              ()=>{
                this.getdeviceNameListNoDupication();
                this.countQuantityDevice()
              }
            )
          }
        )
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


  categoryChange($event: any) {
    this.idCategory = $event.target.value;
    this.loadDeviceList()
  }

  brandKeyUp($event: any) {
    console.log($event.target.value);
    this.brand = $event.target.value;
    this.loadDeviceList()
  }

  blockChange($event: any) {
    // console.log($event);
    this.idRoom = '';
    console.log($event.target.selectedOptions[0].innerHTML);
    this.nameBlock = $event.target.selectedOptions[0].innerHTML;
    this.idBlock = $event.target.value;
    this.deviceService.searchDevice(this.idCategory, this.brand, this.idBlock, this.idRoom, this.model, this.cpuType,this.memory,this.storageType).subscribe(
      (data) => {
        this.deviceList = data
      }, () => {
      }, () => {
        this.roomService.findRoomByBlock_Name(this.nameBlock).subscribe(
          (data) => {
            this.roomList = data
            console.log(this.deviceList)
          },()=>{},()=>{
            this.getdeviceNameListNoDupication();
            this.countQuantityDevice()
          }
        )
      }
    )
  }

  loadDeviceList() {
    this.deviceService.searchDevice(this.idCategory, this.brand, this.idBlock, this.idRoom, this.model, this.cpuType,this.memory,this.storageType).subscribe(
      (data) => {
        this.deviceList = data
        console.log(this.deviceList)
      },()=>{},()=>{
        this.getdeviceNameListNoDupication();
        this.countQuantityDevice()
      }
    )
  }

  getdeviceNameListNoDupication(){
    for (let device of this.deviceList) {
      let name = device.category.name;
      // @ts-ignore
      if (this.deviceNameSetList.indexOf(name) == -1) {
        // @ts-ignore
        this.deviceNameSetList.push(name)
      }
    }
  }
  countQuantityDevice(){
    for (let i = 0; i < this.deviceNameSetList.length; i++) {
      let count = 0;
      // console.log(this.deviceSetList[i])
      for (let j = 0; j < this.deviceList.length; j++) {
        // console.log(this.deviceList[j].category.name)
        if (this.deviceNameSetList[i] == this.deviceList[j].category.name) {
          count++;
        }
      }
      // console.log(this.deviceSetList[i])
      // console.log(count)
      this.quantityDeviceMap.set(this.deviceNameSetList[i],count)
    }
  }

  roomChange($event: any) {
    console.log($event.target.value);
    this.idRoom = $event.target.value;
    this.loadDeviceList()
  }

  modelKeyUp($event: any) {
    console.log($event.target.value);
    this.model = $event.target.value;
    this.loadDeviceList()
  }

  cpuTypeKeyUp($event: any) {
    console.log($event.target.value);
    this.cpuType = $event.target.value;
    this.loadDeviceList()
  }

  memoryKeyUp($event: any) {
    console.log($event.target.value);
    this.memory = $event.target.value;
    this.loadDeviceList()
  }



  storageTypeKeyUp($event: any) {
    console.log($event.target.value);
    this.storageType = $event.target.value;
    this.loadDeviceList()
  }

  openDialogMove(device: any) {
    const dialogRefMove = this.matDialog.open(DeviceMoveComponent, {
      width: '1000px',
      disableClose: true,
      data:device
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
}
