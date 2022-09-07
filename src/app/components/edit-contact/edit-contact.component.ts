import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  @Input() contactID?: string
  contact: Contact = {name:'', email:'', phones:['','',''], birthday:new Date()}
  phoneFields: boolean[] = [false, false, false]
  phoneFieldAmount:number = 0
  contactName: string[] = ['','']

  constructor(private cs:ContactsService, private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    if (this.contactID) {
      this.cs.getContactByID(this.contactID).subscribe((data:any)=>{
        this.contactName[0] = data.name.substring(0, data.name.indexOf(' '))
        this.contactName[1] = data.name.slice(data.name.indexOf(' ')+1)
        console.log( this.contactName[0]);
        console.log( this.contactName[1]);
        
        this.contact.email = data.email
        this.contact.phones = data.phones
        this.contact.birthday = new Date().toISOString().slice(0, 10) as unknown as Date
        this.phoneFieldAmount = data.phones.length
        for (let i = 0; i < this.phoneFieldAmount; i++) {
          this.phoneFields[i] = true
        }
      })
    }
  }
  updateContact():void{
    
    this.contact.name = this.contactName[0] + ' ' + this.contactName[1]
    this.cs.updateContact(this.contact, this.contactID as string).then(()=>{
      this.activeModal.close()
      alert('contact was edited')
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
