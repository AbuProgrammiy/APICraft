import { Component, Input, Renderer2 } from '@angular/core';
import { CRUDService } from '../../services/CRUD/crud.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'flexible-table',
  templateUrl: './flexible-table.component.html',
  styleUrl: './flexible-table.component.scss'
})
export class FlexibleTableComponent {
  @Input() tableName!: string;
  @Input() columns!: string[];

  constructor(private renderer: Renderer2, private crudService: CRUDService) {
  }

  isGettingAll: boolean = false
  isGettingByAny: boolean = false
  isCreating: boolean = false
  isUpdating: boolean = false
  isDeleting: boolean = false
  securityKey: string = (jwtDecode(localStorage.getItem("accessToken")!) as any).SecurityKey
  page!: number
  count!: number

  executeGetAll() {
    console.log(this.page);

    const responseHandler = document.getElementById("response-handler")!
    const requestUrlSign=this.renderer.createElement("p")
    const requestUrlHandler=this.renderer.createElement("p")
    const jsonHandler = this.renderer.createElement("pre")
    const responseSign = this.renderer.createElement("p")

    jsonHandler.className = "json-handler"
    requestUrlHandler.className = "request-url-handler"

    requestUrlSign.innerHTML="Request URL"
    requestUrlHandler.innerHTML="path:"
    responseHandler.innerHTML=""
    responseSign.innerHTML="Response body"

    responseHandler.appendChild(requestUrlSign)
    responseHandler.appendChild(requestUrlHandler)
    responseHandler.appendChild(this.renderer.createElement("hr"))
    responseHandler.appendChild(responseSign)

    this.crudService.getAll(this.securityKey, this.tableName, this.page, this.count).subscribe({
      next: (response) => {
        console.log(response[0]);
        if (Array.isArray(response)) {

          jsonHandler.appendChild(this.renderer.createText(`[${response.length!=0?"\n":""}`))

          for (let i = 0; i < response.length; i++) {

            jsonHandler.appendChild(this.renderer.createText("  {\n"))
            const keys = Object.keys(response[i])
            const values = Object.values(response[i])

            for (let j = 0; j < keys.length; j++) {
              jsonHandler.appendChild(this.renderer.createText(`    "${keys[j]}":`))
              const value=this.renderer.createElement("span")
              value.className="response-value"
              value.innerHTML=` "${values[j]}"${j+1!=keys.length?",":""}\n`
              jsonHandler.appendChild(value)
            }

            jsonHandler.appendChild(this.renderer.createText(`  }${i+1!=response.length?",":""}\n`))
          }
          jsonHandler.appendChild(this.renderer.createText("]"))
        }
        else {

        }

        responseHandler.appendChild(jsonHandler)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
