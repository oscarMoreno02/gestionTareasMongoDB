import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { UrlD } from '../url';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
  value = ''
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  subscripcion: Subscription = new Subscription;
  lista: Array<UrlD> = [{nombre:'aaa',url:'aaaa'},{nombre:'aaa',url:'aaaa'},{nombre:'aaa',url:'aaaa'},{nombre:'aaa',url:'aaaa'}]
  url?:UrlD

 

}
