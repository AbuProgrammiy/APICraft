import { Component, Input, Renderer2 } from '@angular/core';
import { CRUDService } from '../../services/CRUD/crud.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'flexible-table',
  templateUrl: './flexible-table.component.html',
  styleUrl: './flexible-table.component.scss'
})
export class FlexibleTableComponent {
  @Input() tableName!: string;
  @Input() columns!: string[];

  constructor(private renderer: Renderer2, private crudService: CRUDService,private messageService:MessageService) { }

  isLoading: boolean = false
  isGettingByAny: boolean = false
  isCreating: boolean = false
  isUpdating: boolean = false
  isDeleting: boolean = false
  inputSecurityKey: string = (jwtDecode(localStorage.getItem("accessToken")!) as any).SecurityKey
  inputTableName=this.tableName
  inputPage!: number
  inputCount!: number

  executeGetAll() {
    this.isLoading = true

    const responseHandler = document.getElementById("response-handler")!
    const requestUrlSign = this.renderer.createElement("p")
    const requestUrlHandler = this.renderer.createElement("p")
    const jsonHandler = this.renderer.createElement("pre")
    const responseSign = this.renderer.createElement("p")

    requestUrlHandler.className = "request-url-handler"
    jsonHandler.className = "json-handler"

    requestUrlSign.innerHTML = "Request URL"
    requestUrlHandler.innerHTML = encodeURI(`${environment.baseUrl}CRUD/GetAll/${this.inputSecurityKey}/${this.inputTableName}${this.inputPage != undefined && this.inputPage != null && this.inputCount != undefined && this.inputCount != null ? `?page=${this.inputPage}&count=${this.inputCount}` : ""}`)
    responseHandler.innerHTML = ""
    responseSign.innerHTML = "Response body"

    responseHandler.appendChild(requestUrlSign)
    responseHandler.appendChild(requestUrlHandler)
    responseHandler.appendChild(this.renderer.createElement("hr"))
    responseHandler.appendChild(responseSign)

    this.crudService.getAll(this.inputSecurityKey, this.inputTableName, this.inputPage, this.inputCount).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {

          jsonHandler.appendChild(this.renderer.createText(`[${response.length != 0 ? "\n" : ""}`))

          for (let i = 0; i < response.length; i++) {

            jsonHandler.appendChild(this.renderer.createText("  {\n"))
            const keys = Object.keys(response[i])
            const values = Object.values(response[i])

            for (let j = 0; j < keys.length; j++) {
              jsonHandler.appendChild(this.renderer.createText(`    "${keys[j]}":`))
              const value = this.renderer.createElement("span")
              value.className = "response-value"
              value.innerHTML = ` "${values[j]}"${j + 1 != keys.length ? "," : ""}\n`
              jsonHandler.appendChild(value)
            }

            jsonHandler.appendChild(this.renderer.createText(`  }${i + 1 != response.length ? "," : ""}\n`))
          }
          jsonHandler.appendChild(this.renderer.createText("]"))
        }
        else {
          jsonHandler.appendChild(this.renderer.createText("{\n"))
          const keys=Object.keys(response)
          const values=Object.values(response)

          for (let j = 0; j < keys.length; j++) {
            jsonHandler.appendChild(this.renderer.createText(`    "${keys[j]}":`))
            const value = this.renderer.createElement("span")
            value.className = "response-value"
            value.innerHTML = ` "${values[j]}"${j + 1 != keys.length ? "," : ""}\n`
            jsonHandler.appendChild(value)
          }

          jsonHandler.appendChild(this.renderer.createText("}"))     
        }

        responseHandler.appendChild(jsonHandler)
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isLoading = false
      }
    })
  }

  presentResponse(){
    
  }
}
