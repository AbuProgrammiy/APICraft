import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'show-flexible-tables',
  templateUrl: './show-flexible-tables.component.html',
  styleUrl: './show-flexible-tables.component.scss'
})
export class ShowFlexibleTablesComponent {
  @Input() lang!: string
  @Output() changeCurrentMode = new EventEmitter()

  constructor(private tableService:TableService,private messageService: MessageService){
    this.getTables()
  }

  isLoading:boolean=true
  tableNames!:string[]
  tables: { [key: string]: string[] }={}

  back() {
    this.changeCurrentMode.emit("choosingType")
  }

  getTables(){
    const userId=(jwtDecode(localStorage.getItem("accessToken")!)as any).Id
    
    this.tableService.getTablesByUserId(userId).subscribe({
      next:(response)=>{
        this.tableNames=Object.keys(response)

        for(let i=0; i<this.tableNames.length;i++){
          this.tables[this.tableNames[i]]=response[this.tableNames[i]]
        }

        this.isLoading=false
      },
      error:(err)=>{
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
      }
    })
  }
}
