import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) {
    this.assignVariables()
  }

  lang:string=(typeof localStorage!=='undefined')?(localStorage.getItem("language")!=null?localStorage.getItem("language")!:"Uzbek"):"Uzbek"

  isEmailEditing: boolean = false
  isEmailLoading: boolean = false
  isEmailConfirming: boolean = false
  isPasswordLoading: boolean = false
  isSecurityKeyEditing: boolean = false
  isSecurityKeyLoading: boolean = false
  isAccountLoading: boolean = false

  userId!: string
  email!: string
  currentPassword!: string
  newPassword!: string
  securityKey!: string
  sentPassword!: string


  changeLang(lang: any) {
    this.lang = lang
  }

  assignVariables() {
    const decodetAccessToken: any = jwtDecode((typeof localStorage!=='undefined')?localStorage.getItem("accessToken")!:"")
    this.userId = decodetAccessToken.Id
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

    this.userService.verifyUser(body).subscribe({
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

  updateEmail() {
    this.isEmailConfirming = true

    const body = {
      id: this.userId,
      email: this.email,
      sentPassword: this.sentPassword
    }

    this.userService.updateEmail(body).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          localStorage.setItem("accessToken", response.response)
          this.isEmailEditing = false
          document.getElementById("dismiss-edit-email-model")!.click()
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Email successfuly updated!' });
        }
        else {
          document.getElementById("email-danger-text")!.innerHTML = response.response
        }

        this.isEmailConfirming = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });

        this.isEmailConfirming = false
      }
    })
  }

  updatePassword() {
    this.isPasswordLoading = true

    const body = {
      id: this.userId,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }

    this.userService.updatePassword(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          document.getElementById("dismiss-edit-password-model")!.click()
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.response });
        }
        else {
          document.getElementById("password-danger-text")!.innerHTML = response.response
        }

        this.isPasswordLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });

        this.isPasswordLoading = false
      }
    })
  }

  editSecurityKey() {
    if (this.isSecurityKeyEditing == false) {
      this.isSecurityKeyEditing = true
      return
    }

    this.isSecurityKeyLoading = true

    const body = {
      id: this.userId,
      newSecurityKey: this.securityKey
    }

    this.userService.updateSecurityKey(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem("accessToken", response.response)
          this.isSecurityKeyEditing = false
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'SecurityKey successfuly updated!' });
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }

        this.isSecurityKeyLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });

        this.isSecurityKeyLoading = false
      }
    })
  }
  
  logOut() {
    localStorage.removeItem("isUserRegistered")
    localStorage.removeItem("accessToken")
    this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Successfuly logged out!' });
    this.router.navigate(["sign-in-up"])
  }

  cancel() {
    this.isEmailEditing = false
    this.isSecurityKeyEditing = false
    this.isEmailLoading = false
    this.isSecurityKeyLoading = false
    this.currentPassword = ""
    this.newPassword = ""
    this.assignVariables()
  }

  deleteUserAccount() {
    this.isAccountLoading = true

    this.userService.deleteUser((jwtDecode(localStorage.getItem("accessToken")!)as any).Id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.response });
          localStorage.removeItem("accessToken")
          document.getElementById("dismiss-delete-user-model")!.click()
          this.router.navigate([""])
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isAccountLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isAccountLoading = false
        console.log(err);
      }
    })
  }
}