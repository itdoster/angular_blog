import { Component, OnInit } from '@angular/core';
import { PostsService, AlertService, AuthService, CommentsService } from '../../services/index';
import { Tag, Post } from '../../shared/models/index';
import { User } from '../../shared/interfaces/index';
import { sumBy, take, orderBy, clone, groupBy } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public posts: Post[];
  public discussedPosts: Post[];
  public popularTags: Tag[] = [];
  public user: User;
  public isLoading: boolean = false;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private postService: PostsService,
    private alertService: AlertService) {

  }

  ngOnInit(): void {
    if (this.authService.isAuthorized()) {
      this.user = this.authService.getUser();
    }
    this.commentsService.getCommentAction().subscribe(res => {
      this.setDiscussedPosts(this.posts);
      this.setPopularTags(this.posts);
    });
    this.postService.getDeletedPost().subscribe(post => this.recalculatePosts(post));
    this.loadPosts();
  }

  private loadPosts(): void {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe(
      posts => {
        this.posts = clone(posts);
        this.setDiscussedPosts(this.posts);
        this.setPopularTags(this.posts);
      },
      error => { this.alertService.error(error); },
      () => { this.isLoading = false; })
  }

  private setDiscussedPosts(posts: Post[]): void {
    this.discussedPosts = take(orderBy(posts, post => post.commentsCount, ['desc']), 5);
  }

  private setPopularTags(postsClone: Post[]): void {
    var tags = [];
    var groupedPosts = groupBy(postsClone, post => post.tag);
    Object.keys(groupedPosts).forEach(tag => {
      var count = sumBy(groupedPosts[tag], post => post.commentsCount);
      tags.push(new Tag(tag, count));
    })
    this.popularTags = take(orderBy(tags, tag => tag.count, ['desc']), 5);
  }

  private recalculatePosts(post: Post): void {
    this.posts.splice(this.posts.indexOf(post), 1);
    var clonedPosts = clone(this.posts);
    this.setDiscussedPosts(clonedPosts);
    this.setPopularTags(clonedPosts);
  }

}
