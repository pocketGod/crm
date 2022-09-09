import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/Contact';
import { Project } from 'src/app/interfaces/Project';
import { ContactsService } from 'src/app/services/contacts.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects:Project[] = []
  employees:Contact[] = []
  clients:Contact[] = []
  
  budget = {
    xAxis : {
      valueType: 'Category',
      title: 'Project Title'
    },
    yAxis : {
      title: 'budget'
    },
    legend: {
      visible:true
    },
    marker: {
      visible:true,
      dataLabel: {visible:true}
    },
    tooltip: {
      enable:true
    }
  }
  status:any = {
    labels: [],
    label:{
      visible:true,
      position:'Inside',
      name:'status'
    },
    legend:{
      visible:true,
      position:'Bottom',
      height:'8%',
      width:'35%'
    },
    tooltip:{
      enable:true,
      format: '${point.x} : <b>${point.y}</b>'
    }
  }

  constructor(private ps:ProjectsService, private cs:ContactsService) { }

  ngOnInit(): void {
    this.ps.getAllProjects().subscribe((data)=>{
      this.projects = data
      let statusArr = [
        {status:'Pitch', amount:0},
        {status:'Pre', amount:0},
        {status:'Post', amount:0},
        {status:'Done', amount:0}
      ]
      data.forEach((prj)=>{
        switch (prj.status) {
          case 'pitch':
            statusArr[0].amount++
            break;
          case 'pre':
            statusArr[1].amount++
            break;
          case 'post':
            statusArr[2].amount++
            break;
          case 'done':
            statusArr[3].amount++
            break;
      
        }
      })
      this.status.labels = statusArr
    })

    this.cs.getAllContacts().subscribe((data)=>{
      data.forEach((contact)=>{
        if(contact.employee) this.employees.push(contact)
        else this,this.clients.push(contact)
      })
    })
  }

}
