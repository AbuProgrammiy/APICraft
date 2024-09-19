import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  email!: string
  password!: string
  isJoining: boolean = false
  isInning: boolean = false
  isForgeted: boolean = false

  letMeJoin() {

    this.isJoining = true

    const body = {
      email: this.email
    }

    this.authService.verifyUser(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          sessionStorage.setItem("email", this.email)
          sessionStorage.setItem("password", this.password)

          this.router.navigate(["/email-verifications"])
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isJoining = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isJoining = false
      }
    })
  }

  letMeIn() {

    this.isInning = true

    const body = {
      email: this.email,
      password: this.password
    }

    this.authService.logIn(body).subscribe({
      next: (response) => {
        if (response.token != undefined) {
          localStorage.setItem("accessToken", response.token)
          localStorage.setItem("isUserRegistered", "true")

          this.router.navigate([""])
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isInning = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isInning = false
      }
    })
  }

  forgotPassword() {
    this.isForgeted = true
  
    const body = {
      email: this.email,
      isPasswordForgotten: true
    }
  
    this.authService.verifyUser(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          sessionStorage.setItem("email", this.email)
  
          this.router.navigate(["forgot-password"])
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isForgeted = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isForgeted = false
      }
    })
  }
}