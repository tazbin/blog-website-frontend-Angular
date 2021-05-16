import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AllBlogsModel } from '../interfaces/all-blogs-model';
import { User } from '../interfaces/user';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User: Observable<User>;
  categoryId: string = 'all';
  bloggerProfile: UserProfile = {
    sub: null,
    error: null,
    loading: null,
    data: {
        img: null,
        _id: null,
        email: null,
        first_name: null,
        last_name: null,
        role: null,
        joined: null,
        job: null,
        address: null,
        about: null
    }
  };

  bloggerAllBlogs: AllBlogsModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    totalPages: [],
    currentPage: 0
  }
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _blogService: BlogService
    ) { }
    
  ngOnInit(): void {

    this.User = this._authService.$User;

    this.bloggerProfile.data._id = this._route.snapshot.paramMap.get('bloggerId');

    this._route.params.subscribe((params) => {
      if( !params.categoryId ) {
        this.categoryId = 'all';
      } else {
        this.categoryId = params.categoryId;
      }
      this.getBloggerBlogs(this.bloggerProfile.data._id, this.categoryId);
    });

    this.getBloggerProfile(this.bloggerProfile.data._id);

  }

  getBloggerProfile(bloggerId: string) {

    this.User = this._authService.$User;
    this.bloggerProfile.loading = true;
    this.bloggerProfile.error = null;

    this.bloggerProfile.sub = this._authService.getBloggerProfile(bloggerId)
    .subscribe((res: any) => {

      this.bloggerProfile.data = res;
      this.bloggerProfile.data.img = this.bloggerProfile.data.img;
      this.bloggerProfile.loading = false;
      this.bloggerProfile.sub.unsubscribe();
      
    }, err => {
      
      console.log(err);
      this.bloggerProfile.error = err;
      this.bloggerProfile.loading = false;
      this.bloggerProfile.sub.unsubscribe();

    });

  }

  getBloggerBlogs(bloggerId: string, categoryId: string) {

    this.bloggerAllBlogs.loading = true;
    this.bloggerAllBlogs.error = null;
    
    this.bloggerAllBlogs.sub = this._blogService.getblogList(bloggerId, categoryId)
    .subscribe((res:any) => {

      this.bloggerAllBlogs.items = res.result;
      this.bloggerAllBlogs.totalBlogs = res.totalBlogs;
      this.bloggerAllBlogs.currentPage = res.currentPage;
      this.bloggerAllBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);

      this.bloggerAllBlogs.loading = false;
      this.bloggerAllBlogs.sub.unsubscribe();

    }, err => {
      
      this.bloggerAllBlogs.error = err;
      this.bloggerAllBlogs.loading = false;
      this.bloggerAllBlogs.sub.unsubscribe();

    });

  }

  changePage(page) {

    this.bloggerAllBlogs.loading = true;
    this.bloggerAllBlogs.error = null;
    
    this.bloggerAllBlogs.sub = this._blogService.getblogList(this.bloggerProfile.data._id, this.categoryId, page)
    .subscribe((res:any) => {

      this.bloggerAllBlogs.items = res.result;
      this.bloggerAllBlogs.totalBlogs = res.totalBlogs;
      this.bloggerAllBlogs.currentPage = res.currentPage;
      this.bloggerAllBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);

      this.bloggerAllBlogs.loading = false;
      this.bloggerAllBlogs.sub.unsubscribe();

    }, err => {
      
      this.bloggerAllBlogs.error = err;
      this.bloggerAllBlogs.loading = false;
      this.bloggerAllBlogs.sub.unsubscribe();

    });

  }

}
