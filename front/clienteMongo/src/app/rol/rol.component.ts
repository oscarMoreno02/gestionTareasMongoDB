import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, identity } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
import { Rol, Task, User } from '../user';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  constructor(private service:PeticionesService) {
  
  }
  userForm={id:"",description:''}
  userView={id:"",description:''}
  userList:Array<Rol>=[{id:0,description:''}]
    subscripcion: Subscription = new Subscription;
    lista: Array<UrlD> = [
  
    {nombre:'getAllRol',url:'http://localhost:9090/api/rol/',verbo:'get',requireId:null,tabla:'rol'},
    {nombre:'getRol',url:'http://localhost:9090/api/rol',verbo:'get',requireId:true,tabla:'rol'},
    {nombre:'insertRol',url:'http://localhost:9090/api/rol',verbo:'post',requireId:null,tabla:'rol'},
    {nombre:'updateRolDescription',url:'http://localhost:9090/api/rol',verbo:'put',requireId:true,tabla:'rol',change:'description'},
    {nombre:'deleteRol',url:'http://localhost:9090/api/rol',verbo:'delete',requireId:true,tabla:'rol'},

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
                  this.userView=data
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
