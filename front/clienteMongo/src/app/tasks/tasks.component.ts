import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, identity } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
import { Rol, Task, User } from '../user';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  constructor(private service:PeticionesService) {
  
  }
  userForm={id:"",description:'',difficulty:'',time_estimated:"",assignment:null,time_dedicated:null}
  userView={id:"",description:'',difficulty:'',time_estimated:"",assignment:"",time_dedicated:""}
  userList:Array<Task>=[{id:0,description:'',difficulty:'',time_estimated:0,assignment:0,time_dedicated:0}]
    subscripcion: Subscription = new Subscription;
    lista: Array<UrlD> = [
  
    {nombre:'getAllTask',url:'http://localhost:9090/api/task/',verbo:'get',requireId:null,tabla:'user'},
    {nombre:'getTask',url:'http://localhost:9090/api/task',verbo:'get',requireId:true,tabla:'user'},
    {nombre:'insertTask',url:'http://localhost:9090/api/task',verbo:'post',requireId:null,tabla:'user'},
    // {nombre:'getAllUserWithRol',url:'http://localhost:9090/api/user/rol',verbo:'get',requireId:null,tabla:'user'},
    // {nombre:'updatePasswordToUser',url:'http://localhost:9090/api/user/',verbo:'put',requireId:true,tabla:'user'},
    // {nombre:'deleteUser',url:'http://localhost:9090/api/user/',verbo:'delete',requireId:true,tabla:'user'},
  ]
    url?:UrlD
    rolUserSelect?:Rol
    genericID=0
   enviarPeticion(){
    switch (this.url?.verbo){
      case ('get'):{
        if(this.url.requireId==null){
          this.service.peticionGet(this.url.url,null).subscribe({
            next:(data)=>{
              alert('exito ')
              this.userList=data.data
                console.log(data)
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }else{
              this.service.peticionGet(this.url?.url,this.genericID).subscribe({
                next:(data)=>{
                  alert('exito ')
                  this.userView=data.data
                    console.log(data)
                },
                error:(err)=>{
                  console.log(err)
                }
              })
        }
      }
      break;
      case('post'):{
            this.service.peticionPost(this.url.url,this.userForm).subscribe({
              next:(data)=>{   
                alert('exito: '+data)
              },
              error:(err)=>{
                alert(err)
              }
            })
         
      }
      break;
      case('put'):{
            this.service.peticionPut(this.url.url,this.userForm,this.genericID).subscribe({
              next:(data)=>{   
                alert('exito: '+data)
          
              },
              error:(err)=>{
                alert(err)
              }
            })
      }
      break;
      case('delete'):{
            this.service.peticionDelete(this.url.url,this.genericID).subscribe({
              next:(data)=>{   
                alert('exito: '+data)
              },
              error:(err)=>{
                alert(err)
              }
            })
          break;
  
        }
      }
    }
}
