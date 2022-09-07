import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  
  getUserPic():string{
    // console.log(this.auth.setOrGetUserPic('', 'get') as string);
    // console.log(this.auth.getLocalData('pic'));
    
    return this.auth.getLocalData('pic')
  }

  getUsername(type:string):string{
    let fullName = this.auth.getLocalData('username')
   if(type=='first'){
    let shortName = ''
    if(fullName.includes(' ')){
      shortName = fullName.substring(0, fullName.indexOf(' '))
      
    }
    else if(fullName.includes('@')){
      shortName = fullName.substring(0, fullName.indexOf('@'))
    }
    else return fullName
    return shortName
    }
    else return fullName
   }

}
