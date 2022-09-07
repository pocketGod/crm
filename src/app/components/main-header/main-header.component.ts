import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  getLoggedUser():string{
    return this.auth.getLocalData('username')
  }
}
