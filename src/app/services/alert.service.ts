import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class AlertService {
  private config: MatSnackBarConfig;

  constructor(public snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 1500;
  }

  public success(message: string): void {
    this.config.extraClasses = ['success'];
    this.snackBar.open(message, undefined, this.config);
  }

  public error(message: string): void {
    this.config.extraClasses = ['error'];
    this.snackBar.open(message, undefined, this.config);
  }
}
