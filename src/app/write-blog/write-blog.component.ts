import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryList } from '../interfaces/category-list';
import { WriteBlog } from '../interfaces/write-blog';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.scss']
})
export class WriteBlogComponent implements OnInit {

  categoryList: CategoryList = {
    sub: null,
    error: null,
    loading: false,
    items: []
  };
  
  blog: WriteBlog = {
    sub: null,
    error: null,
    loading: false,
    data: {
        title: null,
        category: null,
        body: null
    }
  };

  constructor(
    private _authService: AuthService,
    private _categorySerice: CategoryService,
    private _blogService: BlogService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  saveBlog() {
    this.blog.loading = true;
    this.blog.error = null;
    
    this.blog.sub = this._blogService.writeBlog(this.blog.data)
    .subscribe((res:any) => {

      this._router.navigate(['/blog', res._id])
      this.blog.loading = false;
      this.blog.sub.unsubscribe();
      
    }, err => {
      
      this.blog.error = err;
      this.blog.loading = false;
      this.blog.sub.unsubscribe();

    })
  }

  getCategories() {
    this.categoryList.loading = true;
    this.categoryList.error = null;
    
    this.categoryList.sub = this._categorySerice.getCategoryList()
    .subscribe((res: any) => {
      
      this.categoryList.items = res;
      this.categoryList.loading = false;
      this.categoryList.sub.unsubscribe();

    }, err => {

      this.categoryList.error = err;
      this.categoryList.loading = false;
      this.categoryList.sub.unsubscribe();

    })
  }

}
