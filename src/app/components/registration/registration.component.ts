import {Component, OnInit} from '@angular/core';
import {RegistrationModel} from '../../shared/models/index';
import {AuthService, AlertService} from '../../services/index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  private registration: RegistrationModel;

  public constructor(private authService: AuthService,
                     private alertService: AlertService,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.registration = new RegistrationModel();
  }

  public register(): void {
    this.authService.register(this.registration).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error(error);
      });
  }

}
