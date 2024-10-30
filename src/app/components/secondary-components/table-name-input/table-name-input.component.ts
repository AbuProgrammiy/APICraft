import { Component, EventEmitter, Input, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TableService } from '../../../services/table/table.service';
import { MessageService } from 'primeng/api';
import { error } from 'console';

@Component({
  selector: 'table-name-input',
  templateUrl: './table-name-input.component.html',
  styleUrl: './table-name-input.component.scss'
})
export class TableNameInputComponent {
  @Input() lang!: string
  @Output() changeCurrentMode = new EventEmitter()
  @Output() sendTableName = new EventEmitter()

  constructor(private tableService: TableService, private messageService: MessageService) { }

  isLoading: boolean = false
  tableName!: string
  userId: string = (jwtDecode(localStorage.getItem("accessToken")!) as any).Id

  back() {
    this.changeCurrentMode.emit("choosingMode")
  }

  next() {
    this.isLoading = true

    this.tableService.isTableNameExistsByUserId(this.userId, this.tableName).subscribe({
      next: (response) => {
        if (response == false) {
          this.sendTableName.emit(this.tableName)
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: 'This table already exists!' });
        }
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }
}
