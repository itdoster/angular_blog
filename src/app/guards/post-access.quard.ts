import {Injectable} from '@angular/core';
import {AuthService, PostsService} from '../services/index';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostAccessGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private postService: PostsService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const isAuthorized = this.authService.isAuthorized();
    if (isAuthorized) {
      return this.postService.isUserPost(this.authService.getUser().id, route.params['id'])
        .map((res) => {
          if (res) {
            return true;
          }
          this.router.navigate(['/404']);
          return false;
        });
    }
    this.router.navigate(['/404']);
    return false;
  }
}
