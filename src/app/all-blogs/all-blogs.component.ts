import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllBlogsModel } from '../interfaces/all-blogs-model';
import { CategoriesModel } from '../interfaces/categories-model';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  allBlogs: AllBlogsModel = {
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
    private _blogService: BlogService,
    private _categoryService: CategoryService,
    private _route: ActivatedRoute
    ) { }
    
  ngOnInit(): void {

      this._route.params.subscribe((params) => {
        if( !params.categoryId ) {
          this.categories.currentCategoryId = 'all';
        } else {
          this.categories.currentCategoryId = params.categoryId;
        }
        this.getAllBlogs();
      });

      // this.categoryId = this._route.snapshot.paramMap.get('categoryId');
      // if( !this.categoryId ) {
      //   this.categoryId = 'all'
      // }
      // this.getAllBlogs();

    this.getCategorizedBlogsCount();

  }

  getAllBlogs() {

    this.allBlogs.loading = true;
    this.allBlogs.error = null;
    
    this.allBlogs.sub = this._blogService.getAllBlogs(this.categories.currentCategoryId)
    .subscribe((res:any) => {

      this.allBlogs.items = res.result;
      this.allBlogs.totalBlogs = res.totalBlogs;
      this.allBlogs.currentPage = res.currentPage;
      this.allBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);

      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    }, err => {
      
      this.allBlogs.error = err;
      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    })
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

    })
  }

  changePage(page) {

    this.allBlogs.loading = true;
    this.allBlogs.error = null;

    this._blogService.getAllBlogs(this.categories.currentCategoryId, page)
    .subscribe((res:any) => {

      this.allBlogs.items = res.result;
      this.allBlogs.totalBlogs = res.totalBlogs;
      this.allBlogs.currentPage = res.currentPage;
      this.allBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);

      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    }, err => {
      
      this.allBlogs.error = err;
      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    })
  }

}
