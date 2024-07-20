import { Component, Input } from '@angular/core';

@Component({
  selector: 'api-types',
  templateUrl: './api-types.component.html',
  styleUrl: './api-types.component.scss'
})
export class ApiTypesComponent {
  @Input() lang!:string;
}
