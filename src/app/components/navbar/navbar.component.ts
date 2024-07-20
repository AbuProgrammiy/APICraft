import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "Uzbek"

  @Output() changeLang = new EventEmitter();

  chooseLang(choosenLang: string) {
    this.lang = choosenLang;
    this.changeLang.emit(this.lang);
    localStorage.setItem("language", this.lang);
  }
}
