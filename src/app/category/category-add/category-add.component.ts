import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm= new FormGroup({
    name:new FormControl('',[Validators.required,Validators.maxLength(30)])
  })
  constructor(
    private categoryService:CategoryService,
    public dialogRefAdd: MatDialogRef<CategoryAddComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialogAdd() {
    this.dialogRefAdd.close();
  }


  save() {
    if (this.categoryForm.valid) {
      this.categoryService.save(this.categoryForm.value).subscribe(
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

  get name() { return this.categoryForm.get('name')!; }
}
