import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettings } from '../constants/app.settings';
import { AuthModel, Post } from '../shared/models/index';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map'

@Injectable()
export class PostsService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(
        private router: Router,
        private http: Http,
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

    public getAllPosts() {
        return this.http.get(AppSettings.API_ENDPOINT + 'posts')
            .map(response => response.json());
    }

    public getPostById(id: number) {
        return this.http.get(AppSettings.API_ENDPOINT + 'posts/' + id)
            .map(response => response.json());
    }

    public getPostsByTag(tag: string) {
        return this.http.get(AppSettings.API_ENDPOINT + 'posts/tag/' + tag)
            .map(response => response.json());
    }

    public updatePost(post: Post) {
        return this.http.put(AppSettings.API_ENDPOINT + 'posts', post, this.authService.jwt())
            .map(response => response.json());
    }

    public deletePost(post: Post) {
        return this.http.delete(AppSettings.API_ENDPOINT + 'posts/' + post.id, this.authService.jwt());
    }

    public addPost(post: Post) {
        return this.http.post(AppSettings.API_ENDPOINT + 'posts', post, this.authService.jwt())
            .map(response => response.json());
    }

    //#endregion

    //#region events

    public postDeletedEvent(post: Post, keepAfterNavigationChange = false) {
        this.subject.next(post);
    }

    public getDeletedPost(): Observable<any> {
        return this.subject.asObservable();
    }

    //#endregion
}

