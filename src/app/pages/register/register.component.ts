import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  protected isLoginError: boolean = false;
  protected registerForm!: FormGroup;
  //constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

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
  //   this.authService.login(username, password).subscribe(
  //     response => {
  //       this.isLoginError = false;
  //       this.cookieService.set('token', response.access_token);
  //       this.router.navigate(['/'])
  //     },
  //     error => {
  //       this.isLoginError = true;
  //     }
  //   );
  }
}
