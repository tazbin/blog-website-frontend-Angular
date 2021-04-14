import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user = {
    sub: null,
    error: null,
    loading: false,
    data: {
      img: null,
      first_name: null,
      last_name: null,
      email: null,
      address: null,
      about: null,
      job: null
    }
  }
  imgErr = null;

  editUser = {
    sub: null,
    loading: false,
    error: null
  }

  constructor(
    private _authService: AuthService,
    private _utils: UtilsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user.loading = true;
    this.user.error = null;

    this.user.sub = this._authService.fetchUserData()
    .subscribe((res:any) => {

      console.log(res);
      res = this._utils.makeObjectSelected(res, ['img', 'first_name', 'last_name', 'email', 'address', 'about', 'job']);
      this.user.data = res;
      this.user.loading = false;
      this.user.sub.unsubscribe();

    }, err => {

      this.user.error = err;
      this.user.loading = false;
      this.user.sub.unsubscribe();

    })

  }

  editProfile() {
    this.editUser.loading = true;
    this.editUser.error = null;

    this.editUser.sub = this._authService.editUser(this.user.data)
    .subscribe((res:any) => {

      this._authService.$User.next({
        _id: res._id,
        first_name: res.first_name,
        role: res.role
      });
      this.editUser.loading = false;
      this.router.navigate(['/profile', res._id]);

    }, err => {

      this.editUser.error = err;
      this.editUser.loading = false;

    })
  }

  // fileChangeEvent(e) {
  //   let me = this;

  //   let file = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = function () {
  //     me.user.data.img = reader.result;
  //   };
  //   reader.onerror = function (error) {
  //     me.imgErr = error;
  //     console.log('Error: ', error);
  //   };
    
  // }

}
