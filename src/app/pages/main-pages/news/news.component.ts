import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  lang=localStorage.getItem("language")!=null?localStorage.getItem("language"):"Uzbek"
}
