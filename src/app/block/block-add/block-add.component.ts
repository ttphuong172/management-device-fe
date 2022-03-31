import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BlockService} from "../../../service/block.service";

@Component({
  selector: 'app-block-add',
  templateUrl: './block-add.component.html',
  styleUrls: ['./block-add.component.css']
})
export class BlockAddComponent implements OnInit {
  blockForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(30)])
  })

  constructor(
    private blockService: BlockService,
    public dialogRefAdd: MatDialogRef<BlockAddComponent>
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    if (this.blockForm.valid) {
      this.blockService.save(this.blockForm.value).subscribe(
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

  closeDialogAdd() {
    this.dialogRefAdd.close();
  }

  get name() { return this.blockForm.get('name')!; }
  get description() { return this.blockForm.get('description')!; }
}
