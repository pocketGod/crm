import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userPic: string = ''

  constructor(private auth:Auth) { }


  
  getLocalData(key:string):string{
    return localStorage.getItem(key) as string
  }
  setLocalData(key:string, val:string):void{
    localStorage.setItem(key, val)
  }
  getSessionData(key:string):string{
    return sessionStorage.getItem(key) as string
  }
  setSessionData(key:string, val:string):void{
    sessionStorage.setItem(key, val)
  }

  updateLoggedInUser(name:string): void{
    this.setLocalData('username', name)
  }

  login(user:User): Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
  }

  loginWithGoogle(): Promise<UserCredential>{
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  register(user:User): Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
  }

  logOut(): Promise<void>{
    return this.auth.signOut()
  }

  setOrGetUserPic(url:any, method:string): string|void{
    if(method=='get') return this.userPic
    else this.userPic==url
  }


}
