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

  lang: string = (typeof localStorage !== 'undefined') ? (localStorage.getItem("language") != null ? localStorage.getItem("language")! : "Uzbek") : "Uzbek"

  isEmailEditing: boolean = false
  isEmailLoading: boolean = false
  isEmailConfirming: boolean = false
  isPasswordLoading: boolean = false
  isUsernameEditing: boolean = false
  isUsernameLoading: boolean = false
  isAccountLoading: boolean = false

  userId!: string
  email!: string
  currentPassword!: string
  newPassword!: string
  username!: string
  sentPassword!: string

  usernameMessage!: string
  emailMessage!: string
  codeMessage!: string
  currentPasswordMessage!: string
  newPasswordMessage!: string
  sentPasswordMessage!: string

  changeLang(lang: any) {
    this.lang = lang
  }

  assignVariables() {
    const decodetAccessToken: any = jwtDecode((typeof localStorage !== 'undefined') ? localStorage.getItem("accessToken")! : "")
    this.userId = decodetAccessToken.Id
    this.email = decodetAccessToken.Email
    this.username = decodetAccessToken.Username
  }

  editEmail() {
    if (this.isEmailEditing == false) {
      this.isEmailEditing = true
      return
    }
    else if (this.email.includes("@") == false) {
      this.emailMessage = this.lang == "Uzbek" ? "Email tog'ri emas!" : "Email is not valid!"
      return
    }

    this.isEmailLoading = true

    const body = {
      newEmail: this.email
    }

    this.userService.verifyUserToUpdateEmail(body).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          document.getElementById("toggle-edit-email-modal")!.click()
        }
        else if (response.statusCode == 400) {
          this.emailMessage = response.response
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
    if (this.sentPassword == "" || this.sentPassword == null) {
      this.sentPasswordMessage = this.lang == "Uzbek" ? "Yuborilgan kodni kiriting!" : "Enter sent code!"
      return
    }
    this.isEmailConfirming = true

    const body = {
      id: this.userId,
      newEmail: this.email,
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
        else if (response.statusCode != 500) {
          this.sentPasswordMessage = response.response
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
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
    if (this.currentPassword == null || this.currentPassword == "") {
      this.currentPasswordMessage=this.lang=="Uzbek"?"Joriy parolni kiritng!":"Current password required!"
      return
    }
    else if (this.newPassword == null || this.newPassword == "") {
      this.newPasswordMessage=this.lang=="Uzbek"?"Yangi parolni kiritng!":"Current password required!"
      return
    }
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
        else if (response.statusCode == 400) {
          this.currentPasswordMessage = response.response
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }

        this.isPasswordLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });

        this.isPasswordLoading = false
      }
    })
  }

  editUsername() {
    if (this.isUsernameEditing == false) {
      this.isUsernameEditing = true
      return
    }

    this.isUsernameLoading = true

    const body = {
      id: this.userId,
      newUsername: this.username
    }

    this.userService.updateUsername(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem("accessToken", response.response)
          this.isUsernameEditing = false
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Username successfuly updated!' });
        }
        else if (response.statusCode == 400) {
          this.usernameMessage = response.response
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }

        this.isUsernameLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });

        this.isUsernameLoading = false
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
    this.isUsernameEditing = false
    this.isEmailLoading = false
    this.isUsernameLoading = false
    this.currentPassword = ""
    this.newPassword = ""

    this.usernameMessage = ""
    this.emailMessage = ""

    this.assignVariables()
  }

  deleteUserAccount() {
    this.isAccountLoading = true

    this.userService.deleteUser((jwtDecode(localStorage.getItem("accessToken")!) as any).Id).subscribe({
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