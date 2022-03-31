import { Component, OnInit } from '@angular/core';
import {BlockService} from "../../../service/block.service";
import {MatDialog} from "@angular/material/dialog";
import {BlockAddComponent} from "../block-add/block-add.component";
import {BlockEditComponent} from "../block-edit/block-edit.component";
import {BlockDeleteComponent} from "../block-delete/block-delete.component";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {
  blockList: any;
  constructor(
    private blockService:BlockService,
    public matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.blockService.findAll().subscribe(
      (data)=>{
        this.blockList=data;
      }
    )
  }

  openDialogAdd() {
      const dialogRefAdd=this.matDialog.open(BlockAddComponent,{
        width:'800px',
        disableClose:true
      })
      dialogRefAdd.afterClosed().subscribe(
        ()=>{},
        ()=>{},
        ()=>{
          this.ngOnInit();
        }
      )
  }

  openDialogEdit(block:any) {
    const dialogRefEdit=this.matDialog.open(BlockEditComponent,{
      width:'800px',
      data:block,
      disableClose:true
    })
    dialogRefEdit.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }


  openDialogDelete(block:any) {
    const dialogRefDelete=this.matDialog.open(BlockDeleteComponent,{
      width:'600px',
      data:block,
      disableClose:true
    })
    dialogRefDelete.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }
}
