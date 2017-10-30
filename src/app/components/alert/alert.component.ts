import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/index';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription();

    constructor(
        private alertService: AlertService,
        public snackBar: MatSnackBar) { }

    public ngOnInit(): void {
        this.subscription.add(this.alertService.getMessage().subscribe(message => {
            this.snackBar.open(message.text, '', {
                duration: 1500
            });
        }));
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}