import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableService } from '../../services/table/table.service';
import { jwtDecode } from 'jwt-decode';
import { DataStorageService } from '../../services/dataStorage/data-storage.service';

@Component({
  selector: 'coulm-inputs',
  templateUrl: './coulm-inputs.component.html',
  styleUrl: './coulm-inputs.component.scss'
})
export class CoulmInputsComponent {
  @Input() lang!: string
  @Input() tableName!: string
  @Output() changeCurrentMode = new EventEmitter();
  @Output() sendColumns = new EventEmitter();

  constructor(private renderer: Renderer2, private messageService: MessageService, private tableService: TableService, private dataStorageService: DataStorageService) { }

  isGenerating: boolean = false
  count: number = 2
  columns:string[]=new Array()

  table = {
    "userId": "",
    "name": "",
    "columnCount": 0
  }

  dataStorage: { [key: string]: any } = {
    "isData": false,
    "tableId": null,
  }

  back() {
    this.changeCurrentMode.emit("tableNameInput")
  }

  addColumn() {
    if (this.count > 20) {
      return
    }

    const inputsHandler = document.getElementById("ipnuts-handler")
    const contentHandler = this.renderer.createElement("div")
    const inputGroup = this.renderer.createElement("div")
    const label = this.renderer.createElement("span")
    const input = this.renderer.createElement("input")

    contentHandler.className = "content-handler"
    inputGroup.className = "input-group"
    label.className = "input-group-text"
    input.className = "form-control"

    label.innerHTML = `column ${this.count}:`

    this.renderer.setAttribute(inputGroup, "data-bs-theme", "dark")
    this.renderer.setAttribute(input, "id", `input-${this.count}`)

    this.renderer.appendChild(inputGroup, label);
    this.renderer.appendChild(inputGroup, input);
    this.renderer.appendChild(contentHandler, inputGroup);
    this.renderer.appendChild(inputsHandler, contentHandler);

    document.getElementById("add-input")!.focus()

    this.count++;
  }

  clearInputs() {
    document.getElementById("ipnuts-handler")!.innerHTML = ""
    this.count = 1
  }

  extractColumns(){
    const keys=Object.keys(this.dataStorage)
    for(let i=0;i<keys.length;i++){
      if(keys[i].includes("column")){
        this.columns.push(this.dataStorage[keys[i]])
      }
    }

    this.sendColumns.emit(this.columns)
  }

  generateAPI() {
    if (this.count == 1) {
      this.messageService.add({ severity: 'contrast', summary: 'Please', detail: 'Add column at least one!' });
      return
    }

    for (let i = 1; i < this.count; i++) {
      const input = document.getElementById(`input-${i}`) as HTMLInputElement
      if (input.value != "") {
        this.dataStorage[`column${i}`] = input.value
      }
      else {
        this.messageService.add({ severity: 'contrast', summary: 'Please', detail: 'Fill the column(s) or remove it!' });
        return
      }
    }

    const decodedAccessToken: any = jwtDecode(localStorage.getItem("accessToken")!)

    this.isGenerating = true
    this.table.userId = decodedAccessToken.Id
    this.table.name = this.tableName
    this.table.columnCount = this.count - 1


    this.tableService.create(this.table).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          this.dataStorage["tableId"] = response.response;

          this.dataStorageService.create(this.dataStorage).subscribe({
            next: (response) => {
              if (response.isSuccess == true) {
                this.messageService.add({ severity: 'contrast', summary: this.lang == "Uzbek" ? "Muvaffaqiyat" : this.lang == "English" ? "Success" : "", detail: this.lang == "Uzbek" ? "API muvaffaqiyatli ishga tushirildi!" : "API successfully generated!" });
                this.extractColumns()
                this.changeCurrentMode.emit("showResult")
              }
              else {
                this.messageService.add({ severity: 'contrast', summary: 'Error', detail: response.response });
              }
            },
            error: (err) => {
              this.messageService.add({ severity: 'contrast', summary: this.lang == "Uzbek" ? "Xatolik" : this.lang == "English" ? "Error" : "", detail: this.lang == "Uzbek" ? "Nimadur xato ketdi!" : "Something went wrong!" });
            }
          })
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: this.lang == "Uzbek" ? "Xatolik" : this.lang == "English" ? "Error" : "", detail: this.lang == "Uzbek" ? "Nimadur xato ketdi!" : "Something went wrong!" });
        }
        this.isGenerating = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: this.lang == "Uzbek" ? "Xatolik" : this.lang == "English" ? "Error" : "", detail: this.lang == "Uzbek" ? "Nimadur xato ketdi!" : "Something went wrong!" });
        this.isGenerating = false
      }
    })
  }
}
