import { AuthService } from './../../shared/services/auth.service';
import { User } from './../../shared/components/interfaces';
import { from } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
    private router: Router
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
      console.log(this.form.value)
      if(this.form.invalid) {

        return
      }
      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password
      }

      this.auth.login(user).subscribe(()=> {
        this.form.reset()
        this.router.navigate(['/task-list'])
      })

    }
  }
