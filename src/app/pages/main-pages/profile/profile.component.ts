import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private authService: AuthService, private messageService: MessageService) {
    this.assignVariables()
  }

  declare $: any
  lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "Uzbek"

  isEmailEditing: boolean = false
  isSecurityKeyEditing: boolean = false

  isEmailLoading: boolean = false
  isSecurityKeyLoading: boolean = false

  userId!:string
  email!: string
  securityKey!: string
  sentPassword!:string


  changeLang(lang: any) {
    this.lang = lang
  }

  assignVariables() {
    const decodetAccessToken: any = jwtDecode(localStorage.getItem("accessToken")!)
    this.userId=decodetAccessToken.Id
    this.email = decodetAccessToken.Email
    this.securityKey = decodetAccessToken.SecurityKey
  }

  editEmail() {
    if (this.isEmailEditing == false) {
      this.isEmailEditing = true
      return
    }

    this.isEmailLoading = true

    const body = {
      email: this.email
    }

    this.authService.verifyUser(body).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          document.getElementById("toggle-edit-email-modal")!.click()
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isEmailLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isEmailLoading = false
      }
    })

  }

  updateEmail(){
    const body={
      id:this.userId,
      email:this.email,
      sentPassword:this.sentPassword
    }
    this.authService.updateEmail(body).subscribe({
      next:(response)=>{

      },
      error:(err)=>{
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
      }
    })
  }
}
