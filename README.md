# blog-website-frontend-Angular
![alt text][logo]

[logo]: src/assets/img/show.PNG "Frontend UI"

**blog-website** is one of my personal projects where registered blogger write blogs. Bloggers can also comment or react to blogs. This repository holds the code of it's frontend which is developed using **Angular**.

<em> The backend of this project can be found [here (REST API)](https://github.com/tazbin/blog-website-backend_REST_API) </em>

<em> Visit complete live project [lets-blog.netlify.app/all_blogs](https://lets-blog.netlify.app/all_blogs) </em>


## Features:
- bloggers can create their profiles (token based authentication)
- bloggers can edit their profile
- bloggers can write blogs. They can set the category of their blog (i.e. travel, medical, tech etc)
- registered bloggers can comment on their own or others blog
- registered bloggers can also react on others blog. They can react **like**, **love**, **sad**, **haha**, **informative** to blogs
- unregistred public users can read blogs but cann't comment or react n blogs
- Blogs of a particular category can be viewed


# Getting started

## How to install & run:
### Using Git (recommended)
   Navigate & open CLI into the directory where you want to put this project & Clone this project (will be cloned inside myProject folder) using this command.
   
```bash
git clone https://github.com/tazbin/blog-website-frontend-Angular.git ./myProject
```
### Using manual download ZIP
1. Download repository
2. Extract the zip file, navigate into it & copy the folder to your desired directory

### Install npm dependencies after cloning or downloading
```bash
npm install
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
```bash
ng serve
```


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
