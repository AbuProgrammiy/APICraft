import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-name-input',
  templateUrl: './table-name-input.component.html',
  styleUrl: './table-name-input.component.scss'
})
export class TableNameInputComponent {
  @Input() lang!: string
  @Output() changeCurrentMode = new EventEmitter()
  @Output() sendTableName = new EventEmitter()

  tableName!:string

  back() {
    this.changeCurrentMode.emit("choosingMode")
  }

  next(){
    this.sendTableName.emit(this.tableName)
  }
}
