import { Component, Input, Renderer2 } from '@angular/core';
import { CRUDService } from '../../../services/CRUD/crud.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment.development';
import { MessageService } from 'primeng/api';
import { TableService } from '../../../services/table/table.service';

@Component({
  selector: 'flexible-table',
  templateUrl: './flexible-table.component.html',
  styleUrl: './flexible-table.component.scss'
})
export class FlexibleTableComponent {
  @Input() lang!: string
  @Input() tableName!: string;
  @Input() columns!: string[];

  constructor(private renderer: Renderer2, private crudService: CRUDService, private tableService: TableService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.inputTableName[0] = this.tableName
    this.inputTableName[1] = this.tableName
    this.inputTableName[2] = this.tableName
    this.inputTableName[3] = this.tableName
    this.inputTableName[4] = this.tableName

    this.inputSecurityKey[0] = this.securityKey
    this.inputSecurityKey[1] = this.securityKey
    this.inputSecurityKey[2] = this.securityKey
    this.inputSecurityKey[3] = this.securityKey
    this.inputSecurityKey[4] = this.securityKey

    this.textAreaRequestBody[0] = this.generateRequestBody()
    this.textAreaRequestBody[1] = this.generateRequestBody()
  }

  isLoading: boolean = false
  isDeleted: boolean = false
  userId = (jwtDecode(localStorage.getItem("accessToken")!) as any).Id
  securityKey = (jwtDecode(localStorage.getItem("accessToken")!) as any).SecurityKey
  inputSecurityKey: string[] = new Array(5)
  inputTableName: string[] = new Array(5)
  inputPage!: number
  inputCount!: number
  inputColumnName: string[] = new Array(3)
  inputColumnValue: string[] = new Array(3)
  textAreaRequestBody: string[] = new Array(2)

  generateRequestBody() {
    let body: string = "{\n"
    for (let i = 0; i < this.columns.length; i++) {
      body += `  "${this.columns[i]}": "string"${i != this.columns.length - 1 ? "," : ""}\n`
    }
    return body += "}"
  }

