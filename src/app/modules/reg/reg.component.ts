import { User } from './../../shared/components/interfaces';
import { from } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})

export class RegComponent implements OnInit {

  form: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor () {}

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

    }
  }
