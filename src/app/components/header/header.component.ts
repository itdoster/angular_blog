import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../shared/interfaces/index";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;
  private isAuthorized: boolean;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  public ngOnInit() {
    this.isAuthorized = this.authService.isAuthorized();
    if (this.isAuthorized) {
      this.user = this.authService.getUser();
    }
    this.authService.authorizedEvent().subscribe(user => {
      this.user = this.authService.getUser();
      this.isAuthorized = true;
    })
  }

  private logout(): void {
    this.authService.logout();
    this.isAuthorized = false;
    location.reload();
  }
}
