import {Component, Inject, OnInit} from '@angular/core';
import {BlockService} from "../../../service/block.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-block-delete',
  templateUrl: './block-delete.component.html',
  styleUrls: ['./block-delete.component.css']
})
export class BlockDeleteComponent implements OnInit {

  constructor(
    private blockService:BlockService,
    public dialogRefDelete: MatDialogRef<BlockDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }

  delete(data: any) {
    this.blockService.delete(data).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }
}
