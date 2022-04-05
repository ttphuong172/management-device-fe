import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../../service/room.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlockService} from "../../../service/block.service";

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent implements OnInit {
  blockList:any;
  roomForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    block: new FormControl('',[Validators.required])
  })

  constructor(
    private roomService:RoomService,
    private blockService:BlockService,
    public dialogRefAdd: MatDialogRef<RoomAddComponent>
  ) { }

  ngOnInit(): void {
    this.blockService.findAll().subscribe(
      (data)=>{this.blockList=data}
    )
  }

  closeDialogAdd() {
    this.dialogRefAdd.close();
  }

  save() {
    if (this.roomForm.valid) {
      this.roomService.save(this.roomForm.value).subscribe(
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
  get name() { return this.roomForm.get('name')!; }
  get description() { return this.roomForm.get('description')!; }
}
