import { AuthService } from './../../shared/services/auth.service';
import { User } from './../../shared/components/interfaces';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})

export class RegComponent implements OnInit {

  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;

  constructor (
    private authService: AuthService,
    private router: Router,
    private fAuth: AngularFireAuth
    ) {}

    ngOnInit () : void {
      this.email = new FormControl('', [Validators.required, Validators.email ]);
      this.password = new FormControl ('', [ Validators.required, Validators.minLength(6)]);
      this.form = new FormGroup ( {
        email: this.email,
        password: this.password
      })
    }

    public submit(): void {

      if(this.form.invalid) {
        return
      }

      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password,
        returnSecureToken: true
      }

      this.authService.signUp(user);
    }
  }
