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
  userForm={id:"",description:'',difficulty:'',time_estimated:"",assignment:null,time_dedicated:null,done:false,progress:0}
  userView={id:"",description:'',difficulty:'',time_estimated:"",assignment:"",time_dedicated:"",done:false,progress:0}
  userList:Array<Task>=[{id:0,description:'',difficulty:'',time_estimated:0,assignment:0,time_dedicated:0,done:false}]
    subscripcion: Subscription = new Subscription;
    lista: Array<UrlD> = [
  
    {nombre:'getAllTask',url:'http://localhost:9090/api/task/',verbo:'get',requireId:null,tabla:'task'},
    {nombre:'getTask',url:'http://localhost:9090/api/task',verbo:'get',requireId:true,tabla:'task'},
    {nombre:'insertTask',url:'http://localhost:9090/api/task',verbo:'post',requireId:null,tabla:'task'},
    {nombre:'updateTaskStatus',url:'http://localhost:9090/api/task/status',verbo:'put',requireId:true,tabla:'task',change:'status'},
    {nombre:'updateTaskProgress',url:'http://localhost:9090/api/task/progress',verbo:'put',requireId:true,tabla:'task',change:'progress'},
     {nombre:'addTaskAssignment',url:'http://localhost:9090/api/task/assignment/add',verbo:'put',requireId:true,tabla:'task',change:'assignment'},
     {nombre:'removeTaskAssignment',url:'http://localhost:9090/api/task/assignment/remove',verbo:'put',requireId:true,tabla:'task',change:'rm-assignment'},
    {nombre:'deleteTask',url:'http://localhost:9090/api/task',verbo:'delete',requireId:true,tabla:'task'},
    {nombre:'finalizadas',url:'http://localhost:9090/api/task/completed',verbo:'get',requireId:null,tabla:'task'},
    {nombre:'sin finalizar',url:'http://localhost:9090/api/task/uncompleted',verbo:'get',requireId:null,tabla:'task'},
    {nombre:'sin asignar',url:'http://localhost:9090/api/task/availables',verbo:'get',requireId:null,tabla:'task'},
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
            if(this.url.change=='assignment'){
          
              this.service.peticionPut(this.url.url,{assignment:this.userForm.assignment},this.genericID).subscribe({
                next:(data)=>{   
                    alert('exito: '+data)
              
                  },
                  error:(err)=>{
                    alert(err)
                  }
                })
              }
              if(this.url.change=='rm-assignment'){
                this.service.peticionPut(this.url.url,{},this.genericID).subscribe({
                  next:(data)=>{   
                      alert('exito: '+data)
                
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
