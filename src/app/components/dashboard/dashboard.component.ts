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
      enable:true,
      format: '<b>${point.x}: ${point.y}$</b>'
    }
  }
  
  status:any = {
    projectCount:0,
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
      format: '<b>${point.y} projects under status : ${point.x}</b>'
    },
    colorMap: 'color'
  }

  assignedEmployees:any = {
    data: [],
    xAxis : {
      valueType: 'Category',
      title: 'Project Title'
    },
    yAxis : {
      title: 'Employee Count'
    },
    unmannedProjects:0,
    tooltip:{
      enable:true,
      format: '<b>${point.y}</b> employees assigned to <b>${point.x}</b>'
    }
  }

  constructor(private ps:ProjectsService, private cs:ContactsService) { }

  ngOnInit(): void {
    this.status.projectCount = 0
    this.assignedEmployees.unmannedProjects = 0

    this.ps.getAllProjects().subscribe((data)=>{
      this.projects = data
      let statusArr = [
        {status:'Pitch', amount:0, color:'#327064'},
        {status:'Pre', amount:0, color:'#49A391'},
        {status:'Post', amount:0, color:'#1ABC9C'},
        {status:'Done', amount:0, color:'#B4F0E4'}
      ]
      let assignedEmployeesArr:{title:string,empCount:number}[] = []
      data.forEach((prj)=>{
        assignedEmployeesArr.push({title:prj.title, empCount:prj.employees.length})
        this.status.projectCount++

        if(!prj.employees.length) this.assignedEmployees.unmannedProjects++

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
      this.assignedEmployees.data = assignedEmployeesArr
      
    })

    this.cs.getAllContacts().subscribe((data)=>{
      data.forEach((contact)=>{
        if(contact.employee) this.employees.push(contact)
        else this.clients.push(contact)
      })
    })
  }

}
