import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { Project } from 'src/app/interfaces/Project';
import { ContactsService } from 'src/app/services/contacts.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project:Project = {title:'', client:'', employees:['','',''], budget:0, status:'pitch'}
  employeeFields: boolean[] = [false,false,false]
  employeeArr: Contact[] = []
  clientArr: Contact[] = []

  constructor(private ps:ProjectsService, private modal:NgbModal, private cs:ContactsService, private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.cs.getAllContacts().subscribe((data)=>{
      data.forEach((contact)=>{
        if(contact.employee) this.employeeArr.push(contact)
        else this.clientArr.push(contact)
      })
    })
  }

  onSubmit(){
    for (let i = this.employeeFields.length; i > 0; i--) {
      if(!this.employeeFields[i])this.project.employees.splice(i,1)
    }
    if(!this.project.employees[0]) this.project.employees.pop()

    
    this.ps.addProject(this.project).then(()=>{
      this.modal.dismissAll()
      // console.log(this.project)
      // alert('Customer Was Added Successfully')
    }).catch((err)=> console.log(err))
  }

  addAnotherEmployeeField(){
    if(!this.employeeFields[0]) this.employeeFields[0] = true
    else if(!this.employeeFields[1]) this.employeeFields[1] = true
    else if(!this.employeeFields[2]) this.employeeFields[2] = true
  }

  removeEmployeeField(index:number){
    this.project.employees.splice(index,1)
    this.employeeFields[index] = false
  }

  newClient(){
    let modalRef = this.modal.open(AddContactComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
  }

  closeModal(){
    this.activeModal.close()
  }

}
