import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, identity } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../peticiones.service';
import { Rol, User } from '../user';
import { Tablas } from '../tablas';
import { UserComponent } from '../user/user.component';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [DropdownModule,FormsModule,UserComponent,TasksComponent],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
constructor(private service:PeticionesService) {
}
  lista: Array<Tablas> = [
  {nombre:'user'},
  {nombre:'tasks'}
]
  tabla?:Tablas

}


