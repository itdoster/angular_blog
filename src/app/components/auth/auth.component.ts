import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthModel} from '../../shared/models/auth.model';
import {AuthService, AlertService} from '../../services/index';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  private authModel: AuthModel;
  private returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.authModel = new AuthModel();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
  }

  private login(): void {
    this.authService.authorize(this.authModel).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
      });
  }
}
