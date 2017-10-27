import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { PostComponent } from './components/post/post.component';
import { TagComponent } from './components/tag/tag.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'post/create', component: PostEditorComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: PostEditorComponent },
    { path: 'post/:id/edit', component: PostEditorComponent, canActivate: [AuthGuard], data: { isEdit: true } },
    { path: 'tag/:tag', component: TagComponent },
    { path: '**', component: NotFoundComponent }
];

export const Routing = RouterModule.forRoot(appRoutes);