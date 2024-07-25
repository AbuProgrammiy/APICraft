import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'api-types',
  templateUrl: './api-types.component.html',
  styleUrl: './api-types.component.scss'
})
export class ApiTypesComponent {
  @Input() lang!: string;
  @Output() selectAPIType = new EventEmitter();

  selectType(type: string) {
    this.selectAPIType.emit(type)
  }
}
