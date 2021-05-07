import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogDetailsModel } from '../interfaces/blog-details-model';
import { PostComment } from '../interfaces/post-comment';
import { PostReact } from '../interfaces/post-react';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  apiUrl;
  blog: BlogDetailsModel = {
    sub: null,
    error: null,
    loading: false,
    blogId: null,
    data: null
  }

  User: UserProfile = {
    sub: null,
    error: null,
    loading: false,
    data: {
      _id: null,
      first_name: null,
      role: null
    },
    hasReact: null
  }

  postComment: PostComment = {
    sub: null,
    error: null,
    loading: false,
    success: false,
    body: {
        blogId: null,
        body: null
    }
  }

  postReact: PostReact = {
    sub: null,
    error: null,
    loading: false,
    body: {
        blogId: null,
        reactName: null
    }
  }

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _blogService: BlogService
  ) { }

  ngOnInit(): void {

    this.apiUrl = environment.apiUrl + '/';

    this.getLoggedInUserData();
    this.blog.blogId = this._route.snapshot.paramMap.get('blogId');
    this.getBlogDetails(this.blog.blogId);

  }

  ngOnDestroy() {
    this.User.sub.unsubscribe();
  }


  getLoggedInUserData(){
    this.User.loading = true;
    this.User.error = null;
    this.User.sub = this._authService.$User
    .subscribe((res:any) => {
      this.User.data = res;
      this.User.loading = false;
    }, err => {
      this.User.loading = false;
      this.User.error = err;
    })
  }

  getBlogDetails(blogId) {

    this.blog.error = null;
    this.blog.loading = true;

    this.blog.sub = this._blogService.getBlogDetails(blogId)
    .subscribe(res => {

      this.blog.data = res;
      this.blog.loading = false;
      this.checkHasReact();
      this.blog.sub.unsubscribe();

    }, err => {
      this.blog.error = err;
      this.blog.loading = false;
      this.blog.sub.unsubscribe();
    });
  }

  doComment(commentForm: any) {
    this.postComment.body.blogId = this.blog.blogId;
    this.postComment.error = null;
    this.postComment.loading = true;
    this.postComment.success = false;
    
    this.postComment.sub = this._blogService.postComment(this.postComment.body)
    .subscribe((res:any) => {
      
      this.blog.data.comments = res.comments;
      commentForm.resetForm();
      this.postComment.error = null;
      this.postComment.loading = false;
      this.postComment.success = true;
      this.postComment.sub.unsubscribe();

    }, err => {

      this.postComment.error = err;
      this.postComment.loading = false;
      this.postComment.sub.unsubscribe();

    })

  }

  doReact(reactName) {
    if( !this.User.data ){
      return;
    }

    this.postReact.body.blogId = this.blog.blogId;
    this.postReact.body.reactName = reactName;

    this.postReact.loading = true;
    this.postReact.error = null;

    this.postReact.sub = this._blogService.postReact(this.postReact.body)
    .subscribe((res:any) => {

      this.blog.data.reacts = res.reacts;
      this.checkHasReact();
      this.postReact.loading = false;
      this.postReact.sub.unsubscribe();

    }, err => {

      this.postReact.error = err;
      this.postReact.loading = false;
      this.postReact.sub.unsubscribe();

    })
  }

  checkHasReact() {

    this.User.hasReact = null;
    const REACTS = ['like', 'love', 'sad', 'funny', 'informative']
    let checkR = [];

    REACTS.forEach(r => {
      checkR = this.blog.data.reacts[r].filter(e => e == this.User.data._id);
      if( checkR.length > 0 ) {
        this.User.hasReact = r;
      }
    });

  }

}
