import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {BlockService} from "../../../service/block.service";
import {RoomService} from "../../../service/room.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeviceService} from "../../../service/device.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {
  categoryList: any;
  blockList: any;
  cpuTypeList: String []=["Celeron", "Pentium","Core i3","Core i5","Core i7","Core i9"];
  storageTypeList: String []=["HDD","SSD"];
  roomListByBlock_Id: any;
  nameCatelogySelected: any;
  nameBlockSelected: any;

  deviceForm = new FormGroup({
    id: new FormControl(),
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
    room: new FormControl('', [Validators.required])
  })


  constructor(
    private categoryService: CategoryService,
    private blockService: BlockService,
    private roomService: RoomService,
    private deviceService: DeviceService,
    public dialogRefAdd: MatDialogRef<DeviceAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
  }

  ngOnInit(): void {

      console.log(this.data)


    this.categoryService.findAll().subscribe(
      (data) => {
        this.categoryList = data
      },
      () => {
      },
      () => {
        this.blockService.findAll().subscribe(
          (data) => {
            this.blockList = data;
          },
          () => {
          },
          () => {
            this.deviceForm.controls['block'].setValue(this.data.block);
            this.deviceForm.controls['room'].setValue(this.data);

          }
        )
      }
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
        this.deviceForm.controls['room'].setValue('');
      }
    )
  }

  closeDialogAdd() {
    this.dialogRefAdd.close();
  }

  save() {
    if (this.deviceForm.valid) {
      this.deviceService.save(this.deviceForm.value).subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.dialogRefAdd.close();
        }
      );
    }
  }

  get brand() {
    return this.deviceForm.get('brand')!;
  }

  get model() {
    return this.deviceForm.get('model')!;
  }


  changeCategory($event: any) {
    this.nameCatelogySelected = $event.target.selectedOptions[0].innerHTML;
  }
}
