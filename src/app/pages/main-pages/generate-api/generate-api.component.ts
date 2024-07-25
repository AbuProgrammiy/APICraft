import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-generate-api',
  templateUrl: './generate-api.component.html',
  styleUrl: './generate-api.component.scss'
})
export class GenerateApiComponent {
  lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "Uzbek"

  currentMode: string = "choosingMode"

  table={
    "tableName":""
  }

  changeLang(lang: string) {
    this.lang = lang
  }

  selectAPIType(type: any) {
    this.currentMode = "tableNameInput"
  }

  changeCurrentMode(mode: any) {
    this.currentMode = mode
  }
}
