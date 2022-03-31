import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username=  this.authService.getUsername()
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }




}
