import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  username!: string
  email!: string
  password!: string
  code!: string
  newPassword!: string

  Statuses = {
    register: "register",
    login: "login",
    forgotPassword: "forgotPassword",
    verifyEmail: "verifyEmail",
    changePassword: "resetPassword"
  }

  status: string = this.Statuses.login

  isLoading: boolean = false
  isJoining: boolean = false
  isInning: boolean = false
  isForgetting: boolean = false
  isVerifiying: boolean = false
  isChangingPassword: boolean = false

  usernameMessage!: string
  emailMessage!: string
  passwordMessage!: string
  codeMessage!: string
  newPasswordMessage!: string

  letMeJoin() {
    if (this.status != this.Statuses.register) {
      this.status = this.Statuses.register
    }
    else if (this.isAttributesValid(this.Statuses.register)) {
      this.sendVerificationToRegister()
    }
  }

  letMeIn() {
    if (this.status != this.Statuses.login) {
      this.status = "login"
    }
    else if (this.isAttributesValid(this.Statuses.login)) {
      this.login()
    }
  }

  forgotPassword() {
    if (this.status != this.Statuses.forgotPassword) {
      this.status = this.Statuses.forgotPassword
    }
    else if (this.isAttributesValid(this.Statuses.forgotPassword)) {
      this.sendVerificationToResetPassword()
    }
  }

  verifyEmail() {
    if (this.isAttributesValid(this.Statuses.verifyEmail)) {
      this.register()
    }
  }

  changePassword() {
    if (this.isAttributesValid(this.Statuses.changePassword)) {
      this.resetPassword()
    }
  }

  isAttributesValid(status: string): boolean {
    let isValid: boolean = true

    if (status == this.Statuses.register) {
      if (this.username == null || this.username == "") {
        this.usernameMessage = "username is required!"
        isValid = false
      }
    }
    if (status == this.Statuses.register || status == this.Statuses.login || status == this.Statuses.forgotPassword) {
      if (this.email == null || this.email == "") {
        this.emailMessage = "email is required!"
        isValid = false
      }
      else if (!this.email.includes("@")) {
        this.emailMessage = "email is not valid!"
        isValid = false
      }
    }
    if (status == this.Statuses.register || status == this.Statuses.login) {
      if (this.password == null || this.password == "") {
        this.passwordMessage = "password is required!"
        isValid = false
      }
    }

    if (status == this.Statuses.verifyEmail) {
      if (this.code == null || this.code == "") {
        this.codeMessage = "verification code is required!"
        isValid = false
      }
    }
    return isValid
  }

  sendVerificationToRegister() {
    this.isLoading = true
    this.isJoining = true

    const body = {
      username: this.username,
      email: this.email
    }

    this.userService.verifyUserToRegister(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.status = this.Statuses.verifyEmail
        }
        else if (response.statusCode == 400) {
          if (response.response.includes("Username")) {
            this.usernameMessage = response.response
          }
          else if (response.response.includes("Email")) {
            this.emailMessage = response.response
          }
          else {
            this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
          }
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isJoining = false
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isJoining = false
        this.isLoading = false
      }
    })
  }

  login() {
    this.isLoading = true
    this.isInning = true

    const body = {
      email: this.email,
      password: this.password
    }

    this.userService.logIn(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem("accessToken", response.response)
          localStorage.setItem("isUserRegistered", "true")

          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "Successfully loged in!" });
          this.router.navigate([""])
        }
        else if (response.statusCode == 404) {
          this.emailMessage = response.response
        }
        else if (response.statusCode == 400) {
          this.passwordMessage = response.response
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isInning = false
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isInning = false
        this.isLoading = false
      }
    })
  }

  register() {
    this.isLoading = true
    this.isVerifiying = true

    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
      sentPassword: this.code
    }

    this.userService.register(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem("accessToken", response.response)
          localStorage.setItem("isUserRegistered", "true")

          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "Successfully registered!" });
          this.router.navigate([""])
        }
        else if (response.statusCode == 500) {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        else {
          this.codeMessage = response.response
        }

        this.isVerifiying = false
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isVerifiying = false
        this.isLoading = false
      }
    })
  }

  sendVerificationToResetPassword() {
    this.isLoading = true
    this.isForgetting = true

    const body = {
      email: this.email,
      isPasswordForgotten: true
    }

    this.userService.verifyUserToChangePassword(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.status = this.Statuses.changePassword
        }
        else if (response.statusCode == 500) {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        else {
          this.emailMessage = response.response
        }
        this.isForgetting = false
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isForgetting = false
        this.isLoading = false
      }
    })
  }

  resetPassword() {
    this.isLoading = true
    this.isChangingPassword = true

    const body = {
      email: this.email,
      newPassword: this.newPassword,
      sentPassword: this.code
    }

    this.userService.resetPassword(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem("accessToken", response.response)
          localStorage.setItem("isUserRegistered", "true")

          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Password successfully changed!' });
          this.router.navigate([""])
        }
        else if (response.statusCode == 500||response.statusCode==404) {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        else {
          this.codeMessage = response.response
        }

        this.isChangingPassword = false
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isChangingPassword = false
        this.isLoading = false
      }
    })
  }

  back() {
    if (this.status == this.Statuses.verifyEmail) {
      this.status = this.Statuses.register
    }
    else if (this.status == this.Statuses.changePassword) {
      this.status = this.Statuses.forgotPassword
    }
  }

  isElementVisible(elementName: string): boolean {
    if (["register-btn", "login-btn", "forgot-password-btn"].includes(elementName)) {
      return [this.Statuses.register, this.Statuses.login, this.Statuses.forgotPassword].includes(this.status)
    }
    else if (elementName == "username-input") {
      return this.status == this.Statuses.register
    }
    else if (elementName == "email-input") {
      return [this.Statuses.register, this.Statuses.login, this.Statuses.forgotPassword].includes(this.status)
    }
    else if (elementName == "password-input") {
      return [this.Statuses.register, this.Statuses.login].includes(this.status)
    }
    else if (elementName == "back-arrow") {
      return [this.Statuses.verifyEmail, this.Statuses.changePassword].includes(this.status)
    }
    else if (elementName == "code-input") {
      return [this.Statuses.verifyEmail, this.Statuses.changePassword].includes(this.status)
    }
    else if (elementName == "verify-email-btn") {
      return this.status == this.Statuses.verifyEmail
    }
    else if (elementName == "new-password-input") {
      return this.status == this.Statuses.changePassword
    }
    else if (elementName == "change-password-btn") {
      return this.status == this.Statuses.changePassword
    }
    return false
  }
}