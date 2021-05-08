import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {}

  onClickLogin() {
    this.router.navigate(['login']);
  }

  onClickLogout() {
    this.userService.logout();
  }
}
