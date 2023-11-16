import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = "";
  password = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.user == "Abrilnv" && this.password == "123456")
      this.router.navigate(['//home']);
  }

}
