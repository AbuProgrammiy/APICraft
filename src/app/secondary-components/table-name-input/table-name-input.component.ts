import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-name-input',
  templateUrl: './table-name-input.component.html',
  styleUrl: './table-name-input.component.scss'
})
export class TableNameInputComponent {
  @Input() lang!: string
  @Output() changeCurrentMode = new EventEmitter()

  back() {
    this.changeCurrentMode.emit("choosingMode")
  }
}
