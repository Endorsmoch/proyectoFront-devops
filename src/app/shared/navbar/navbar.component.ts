import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isScreenSmall: boolean = false;
  constructor(private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe(result => {
      this.isScreenSmall = result.matches;
    });
  }

  logout(){
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
