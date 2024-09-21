import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-generate-api',
  templateUrl: './generate-api.component.html',
  styleUrl: './generate-api.component.scss'
})
export class GenerateApiComponent {

  lang:string=(typeof localStorage!=='undefined')?(localStorage.getItem("language")!=null?localStorage.getItem("language")!:"Uzbek"):"Uzbek"

  isUserRegistered:boolean=(typeof localStorage !=='undefined')?(localStorage.getItem("isUserRegistered")=="true"):false
  currentMode: string = "choosingMode"
  tableName!: string
  columns!:string[]

  changeLang(lang: string) {
    this.lang = lang
  }

  selectAPIType(type: any) {
    this.currentMode = "tableNameInput"
  }

  changeCurrentMode(mode: any) {
    this.currentMode = mode
  }

  getTableName(name: any) {
    this.tableName = name
    this.currentMode = "coulmnInputs"
  }

  getColumns(columns:any){
    this.columns=columns
  }
}
