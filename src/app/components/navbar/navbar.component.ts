import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private modal:NgbModal) { }

  ngOnInit(): void {
  }

  logOut():void{
    this.auth.logOut()
    this.auth.updateLoggedInUser('')
    this.auth.setLocalData('loggedIn', 'false')
    this.auth.setOrGetUserPic('', 'set')
    this.auth.setLocalData('pic', '' as string)
    this.router.navigateByUrl('home/login')
  }

  getUserPic():string{
    // console.log(this.auth.setOrGetUserPic('', 'get') as string);
    // console.log(this.auth.getLocalData('pic'));
    
    return this.auth.getLocalData('pic')
  }

  getUsername():string{
    let fullName = this.auth.getLocalData('username')
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

  addContact(){
    let modalRef = this.modal.open(AddContactComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
  }



  

}
