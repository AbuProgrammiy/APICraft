import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-api',
  templateUrl: './generate-api.component.html',
  styleUrl: './generate-api.component.scss'
})
export class GenerateApiComponent {
  lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "Uzbek"

  currentMode: string = "choosingMode"
  tableName!: string

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
}
