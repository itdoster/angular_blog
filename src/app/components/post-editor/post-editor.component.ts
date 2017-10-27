import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PostsService, AlertService, AuthService } from '../../services/index';
import { Post } from '../../shared/models/index';
import { User } from '../../shared/interfaces/index';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})

export class PostEditorComponent implements OnInit {
  private id: number;
  private isEdit: boolean = false;
  private isCreate: boolean = false;
  private isPreviewMode: boolean = false;
  private isLoading: boolean = false;
  private post: Post = new Post();
  private user: User;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private postService: PostsService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.id = this.route.snapshot.params["id"];
    this.isEdit = this.route.snapshot.data['isEdit'];
    if (this.id) {
      if (!this.isEdit) {
        this.isPreviewMode = true;
      }
      this.isLoading = true;
      this.postService.getPostById(this.id).subscribe(
        data => { this.post = data; },
        error => { this.alertService.error(error); },
        () => { this.isLoading = false; });
    }
  }

  private save(): void {
    this.isLoading = true;
    if (this.isEdit) {
      this.updatePost();
    } else {
      this.addPost();
    }
  }

  private updatePost(): void {
    this.postService.updatePost(this.post).subscribe(
      data => { this.router.navigate(['home']); },
      error => { this.alertService.error(error); },
      () => { this.isLoading = false; });
  }

  private addPost(): void {
    this.postService.addPost(this.post).subscribe(
      data => { this.router.navigate(['home']); },
      error => { this.alertService.error(error); },
      () => { this.isLoading = false; });
  }

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
          data => { this.router.navigate(['home']); },
          error => { this.alertService.error(error); },
          () => { this.isLoading = false; }
        )
      }
    });
  }
}
