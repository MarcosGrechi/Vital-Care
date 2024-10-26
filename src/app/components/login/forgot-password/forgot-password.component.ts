import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserStorageService } from '../../../services/users-storage.service';
import { SingupComponent } from '../singup/singup.component';
import { User } from '../../../entities/user.model';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  constructor(
    public dialogRef: MatDialogRef<SingupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly usersService: UserStorageService
  ) {}

  users: User[] | undefined;
  email: string | null | undefined;
  profile: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value as string;
      const password = this.forgotPasswordForm.get('password')?.value as string;

      this.usersService.getUsersByEmailOrById(email).subscribe((user: User) => {
        if (user) {
          this.usersService.updatePassword(email, password).subscribe({
            next: () => {
              alert('Senha alterada com sucesso!');
              this.dialogRef.close();
            },
            error: () => {
              alert('Usuário não encontrado com o email: ' + email);            }
          });
        } 
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
