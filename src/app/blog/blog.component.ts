import { Component, OnInit } from '@angular/core';
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
export class BlogComponent implements OnInit {

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

    this.blog.blogId = this._route.snapshot.paramMap.get('blogId');

    this.getBlogDetails(this.blog.blogId);

  }

  getBlogDetails(blogId) {
    this._blogService.getBlogDetails(blogId)
    .subscribe(res => {

      this.blog.data = res;
      this.checkHasReact();

    }, err => {
      console.log(err)
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
    let r = [];

    r = this.blog.data.reacts.like.filter(e => e== this.User.data._id);
    if( r.length > 0 ) {
      this.User.hasReact = 'like';
      return;
    }

    r = this.blog.data.reacts.love.filter(e => e== this.User.data._id);
    if( r.length > 0 ) {
      this.User.hasReact = 'love';
      return;
    }

    r = this.blog.data.reacts.funny.filter(e => e== this.User.data._id);
    if( r.length > 0 ) {
      this.User.hasReact = 'funny';
      return;
    }

    r = this.blog.data.reacts.sad.filter(e => e== this.User.data._id);
    if( r.length > 0 ) {
      this.User.hasReact = 'sad';
      return;
    }

    r = this.blog.data.reacts.informative.filter(e => e== this.User.data._id);
    if( r.length > 0 ) {
      this.User.hasReact = 'informative';
      return;
    }

    this.User.hasReact = null;
      return;
  }

}
