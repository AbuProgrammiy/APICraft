import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import { DataStorageService } from '../../services/dataStorage/data-storage.service';
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

  constructor(private tableService:TableService,private dataStorageService:DataStorageService,private messageService: MessageService){
    this.getTablaes()
  }

  isLoading:boolean=true
  tableNames!:string[]
  tables: { [key: string]: any }={}

  back() {
    this.changeCurrentMode.emit("choosingType")
  }

  getTablaes(){
    const userId=(jwtDecode(localStorage.getItem("accessToken")!)as any).Id
    let columns:string[]

    this.tableService.getTableNamesByUserId(userId).subscribe({
      next:(response)=>{
        this.tableNames=response

        for(let i=0;i<this.tableNames.length;i++){
          this.dataStorageService.getColumnsByTableName(userId,this.tableNames[i]).subscribe({
            next:(response)=>{
              columns=response
              this.tables[`${this.tableNames[i]}`]=columns

              if(i==this.tableNames.length-1){
                this.isLoading=false
              }
            },
            error:(err)=>{
              this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
            }
          })
        }
      },
      error:(err)=>{
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
      }
    })
  }
}
