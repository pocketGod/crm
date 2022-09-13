import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  user:User = {email:'', password:''}
  confirmPassword:string = ''

  checkMatchingPasswords = ():boolean =>{
    return this.confirmPassword == this.user.password
  }

  ngOnInit(): void {
  }

  submitRegister(){
    this.auth.register(this.user).then((data)=>{
      this.auth.updateLoggedInUser(data.user.email as string)
      this.auth.setLocalData('loggedIn', 'true')
      this.auth.setOrGetUserPic('../../../assets/general_user_pic.png', 'set')
      this.auth.setLocalData('pic', '../../../assets/general_user_pic.png' as string)
      this.router.navigateByUrl('explore/dashboard')
    }).catch((err)=>{
      console.log(err)
      alert('Something went wrong...')
      this.user = {email: '', password:''}
    })
  }

  
  loginWithGoogle():void{
    this.auth.loginWithGoogle().then((data)=>{
      this.auth.updateLoggedInUser(data.user.displayName as string)
      this.auth.setLocalData('loggedIn', 'true')
      this.auth.setOrGetUserPic(data.user.photoURL as string,'set')
      this.auth.setLocalData('pic', data.user['photoURL'] as string)
      this.router.navigateByUrl('explore/dashboard')
    }).catch((err)=>{
      console.log(err)
      alert('Couldnt Connect To Google Account')
    })
  }

}
