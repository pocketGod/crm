import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { Project } from 'src/app/interfaces/Project';
import { ContactsService } from 'src/app/services/contacts.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = []
  contacts: Contact[] = []
  clientName=''
  projName=''
  constructor(private ps:ProjectsService, private modal:NgbModal, private cs:ContactsService) { }

  ngOnInit(): void {
    this.ps.getAllProjects().subscribe((data)=>{
      this.projects = data
      // console.log(data)
    })
    this.cs.getAllContacts().subscribe((data)=>{
      this.contacts = data
    })
  }

  sortBy(prop:string):Project[]{
    return this.projects.sort((a:any, b:any) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1)
  }

  openModal():void{
    let modalRef = this.modal.open(AddProjectComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
  }

  getContact(ID:string): Contact{
    let res
    this.contacts.forEach((contact)=>{
      if(contact.id == ID) res = contact
    })
    return res as unknown as Contact
  }

  openProjectEditor(project:Project){
    let modalRef = this.modal.open(EditProjectComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
      keyboard: true
    })
    modalRef.componentInstance.porjID = project.id
  }


}
