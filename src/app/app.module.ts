import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
//#region ng-material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule,
  MatChipsModule, MatProgressSpinnerModule, MatToolbarModule, MatSnackBarModule,
  MatFormFieldModule, MatInputModule, MatExpansionModule, MatDialogModule,MatMenuModule
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
import { AlertService, AuthService, PostsService, CommentsService, StatisticsService } from './services/index';
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
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { StatsComponent } from './components/stats/stats.component';

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
    TagComponent,
    DoughnutChartComponent,
    StatsComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule,
    MatToolbarModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDialogModule, MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    AlertService,
    AuthGuard,
    PostsService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    CommentsService,
    StatisticsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
