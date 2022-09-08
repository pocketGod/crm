import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = []

  projectsRef = collection(this.fireStore, 'projects')

  constructor(private fireStore:Firestore) { 
    this.getAllProjects().subscribe((data)=>{
      this.projects = data
    })
  }

  getAllProjects(): Observable<Project[]>{
    return collectionData(this.projectsRef, {idField:'id'},) as Observable<Project[]>
  }

  addProject(project: Project) : Promise<DocumentReference<Project>> {
    return addDoc(this.projectsRef, project) as Promise<DocumentReference<Project>>
  }

  getProjectByID(ID:string): Observable<Project>{
    let projRef = doc(this.fireStore, `projects/${ID}`)
    return docData(projRef, {idField:'id'}) as Observable<Project>
  }

  updateProject(project:Project):Promise<void>{
    let projRef = doc(this.fireStore, `projects/${project.id}`)
    return setDoc(projRef, project, {merge:true}) as Promise<void>
  }

  deleteProject(project:Project):Promise<void>{
    let projRef = doc(this.fireStore, `projects/${project.id}`)
    return deleteDoc(projRef) as Promise<void>
  }
}
