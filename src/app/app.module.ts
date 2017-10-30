import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//#region ng-material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule,
  MatChipsModule, MatProgressSpinnerModule, MatToolbarModule, MatSnackBarModule,
  MatFormFieldModule, MatInputModule, MatExpansionModule, MatDialogModule
} from '@angular/material';

//#endregion ng-material

//#region components
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
//#endregion components

//#region services
import { AlertService, AuthService, PostsService, CommentsService } from './services/index';
import { AuthGuard } from './guards/auth.guard';
import { fakeBackendProvider } from './providers/fake-backend';
//#endregion services

import { Routing } from './app.routing';
import { PostComponent } from './components/post/post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
    NotFoundComponent,
    PostEditorComponent,
    CommentsComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule,
    MatToolbarModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDialogModule, MatSnackBarModule
  ],
  providers: [
    AuthService,
    AlertService,
    AuthGuard,
    PostsService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    CommentsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
