import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PostEditorComponent} from './components/post-editor/post-editor.component';
import {TagComponent} from './components/tag/tag.component';
import {StatsComponent} from './components/stats/stats.component';
import {AuthGuard} from './guards/auth.guard';
import {PostAccessGuard} from './guards/post-access.quard';
import {RegistrationComponent} from './components/registration/registration.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'signup', component: RegistrationComponent},
  {path: 'post/create', component: PostEditorComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostEditorComponent},
  {path: 'post/:id/edit', component: PostEditorComponent, canActivate: [PostAccessGuard], data: {isEdit: true}},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

export const Routing = RouterModule.forRoot(appRoutes);
