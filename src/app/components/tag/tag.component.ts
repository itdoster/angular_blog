import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/interfaces/index';
import { PostsService, AlertService, AuthService } from '../../services/index';
import { Post } from '../../shared/models/index';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public posts: Post[];
  public user: User;
  private tag: string;
  private isLoading: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private postService: PostsService) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.user = this.authService.getUser();
    this.tag = this.route.snapshot.params["tag"];
    if (this.tag) {
      this.loadPostsByTag();
    }
  }

  private loadPostsByTag(): void {
    this.isLoading = true;
    this.postService.getPostsByTag(this.tag).subscribe(
      posts => { this.posts = posts; },
      error => { this.alertService.error(error); },
      () => { this.isLoading = false; }
    )
  }

}
