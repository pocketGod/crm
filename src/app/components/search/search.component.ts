import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { ShowContactComponent } from '../show-contact/show-contact.component';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tableIretator: number = 0

  contactFirstName: string =''
  contactLastName: string = ''
  contactPhone: string = ''

  contacts: Contact[] = []

  constructor(private cs:ContactsService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.cs.getAllContacts().subscribe((data)=>{
      this.contacts = data
    })
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

  tableIretatorIncremant(): number{
    this.tableIretator ++
    return this.tableIretator
  }
  resetTableIretator(): string{
    this.tableIretator = 0
    return ''
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

  showContact(contact:Contact){
    let modalRef = this.modal.open(ShowContactComponent,{
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
    modalRef.componentInstance.contactID = contact.id
  }

  deleteContact(contact:Contact){
    if (confirm(`Are you sure you would like to delete "${contact.name}" from DB?`)) {
      this.cs.deleteContact(contact)
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


}
