import {Component, Input} from '@angular/core';
import {Post} from '../../shared/models/index';
import {MatDialog} from '@angular/material';
import {PostsService, AlertService} from '../../services/index';
import {User} from '../../shared/interfaces/index';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {
  @Input() post: Post;
  @Input() user: User;

  private isLoading = false;

  constructor(public dialog: MatDialog,
              private postService: PostsService,
              private alertService: AlertService) {
  }

  private deletePost(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete post?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.postService.deletePost(this.post).subscribe(
          data => {
            this.postService.postDeletedEvent(this.post);
            this.alertService.success('post was deleted');
          },
          error => {
            this.alertService.error(error);
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }
}
