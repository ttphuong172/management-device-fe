import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {BlockService} from "../../../service/block.service";
import {RoomService} from "../../../service/room.service";
import {DeviceService} from "../../../service/device.service";

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {
  categoryList: any;
  blockList: any;
  cpuTypeList: String [] = ["Celeron", "Pentium", "Core i3", "Core i5", "Core i7", "Core i9"];
  storageTypeList: String [] = ["HDD", "SSD"];
  nameBlockSelected: any;
  roomListByBlock_Id: any;
  nameCatelogySelected: any;


  deviceForm = new FormGroup({
    id: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    useDate: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    model: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    serial: new FormControl(''),
    monitor: new FormControl(''),
    memory: new FormControl(''),
    cpuType: new FormControl(''),
    cpuGeneration: new FormControl(''),
    storageType: new FormControl(''),
    storageSize: new FormControl(''),
    storageType2: new FormControl(''),
    storageSize2: new FormControl(''),
    description: new FormControl(''),
    block: new FormControl(''),
    room: new FormControl('',),
    historyList: new FormControl('',),

  })


  constructor(
    private categoryService: CategoryService,
    private blockService: BlockService,
    private roomService: RoomService,
    private deviceService: DeviceService,
    public dialogRefEdit: MatDialogRef<DeviceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {

    this.deviceForm.setValue(this.data)
    console.log(this.data)
    // console.log(this.deviceForm.get('category')?.value.name)

    this.nameCatelogySelected=this.deviceForm.get('category')?.value.name;

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
          () => {
          },
          () => {
            // console.log(this.deviceForm.get('block')?.value.name);
            this.roomService.findRoomByBlock_Name(this.deviceForm.get('block')?.value.name).subscribe(
              (data) => {
                this.roomListByBlock_Id = data
              }
            )

          },
        )
      }
    )
  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  loadRoom(event: any) {
    this.nameBlockSelected = event.target.selectedOptions[0].innerHTML;
    console.log(this.nameBlockSelected);
    console.log(event.target.selectedOptions[0].innerHTML);
    // this.roomService.findRoomByBlock_Id(this.idBlockSelected).subscribe(
    this.roomService.findRoomByBlock_Name(this.nameBlockSelected).subscribe(
      (data) => {
        this.roomListByBlock_Id = data
        this.deviceForm.controls['room'].setValue('');
      }
    )
  }

  update() {
    this.deviceService.update(this.deviceForm.value).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.dialogRefEdit.close();
      }
    )
  }

  get brand() {
    return this.deviceForm.get('brand')!;
  }

  get model() {
    return this.deviceForm.get('model')!;
  }

  closeDialogAdd() {
    this.dialogRefEdit.close();
  }
  changeCategory($event: any) {
    this.nameCatelogySelected = $event.target.selectedOptions[0].innerHTML;
  }
}
