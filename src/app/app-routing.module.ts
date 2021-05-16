import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'profile/:bloggerId',
    component: ProfileComponent
  },
  {
    path: 'profile/:bloggerId/:categoryId',
    component: ProfileComponent
  },
  {
    path: 'write_blog',
    component: WriteBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog/:blogId',
    component: BlogComponent
  },
  {
    path: 'all_blogs',
    component: AllBlogsComponent
  },
  {
    path: 'all_blogs/:categoryId',
    component: AllBlogsComponent
  },
  {
    path: 'profile_edit',
    component: ProfileEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
