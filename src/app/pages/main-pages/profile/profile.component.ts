import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  lang=localStorage.getItem("lang")!=null?localStorage.getItem("lang"):"Uzbek"

  isEditing:boolean=false
}
