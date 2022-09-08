import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/Contact'

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts: Contact[] = []


  contactRef = collection(this.fireStore, 'contacts')
  
  constructor(private fireStore:Firestore) { 
    this.getAllContacts().subscribe((data)=>{
      this.contacts = data
    })
  }

  getAllContacts(): Observable<Contact[]>{
    return collectionData(this.contactRef, {idField: 'id'}) as Observable<Contact[]>
  }

  getContactByID(ID: string): Observable<Contact>{
    let contactRef = doc(this.fireStore, `contacts/${ID}`)
    return docData(contactRef, {idField:'id'}) as Observable<Contact>
  }

  addContact(contact: Contact) : Promise<DocumentReference<Contact>> {
    return addDoc(this.contactRef, contact) as Promise<DocumentReference<Contact>>
  }

  updateContact(contact: Contact, ID:string):Promise<void>{
    let contactRef = doc(this.fireStore, `contacts/${ID}`)
    return setDoc(contactRef, contact, {merge:true}) as Promise<void>
  }

  deleteContact(contact:Contact):Promise<void>{
    let contactRef = doc(this.fireStore, `contacts/${contact.id}`)
    return deleteDoc(contactRef) as Promise<void>
  }


}
