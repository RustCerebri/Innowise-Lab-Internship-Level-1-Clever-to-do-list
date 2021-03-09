import { environment } from './../../../environments/environment';
import { User, FbAuthResponse } from './../components/interfaces';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {  } from  'firebase/app';


@Injectable()

export class AuthService {
  constructor (private http: HttpClient, private afAuth: AngularFireAuth) {}

  get token(): string {
    const expDate = new Date (localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null
    }
    return localStorage.getItem('fb-token');
  };

  login (user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  };

  logout () {
    this.setToken(null);
  };

  isAuthenticated (): boolean {
    return !!this.token
  };

  private setToken(response: FbAuthResponse | null) {
    if  (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }

  }

  public signUp (user: User): void{
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      this.afAuth.currentUser.then(res => res.sendEmailVerification());
      var user = userCredential.user;
      console.log(user);

    })

  }

}
