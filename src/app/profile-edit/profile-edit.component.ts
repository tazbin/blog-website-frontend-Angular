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

  apiUrl;
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

  image;

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

    this.user.data = this._utils.trimObject(this.user.data);

    const formData = new FormData();
    formData.append('email', this.user.data.email);
    formData.append('first_name', this.user.data.first_name);
    formData.append('last_name', this.user.data.last_name);
    formData.append('job', this.user.data.job);
    formData.append('address', this.user.data.address);
    formData.append('about', this.user.data.about);
    if( this.image ) {
      formData.append('img', this.image);
    }

    this.editUser.sub = this._authService.editUser(formData)
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

  fileChangeEvent(e) {
    if( e.target.files.length > 0 ) {
      this.image = e.target.files[0];
      
      const file = (e.target as HTMLInputElement).files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.user.data.img = reader.result as string;
      }
      reader.readAsDataURL(file)

    }
  }

}
