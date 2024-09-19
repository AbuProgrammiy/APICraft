import { Component, Output } from '@angular/core';

@Component({
  selector: 'my-apis',
  templateUrl: './my-apis.component.html',
  styleUrl: './my-apis.component.scss'
})
export class MyAPIsComponent {
  lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "Uzbek"

  isUserRegistered=localStorage.getItem("isUserRegistered")=="true"
  currentMode:string="choosingType"

  changeLang(lang: string) {
    this.lang = lang
  }

  changeCurrentMode(mode:any){
    this.currentMode=mode
  }

  selectAPIType(type:any){
    if(type=="flexible"){
      this.currentMode="showFlexibleTables"
    }
  }
}
