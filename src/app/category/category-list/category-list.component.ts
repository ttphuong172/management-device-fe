import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {BlockEditComponent} from "../../block/block-edit/block-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {CategoryAddComponent} from "../category-add/category-add.component";
import {CategoryDeleteComponent} from "../category-delete/category-delete.component";
import {CategoryEditComponent} from "../category-edit/category-edit.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList:any;
  constructor(
    private categoryService:CategoryService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(
      (data)=>{this.categoryList=data}
    )
  }

  openDialogAdd() {
    const dialogRefAdd=this.matDialog.open(CategoryAddComponent,{
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

  openDialogDelete(category: any) {
    const dialogRefDelete=this.matDialog.open(CategoryDeleteComponent,{
      width:'800px',
      data:category,
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

  openDialogEdit(category: any) {
    const dialogRefDelete=this.matDialog.open(CategoryEditComponent,{
      width:'800px',
      data:category,
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
