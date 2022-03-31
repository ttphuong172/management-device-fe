import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomService} from "../../../service/room.service";
import {BlockService} from "../../../service/block.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  blockList:any;
  roomForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('',[Validators.required,Validators.maxLength(20)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    block: new FormControl('',[Validators.required])
  })
  constructor(
    private blockService:BlockService,
    private roomService:RoomService,
    public dialogRefEdit: MatDialogRef<RoomEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) { }

  ngOnInit(): void {
    this.blockService.findAll().subscribe(
      (data)=>{this.blockList=data},
        ()=>{},
        ()=>{
          this.roomForm.setValue(this.data)
      }
    )
  }

  update() {
    this.roomService.update(this.roomForm.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefEdit.close();
      }
    )
  }

    compareByID(obj1:any,obj2:any) {
    return obj1 && obj2 && obj1.id==obj2.id
  }

  closeDialogAdd() {
    this.dialogRefEdit.close();
  }

  get name() { return this.roomForm.get('name')!; }
  get description() { return this.roomForm.get('description')!; }



}
