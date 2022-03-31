import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlockService} from "../../../service/block.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-block-edit',
  templateUrl: './block-edit.component.html',
  styleUrls: ['./block-edit.component.css']
})
export class BlockEditComponent implements OnInit {
  blockForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(30)])
  })
  constructor(
    private blockService: BlockService,
    public dialogRefEdit: MatDialogRef<BlockEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.blockForm.setValue(this.data)
  }


  update() {
    this.blockService.update(this.blockForm.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefEdit.close();
      }
    )
  }

  closeDialogEdit() {
    this.dialogRefEdit.close();
  }
  get name() { return this.blockForm.get('name')!; }
  get description() { return this.blockForm.get('description')!; }
}
