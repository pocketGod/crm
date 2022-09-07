import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent implements OnInit {

  @Input() contactID?: string
  contact: Contact = {name:'', email:'', phones:[''], birthday:new Date(), employee:false}

  constructor(private cs:ContactsService, private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    if (this.contactID) {
      this.cs.getContactByID(this.contactID).subscribe((data:any)=>{
        this.contact.name = data.name
        this.contact.email = data.email
        this.contact.phones = data.phones
        this.contact.employee = data.employee
        this.contact.birthday = this.getBirthday(data.birthday) as unknown as Date
      })
    }
  }

  getBirthday(timestamp:any):string{
    let months= ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    let day = new Date(timestamp.seconds*1000).getDate()
    let month = new Date(timestamp.seconds*1000).getMonth()
    return `${day}/${months[month]}`
  }

  closeModal(){
    this.activeModal.close()
  }

}
