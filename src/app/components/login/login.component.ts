import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {email:'', password:''}

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  submitLogin(){
    this.auth.login(this.user).then((data)=>{
      this.auth.updateLoggedInUser(data.user.email as string)
      this.auth.setLocalData('loggedIn', 'true')
      this.auth.setOrGetUserPic('../../../assets/general_user_pic.png', 'set')
      this.auth.setLocalData('pic', '../../../assets/general_user_pic.png' as string)
      this.router.navigateByUrl('explore/dashboard')
    }).catch((err)=>{
      alert('Wrong Email Or Password')
      this.user = {email:'', password:''}
    })
  }

  loginWithGoogle():void{
    this.auth.loginWithGoogle().then((data)=>{
      this.auth.updateLoggedInUser(data.user.displayName as string)
      this.auth.setLocalData('loggedIn', 'true')
      this.auth.setOrGetUserPic(data.user['photoURL'] as string,'set')
      this.auth.setLocalData('pic', data.user['photoURL'] as string)
      this.router.navigateByUrl('explore/dashboard')
      console.log(data)
    }).catch((err)=>{
      console.log(err)
      alert('Couldnt Connect To Google Account')
    })
  }


}
