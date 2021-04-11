import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AllBlogsModel } from '../interfaces/all-blogs-model';
import { CategoriesModel } from '../interfaces/categories-model';
import { User } from '../interfaces/user';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User: Observable<User>;
  bloggerProfile: UserProfile = {
    sub: null,
    error: null,
    loading: null,
    data: {
        img: null,
        _id: null,
        email: null,
        first_name: 'Bloggers',
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

  categories: CategoriesModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    currentCategoryId: 'all'
  }
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _blogService: BlogService,
    private _categoryService: CategoryService
    ) { }
    
  ngOnInit(): void {

    this.User = this._authService.$User;

    this.bloggerProfile.data._id = this._route.snapshot.paramMap.get('bloggerId');
    this.getBloggerProfile(this.bloggerProfile.data._id);
    this.getBloggerBlogs(this.bloggerProfile.data._id);
    this.getCategorizedBlogsCount();

  }

  getBloggerProfile(bloggerId: string) {

    this.User = this._authService.$User;
    this.bloggerProfile.loading = true;
    this.bloggerProfile.error = null;

    this.bloggerProfile.sub = this._authService.getBloggerProfile(bloggerId)
    .subscribe((res: any) => {

      this.bloggerProfile.data = res;
      this.bloggerProfile.loading = false;
      this.bloggerProfile.sub.unsubscribe();
      
    }, err => {
      
      console.log(err);
      this.bloggerProfile.error = err;
      this.bloggerProfile.loading = false;
      this.bloggerProfile.sub.unsubscribe();

    });

  }

  getBloggerBlogs(bloggerId: string) {

    this.bloggerAllBlogs.loading = true;
    this.bloggerAllBlogs.error = null;
    
    this.bloggerAllBlogs.sub = this._blogService.getBloggerBlogs(bloggerId)
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

  getCategorizedBlogsCount() {

    this.categories.loading = true;
    this.categories.error = null;

    this.categories.sub = this._categoryService.getCategorizedBlogCount()
    .subscribe((res:any) => {

      this.categories.items = res;
      this.categories.items.forEach(c => {
        this.categories.totalBlogs += c.count;
      });
      this.categories.loading = false;
      this.categories.sub.unsubscribe();

    }, err => {
      
      this.categories.error = err;
      this.categories.loading = false;
      this.categories.sub.unsubscribe();

    });
    
  }

  changePage(page) {

    this.bloggerAllBlogs.loading = true;
    this.bloggerAllBlogs.error = null;
    
    this.bloggerAllBlogs.sub = this._blogService.getBloggerBlogs(this.bloggerProfile.data._id, page)
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
