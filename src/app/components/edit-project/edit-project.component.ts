import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { Project } from 'src/app/interfaces/Project';
import { ContactsService } from 'src/app/services/contacts.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  
  @Input() porjID: string = ''
  project:Project = {title:'', client:'', employees:['','',''], budget:0, status:'pitch'}
  employeeFields: boolean[] = [false,false,false]
  // relevantEmployees: Contact[] = []
  allClients: Contact[] = []
  allEmployees: Contact[] = []

  constructor(private cs:ContactsService, private ps:ProjectsService, private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.ps.getProjectByID(this.porjID).subscribe((data)=>{
      this.project = data
      for (let i = 0; i < data.employees.length; i++) {
        if(data.employees[i] || data.employees[i]!='') this.employeeFields[i] = true
      }
    })
    this.cs.getAllContacts().subscribe((data)=>{
      data.forEach((contact)=>{
        if(contact.employee) this.allEmployees.push(contact)
        else this.allClients.push(contact)
      })
    })
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

  updateProject(){
    this.ps.updateProject(this.project).then(()=>{
      this.activeModal.close()
      alert('project was edited')
    }).catch((err)=> console.log(err))
  }

  
  getContact(ID:string): Contact{
    let res
    this.allEmployees.forEach((contact)=>{
      if(contact.id == ID) res = contact
    })
    return res as unknown as Contact
  }

  colseModal(){
    this.activeModal.close()
  }

}
