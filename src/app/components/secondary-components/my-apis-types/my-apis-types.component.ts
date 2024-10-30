import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-apis-types',
  templateUrl: './my-apis-types.component.html',
  styleUrl: './my-apis-types.component.scss'
})
export class MyApisTypesComponent {
  @Input() lang!: string
  @Output() selectAPIType = new EventEmitter()

  selectType(type: string) {
    this.selectAPIType.emit(type)
  }
}
