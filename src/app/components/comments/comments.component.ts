import {Component, OnInit, Input} from '@angular/core';
import {Comment} from '../../shared/models/index';
import {User} from '../../shared/interfaces/user.interface';
import {CommentsService, AuthService, AlertService} from '../../services/index';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() user: User;
  @Input() postId: number;
  @Input() commentsCount: number;

  private comments: Comment[];
  private newComment: Comment;
  private isAuthorized: boolean;
  private isLoading: boolean;

  constructor(private alertService: AlertService,
              private commentsService: CommentsService,
              private authService: AuthService) {
    this.newComment = new Comment();
    this.comments = [];
  }

  ngOnInit(): void {
    this.isAuthorized = this.user ? true : false;
    this.newComment.postId = this.postId;
  }

  private deleteComment(comment: Comment): void {
    this.commentsService.deleteComment(comment.id).subscribe(
      data => {
        this.comments.splice(this.comments.indexOf(comment), 1);
        this.commentsService.callChangeEvent();
        this.alertService.success('comment was deleted');
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  private addComment(): void {
    this.commentsService.addComment(this.newComment).subscribe(
      data => {
        this.newComment.message = '';
        this.comments.push(data);
        this.commentsService.callChangeEvent();
        this.alertService.success('comment was added');
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  private loadComments(): void {
    if (this.comments.length === 0) {
      this.isLoading = true;
      this.commentsService.getCommentsByPostId(this.postId).subscribe(
        data => {
          this.comments = data;
        },
        error => {
          this.alertService.error(error);
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }
}
