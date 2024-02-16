import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, identity } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
import { Rol, Task, User } from '../user';
@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.css'
})
export class UserTaskComponent {
  constructor(private service:PeticionesService) {
  
  }
  userForm={id:"",description:'',difficulty:'',time_estimated:"",assignment:null,time_dedicated:null,done:false,progress:0}
  userView={id:'',email:'',password:'',first_name:'',last_name:'',assigned_tasks:[]}
  userList:Array<User>=[{id:0,email:'',password:'',first_name:'',last_name:''}]
    subscripcion: Subscription = new Subscription;
    lista: Array<UrlD> = [
  
    {nombre:'getTaskAllUser',url:'http://localhost:9090/api/user/task/',verbo:'get',requireId:null,tabla:'task'},
    {nombre:'getTaskUserID',url:'http://localhost:9090/api/user/task',verbo:'get',requireId:true,tabla:'task'},
    {nombre:'updateTaskStatusByUser',url:'http://localhost:9090/api/user/task/status',verbo:'put',requireId:true,tabla:'task',change:'status'},
    {nombre:'updateTaskProgressByUser',url:'http://localhost:9090/api/user/task/progress',verbo:'put',requireId:true,tabla:'task',change:'progress'},
     {nombre:'updateTimeDedicatedByUser',url:'http://localhost:9090/api/user/task/time',verbo:'put',requireId:true,tabla:'task',change:'time_dedicated'},

  ]
    url?:UrlD
    taskUserSelected?:Task
    genericID=0
   enviarPeticion(){
    switch (this.url?.verbo){
      case ('get'):{
        if(this.url.requireId==null){
          this.service.peticionGet(this.url.url,null).subscribe({
            next:(data)=>{
              alert('exito ')
              this.userList=data
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
                  this.userView=data[0]
                    console.log(data)
                },
                error:(err)=>{
                  console.log(err)
                }
              })
        }
      }
      break;
      case('put'):{
        if(this.url.change=='status'){
          
          this.service.peticionPut(this.url.url,{status:1},this.genericID).subscribe({
            next:(data)=>{   
                alert('exito: '+data)
          
              },
              error:(err)=>{
                alert(err)
              }
            })
          }
          if(this.url.change=='progress'){
          
            this.service.peticionPut(this.url.url,this.userForm,this.genericID).subscribe({
              next:(data)=>{   
                  alert('exito: '+data)
            
                },
                error:(err)=>{
                  alert(err)
                }
              })
            }
            if(this.url.change=='time_dedicated'){
              this.service.peticionPut(this.url.url,{time:this.userForm.time_dedicated},this.genericID).subscribe({
                next:(data)=>{   
                    alert('Exito: '+data)

                  },
                  error:(err)=>{
                    alert(err)
                  }
                })
              }
      
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
