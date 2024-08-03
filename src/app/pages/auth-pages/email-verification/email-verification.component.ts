import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  code!: string
  isVerifying: boolean = false
  isResendingACode: boolean = false

  verify() {
    this.isVerifying = true

    const body = {
      email: sessionStorage.getItem("email"),
      password: sessionStorage.getItem("password"),
      sentPassword: this.code
    }

    this.authService.register(body).subscribe({
      next: (response) => {
        if (response.token != undefined) {
          localStorage.setItem("accessToken", response.token)

          this.router.navigate([""])
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isVerifying = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: "Something went wrong!" });
        this.isVerifying = false
      }
    })
  }

  resendACode() {
    this.isResendingACode = true

    const body = {
      email: sessionStorage.getItem("email")
    }

    this.authService.verifyUser(body).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.response });
        }
        else {
          this.messageService.add({ severity: 'contrast', summary: 'Warning', detail: response.response });
        }
        this.isResendingACode = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Something went wrong!' });
        this.isResendingACode = false
      }
    })
  }
}
