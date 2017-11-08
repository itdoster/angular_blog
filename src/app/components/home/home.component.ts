import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PostsService, AlertService, AuthService, CommentsService} from '../../services/index';
import {Tag, Post} from '../../shared/models/index';
import {User} from '../../shared/interfaces/index';
import {sumBy, take, orderBy, clone} from 'lodash';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public posts: Post[] = [];
  public discussedPosts: Post[] = [];
  public popularTags: Tag[] = [];
  public user: User;
  public isLoading = false;

  constructor(private commentsService: CommentsService,
              private authService: AuthService,
              private postService: PostsService,
              private alertService: AlertService) {
  }

  public ngOnInit(): void {
    if (this.authService.isAuthorized()) {
      this.user = this.authService.getUser();
    }
    this.subscription.add(this.commentsService.getCommentAction().subscribe(res => {
      this.setDiscussedPosts(this.posts);
      this.setPopularTags(this.posts);
    }));
    this.subscription.add(this.postService.getDeletedPost().subscribe(p => {
      this.recalculatePosts(p);
    }));

    this.loadPosts();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadPosts(): void {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe(
      posts => {
        this.posts = clone(posts);
        this.setDiscussedPosts(this.posts);
        this.setPopularTags(this.posts);
      },
      error => {
        this.alertService.error(error);
      },
      () => {
        this.isLoading = false;
      });
  }

  private setDiscussedPosts(posts: Post[]): void {
    this.discussedPosts = take(orderBy(posts, p => p.commentsCount, ['desc']), 5);
  }

  private setPopularTags(postsClone: Post[]): void {
    const tags = [];
    const allTags = new Set();
    postsClone.forEach(p => {
      p.tags.forEach(tag => {
        allTags.add(tag);
      });
    });
    allTags.forEach(tag => {
      const postWithTag = postsClone.filter(p => p.tags.includes(tag));
      const count = sumBy(postWithTag, p => p.commentsCount);
      tags.push(new Tag(tag, count));
    });
    this.popularTags = take(orderBy(tags, tag => tag.count, ['desc']), 5);
  }

  private recalculatePosts(changed_post: Post): void {
    this.posts.splice(this.posts.indexOf(changed_post), 1);
    const clonedPosts = clone(this.posts);
    this.setDiscussedPosts(clonedPosts);
    this.setPopularTags(clonedPosts);
  }

}
