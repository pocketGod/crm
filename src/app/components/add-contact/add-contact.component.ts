import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact: Contact = {name:'',email:'',phones:['','',''], birthday:new Date(), employee:false}
  name:any = {
    first: '',
    last: '',
  }
  phoneFields: boolean[] = [false, false, false]

  employed:string = ''

  constructor(private cs:ContactsService, private modal:NgbModal, private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  submitNewContact(){
    for (let i = this.phoneFields.length; i > 0; i--) {
      if(!this.phoneFields[i])this.contact.phones.splice(i,1)
    }
    if(!this.contact.phones[0]) this.contact.phones.pop()

    if(this.employed == 'customer') this.contact.employee=false
    else this.contact.employee=true


    this.contact.birthday = new Date(this.contact.birthday)
    this.contact.name = this.name.first + ' ' + this.name.last
    // console.log(this.contact);
    
    this.cs.addContact(this.contact).then(()=>{
      this.activeModal.close()
      // console.log(this.contact)
      // alert('Customer Was Added Successfully')
    }).catch((err)=> console.log(err))
  }


  addAnotherPhoneField(){
    if(!this.phoneFields[0]) this.phoneFields[0] = true
    else if(!this.phoneFields[1]) this.phoneFields[1] = true
    else if(!this.phoneFields[2]) this.phoneFields[2] = true
  }

  removePhoneField(index:number){
    this.contact.phones.splice(index,1)
    this.phoneFields[index] = false
  }

  closeModal(){
    this.activeModal.close()
  }

}
