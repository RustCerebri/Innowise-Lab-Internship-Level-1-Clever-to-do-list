import { User} from './../components/interfaces';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()

export class AuthService {
  constructor (private http: HttpClient, private afAuth: AngularFireAuth) {}

  get token(): string {
    return localStorage.getItem('fb-token');
  };

  public login (user: User): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  };

  public logout () {
    this.afAuth.signOut().then(() => {
       this.setToken(null);
    })

  };

  public isAuthenticated (): boolean {
    return !!this.token
  };

  public setToken(token: string) {

    if  (token) {
    localStorage.setItem('fb-token', token);
     } else {
      localStorage.clear();
    }

  }

  public signUp (user: User): void{
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      this.afAuth.currentUser.then(res => res.sendEmailVerification());
      var user = userCredential.user;
    })

  }

}
