import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableService } from '../../../services/table/table.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';

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
  tableNameMessage!: string
  userId: string = (jwtDecode(localStorage.getItem("accessToken")!) as any).Id

  table = {
    name: null,
    description: null
  }

  back() {
    this.changeCurrentMode.emit("choosingMode")
  }

  next() {
    this.isLoading = true

    this.tableService.isTableNameExistsByUserId(this.userId, this.table.name!).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          this.sendTableName.emit(this.table)
        }
        else if (response.statusCode == 400) {
          this.tableNameMessage=this.lang=="Uzbek"?"Table allaqchon mavjud!":response.response
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
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
