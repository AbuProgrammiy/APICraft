import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  @Input() lang!:string
  @Output() changeLang = new EventEmitter();

  isUserRegistered:boolean=localStorage.getItem("isUserRegistered")=="true"

  chooseLang(choosenLang: string) {
    this.lang = choosenLang;
    this.changeLang.emit(this.lang);
    localStorage.setItem("language", this.lang);
  }
}
