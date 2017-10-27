import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/index';
import { MatSnackBar } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {

    constructor(
        private alertService: AlertService,
        public snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.alertService.getMessage().subscribe(message => {
            this.snackBar.open(message.text, '', {
                duration: 800
            });
        });
    }
}