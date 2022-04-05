import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeviceService} from "../../../service/device.service";
import {CategoryService} from "../../../service/category.service";

@Component({
  selector: 'app-device-upgrade',
  templateUrl: './device-upgrade.component.html',
  styleUrls: ['./device-upgrade.component.css']
})
export class DeviceUpgradeComponent implements OnInit {
  categoryList: any;
  storageTypeList: String [] = ["HDD", "SSD"];

  deviceForm = new FormGroup({
    id: new FormControl(''),
    category: new FormControl({value: '', disabled: true}, [Validators.required]),
    useDate: new FormControl({value: '', disabled: true}, [Validators.required]),
    brand: new FormControl({value: '', disabled: true}, [Validators.required, Validators.maxLength(20)]),
    model: new FormControl({value: '', disabled: true}, [Validators.required, Validators.maxLength(20)]),
    serial: new FormControl({value: '', disabled: true}),
    monitor: new FormControl({value: '', disabled: true}),
    memory: new FormControl(''),
    cpuType: new FormControl({value: '', disabled: true}),
    cpuGeneration: new FormControl({value: '', disabled: true}),
    storageType: new FormControl({value: '', disabled: true}),
    storageSize: new FormControl({value: '', disabled: true}),
    storageType2: new FormControl(''),
    storageSize2: new FormControl(''),
    description: new FormControl({value: '', disabled: true}),
    block: new FormControl(''),
    room: new FormControl(''),
    historyList: new FormControl(''),
    historyUpgradeList: new FormControl('')
  })


  constructor(
    private deviceService:DeviceService,
    private categoryService:CategoryService,
    public dialogRefUpgrade: MatDialogRef<DeviceUpgradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.deviceForm.setValue(this.data)

    this.categoryService.findAll().subscribe(
      (data)=>{this.categoryList=data}
    )
  }

  upgrade() {
    this.deviceService.upgrade(this.deviceForm.value).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.dialogRefUpgrade.close();
      }
    )
  }

  closeDialogAdd() {
    this.dialogRefUpgrade.close();
  }
  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

}
