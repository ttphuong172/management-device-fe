import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../../service/login.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formLogin = new FormGroup({
      username:new FormControl(''),
      password: new FormControl()
    });

  constructor(
    private loginService:LoginService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.formLogin.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.authService.setToken(data.jwtToken);
        this.authService.setUsername(data.username);
        this.authService.setRole(data.role);
        this.router.navigateByUrl("admin/rooms");
      }
    )
  }
}
