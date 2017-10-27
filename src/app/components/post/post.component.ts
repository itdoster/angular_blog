import { Component, Input } from '@angular/core';
import { Post } from '../../shared/models/index';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService, PostsService, AlertService } from '../../services/index';
import { User } from '../../shared/interfaces/index';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {
  @Input() post: Post;
  @Input() user: User;

  private isCommentsLoading: boolean = false;
  private isLoading: boolean = false;
  private isCommentsVisible: boolean = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private postService: PostsService,
    private alertService: AlertService,
    private router: Router) { }

  private deletePost(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: "Delete post?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.postService.deletePost(this.post).subscribe(
          data => {
            this.postService.postDeletedEvent(this.post);
            this.alertService.success("post was deleted");
          },
          error => { this.alertService.error(error); },
          () => { this.isLoading = false; }
        )
      }
    });
  }
}
