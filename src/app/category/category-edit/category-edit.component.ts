import {Component, Inject, OnInit} from '@angular/core';
import {BlockService} from "../../../service/block.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm= new FormGroup({
    id:new FormControl(''),
    name:new FormControl('',[Validators.required,Validators.maxLength(30)])
  })
  constructor(
    private categoryService: CategoryService,
    public dialogRefEdit: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.categoryForm.setValue(this.data)
  }


  closeDialogEdit() {
    this.dialogRefEdit.close();
  }



  update() {
    this.categoryService.update(this.categoryForm.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefEdit.close();
      }
    )
  }

  get name() { return this.categoryForm.get('name')!; }
}
