import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Crypto } from 'src/app/util/crypto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  protected registerForm!: FormGroup;
  private crypto = new Crypto;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.registerForm = this.initRegisterForm();
  }

  initRegisterForm(): FormGroup {
    return new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  onSubmit() {
    const formUser = this.registerForm.value;
    const newUser:User = {
      'userName': formUser.userName,
      'email' : formUser.email,
      'password' : this.crypto.encrypted(formUser.password)
    } 

    this.authService.register(newUser.userName, newUser.email, newUser.password).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
