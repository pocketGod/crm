import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/Contact';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(contacts:Contact[], key:string, val:string): Contact[] {
    let contactArr = new Set()
    
    if(key.toString() == 'firstName'){
      contacts.forEach((contact)=>{
        let [first, last] = contact.name.split(' ')
        if(first.toLowerCase().includes(val.toLowerCase())) contactArr.add(contact)
      })
    }
    else if(key.toString() == 'lastName'){
      contacts.forEach((contact)=>{
        let [first, last] = contact.name.split(' ')
        if(last.toLowerCase().includes(val.toLowerCase())) contactArr.add(contact)
      })
    }
    else if(key.toString() == 'phone'){

      contacts.forEach((contact)=>{
        if(val=='' && contact.phones.length==0){
          contactArr.add(contact)
        }
        contact.phones.forEach((phone)=>{
          if(phone.includes(val)) contactArr.add(contact)
        })
      })
    }
    return Array.from(contactArr) as Contact[]
  }

}
