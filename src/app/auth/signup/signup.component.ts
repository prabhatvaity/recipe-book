import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() {
  }
  onSignUp(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.authService.signupUser(email, password);
  }
}
