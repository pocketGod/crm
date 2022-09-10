import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service'
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { ShowContactComponent } from '../show-contact/show-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts : Contact[] = []
  contactFirstName: string =''
  contactLastName: string = ''
  contactPhone: string = ''

  constructor(private cs: ContactsService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.cs.getAllContacts().subscribe((data)=>{
      this.contacts = data
    })
  }

  getBirthday(timestamp:any):string{
    let months= ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    let day = new Date(timestamp.seconds*1000).getDate()
    let month = new Date(timestamp.seconds*1000).getMonth()
    return `${day}/${months[month]}`
  }

  
  getName(name:string, sur:string):string{
    if(name.includes(' ')){
      let [first, last] = name.split(' ')
      return sur == 'first' ? first : last
    }
    else {
      return sur == 'first' ? name : 'No Lastname Entery'
    }
  }

    
  addContact(){
    let modalRef = this.modal.open(AddContactComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
  }

  showContact(contact:Contact){
    let modalRef = this.modal.open(ShowContactComponent,{
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
    modalRef.componentInstance.contactID = contact.id
  }

  updateContact(contact:Contact): void{
    let modalRef = this.modal.open(EditContactComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
    modalRef.componentInstance.contactID = contact.id
  }

}
