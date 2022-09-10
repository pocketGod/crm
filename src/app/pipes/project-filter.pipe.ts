import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/Contact';
import { Project } from '../interfaces/Project';
import { ContactsService } from '../services/contacts.service';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  constructor(private cs:ContactsService){}

  transform(projects:Project[], key:string, val:string, contacts:Contact[]): Project[] {
    let projectArr = new Set()

    if(key.toString() == 'title'){
      projects.forEach((prj)=>{
        if(prj.title.toLowerCase().includes(val.toLowerCase())) projectArr.add(prj)
      })
    }
    else if(key.toString() == 'client'){
      projects.forEach((prj)=>{
        contacts.forEach((contact)=>{
          if(contact.name.toLowerCase().includes(val.toLowerCase())){
            if(contact.id==prj.client){
              projectArr.add(prj)
            }
          }
        })
      })
    }

    return Array.from(projectArr) as Project[]
  }

}
