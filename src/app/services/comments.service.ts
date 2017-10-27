import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettings } from '../constants/app.settings';
import { AuthModel, Post, Comment } from '../shared/models/index';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

@Injectable()
export class CommentsService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;


    constructor(
        private http: Http,
        private router: Router,
        private authService: AuthService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.subject.next();
                }
            }
        });
    }

    //#region api calls

    public getCommentsByPostId(id: number) {
        return this.http.get(AppSettings.API_ENDPOINT + 'comments/' + id)
            .map(response => response.json());
    }

    public deleteComment(id: number) {
        return this.http.delete(AppSettings.API_ENDPOINT + 'comments/' + id, this.authService.jwt())
            .map(response => response.json());
    }

    public addComment(comment: Comment) {
        return this.http.post(AppSettings.API_ENDPOINT + 'comments/', comment, this.authService.jwt())
            .map(response => response.json());
    }

    //#endregion

    public callChangeEvent() {
        this.subject.next();
    }

    public getCommentAction(): Observable<any> {
        return this.subject.asObservable();
    }
}

