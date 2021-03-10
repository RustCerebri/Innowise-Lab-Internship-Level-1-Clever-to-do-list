import { AuthService } from './../../shared/services/auth.service';
import { User } from './../../shared/components/interfaces';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  form: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor (
    private auth: AuthService,
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

    submit() {

      if(this.form.invalid) {

        return
      }

      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password,
        returnSecureToken: true
      }


        this.auth.login(user).then((res) => {
          console.log(res.user.b.b.h);
          this.auth.setToken(res.user.b.b.h)
          this.form.reset()
          this.router.navigate(['/task-list'])
        });


    }
  }