  executeGetAll() {
    this.isLoading = true

    this.crudService.getAll(this.inputSecurityKey[0], this.inputTableName[0], this.inputPage, this.inputCount).subscribe({
      next: (response) => {
        this.presentResponse("getAll", response)
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }

  executeGetByAny() {
    this.isLoading = true

    this.crudService.getByAny(this.inputSecurityKey[1], this.inputTableName[1], this.inputColumnName[0], this.inputColumnValue[0]).subscribe({
      next: (response) => {
        this.presentResponse("getByAny", response)
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }

  executeCreate() {
    this.isLoading = true

    this.crudService.create(this.inputSecurityKey[2], this.inputTableName[2], this.textAreaRequestBody[0]).subscribe({
      next: (response) => {
        this.presentResponse("create", response)
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }

  executeUpdateByAny() {
    this.isLoading = true

    this.crudService.updateByAny(this.inputSecurityKey[3], this.inputTableName[3], this.inputColumnName[1], this.inputColumnValue[1], this.textAreaRequestBody[1]).subscribe({
      next: (response) => {
        this.presentResponse("updateByAny", response)
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }

  executeDeleteByAny() {
    this.isLoading = true

    this.crudService.deleteByAny(this.inputSecurityKey[4], this.inputTableName[4], this.inputColumnName[2], this.inputColumnValue[2]).subscribe({
      next: (response) => {
        this.presentResponse("deleteByAny", response)
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }

  truncateTableByUserId() {
    this.tableService.truncateTableByUserId(this.userId, this.tableName).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.response });
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
      }
    })
  }

  deleteTable() {
    this.tableService.deleteByUserId(this.userId, this.tableName).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.response });
          this.isDeleted = true
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
      }
    })
  }

  presentResponse(mode: string, response: any) {
    const responseHandler = document.getElementById(`response-handler-${mode}-${this.tableName}`)!
    const requestUrlSign = this.renderer.createElement("p")
    const requestUrlHandler = this.renderer.createElement("p")
    const jsonHandler = this.renderer.createElement("pre")
    const responseSign = this.renderer.createElement("p")

    requestUrlHandler.className = "request-url-handler"
    jsonHandler.className = "json-handler"

    requestUrlSign.innerHTML = "Request URL"
    requestUrlHandler.innerHTML = encodeURI(this.generateRequestURL(mode))
    responseHandler.innerHTML = ""
    responseSign.innerHTML = "Response body"

    responseHandler.appendChild(requestUrlSign)
    responseHandler.appendChild(requestUrlHandler)
    responseHandler.appendChild(this.renderer.createElement("hr"))
    responseHandler.appendChild(responseSign)

    if (response == null) {
      const value = this.renderer.createElement("span")
      value.className = "response-value"
      value.innerHTML = "null"
      jsonHandler.appendChild(value)
    }
    else if (Array.isArray(response)) {

      jsonHandler.appendChild(this.renderer.createText(`[${response.length != 0 ? "\n" : ""}`))

      for (let i = 0; i < response.length; i++) {

        jsonHandler.appendChild(this.renderer.createText("  {\n"))
        const keys = Object.keys(response[i])
        const values = Object.values(response[i])

        for (let j = 0; j < keys.length; j++) {
          jsonHandler.appendChild(this.renderer.createText(`    "${keys[j]}":`))
          const value = this.renderer.createElement("span")
          value.className = "response-value"
          value.innerHTML = ` ${values[j]!=null?'"':""}${values[j]}${values[j]!=null?'"':""}${j + 1 != keys.length ? "," : ""}\n`
          jsonHandler.appendChild(value)
        }

        jsonHandler.appendChild(this.renderer.createText(`  }${i + 1 != response.length ? "," : ""}\n`))
      }
      jsonHandler.appendChild(this.renderer.createText("]"))
    }
    else {
      jsonHandler.appendChild(this.renderer.createText("{\n"))
      const keys = Object.keys(response)
      const values = Object.values(response)

      for (let j = 0; j < keys.length; j++) {
        jsonHandler.appendChild(this.renderer.createText(`  "${keys[j]}":`))
        const value = this.renderer.createElement("span")
        value.className = "response-value"
        value.innerHTML = ` "${values[j]}"${j + 1 != keys.length ? "," : ""}\n`
        jsonHandler.appendChild(value)
      }

      jsonHandler.appendChild(this.renderer.createText("}"))
    }

    responseHandler.appendChild(jsonHandler)
  }

  generateRequestURL(mode: string) {
    let requestURL = `${environment.baseUrl}CRUD/`

    switch (mode) {
      case "getAll":
        requestURL += `GetAll/${this.inputSecurityKey[0]}/${this.inputTableName[0]}${this.inputPage != undefined && this.inputPage != null && this.inputCount != undefined && this.inputCount != null ? `?page=${this.inputPage}&count=${this.inputCount}` : ""}`
        break
      case "getByAny":
        requestURL += `GetByAny/${this.inputSecurityKey[1]}/${this.inputTableName[1]}/${this.inputColumnName[0]}${this.inputColumnValue[0] != undefined && this.inputColumnValue[0] != null ? `/${this.inputColumnValue[0]}` : ""}`
        break
      case "create":
        requestURL += `Create/${this.inputSecurityKey[2]}/${this.inputTableName[2]}`
        break
      case "updateByAny":
        requestURL += `UpdateByAny/${this.inputSecurityKey[3]}/${this.inputTableName[3]}/${this.inputColumnName[1]}${this.inputColumnValue[1] != undefined && this.inputColumnValue[1] != null ? `/${this.inputColumnValue[1]}` : ""}`
        break
      case "deleteByAny":
        requestURL += `DeleteByAny/${this.inputSecurityKey[4]}/${this.inputTableName[4]}/${this.inputColumnName[2]}${this.inputColumnValue[2] != undefined && this.inputColumnValue[2] != null ? `/${this.inputColumnValue[2]}` : ""}`
        break
    }

    return requestURL
  }
}
