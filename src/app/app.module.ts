import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlockListComponent } from './block/block-list/block-list.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { RoomListComponent } from './room/room-list/room-list.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockAddComponent } from './block/block-add/block-add.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BlockEditComponent } from './block/block-edit/block-edit.component';
import { BlockDeleteComponent } from './block/block-delete/block-delete.component';
import { RoomAddComponent } from './room/room-add/room-add.component';
import { RoomDeleteComponent } from './room/room-delete/room-delete.component';
import { RoomEditComponent } from './room/room-edit/room-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { DeviceAddComponent } from './device/device-add/device-add.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { DeviceDeleteComponent } from './device/device-delete/device-delete.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { AdminComponent } from './common/admin/admin.component';
import {AdminGuard} from "../service/admin.guard";
import { DeviceMoveComponent } from './device/device-move/device-move.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    BlockListComponent,
    RoomListComponent,
    DeviceListComponent,
    BlockAddComponent,
    BlockEditComponent,
    BlockDeleteComponent,
    RoomAddComponent,
    RoomDeleteComponent,
    RoomEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryDeleteComponent,
    CategoryEditComponent,
    DeviceAddComponent,
    DeviceEditComponent,
    DeviceDeleteComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    DeviceMoveComponent,
    RoomDetailComponent,

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatDialogModule,
        RouterModule.forRoot([
            {path: "", component: LoginComponent},
            {path: "admin", component: AdminComponent,canActivate:[AdminGuard],children:[
                {path: "blocks", component: BlockListComponent},
                {path: "rooms", component: RoomListComponent},
                {path: "rooms/:id", component: RoomDetailComponent},
                {path: "devices", component: DeviceListComponent},
                {path: "categorys", component: CategoryListComponent}
              ]},
        ]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
