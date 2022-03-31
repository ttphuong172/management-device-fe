import {Component, Inject, OnInit} from '@angular/core';
import {BlockService} from "../../../service/block.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../service/category.service";

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  constructor(
    private categoryService:CategoryService,
    public dialogRefDelete: MatDialogRef<CategoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {

  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }

  delete(data: any) {
    this.categoryService.delete(data).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }
}
