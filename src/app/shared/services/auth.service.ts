import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../interfaces/user";
import {catchError, Observable, Observer, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {FbUserResponse} from "../interfaces/fb-user-response";

@Injectable()
export class AuthService {

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  apiKey = environment.apiKey
  expDate = localStorage.getItem('fb-token-expired')
  error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string | number  | null {
    const expDate = localStorage.getItem('fb-token-expired')
    if(expDate && new Date() > new Date(expDate)){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`${this.url}${this.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  private handleError(error: HttpErrorResponse){
    const { message } = error.error.error
    console.log('ERR message:',message);
    switch (message){
      case 'INVALID_LOGIN_CREDENTIALS':
        this.error$.next('Wrong login or email')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break
    }
    return throwError(error)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbUserResponse | any): void {
    if(response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-expired', expDate.toString())
      console.log('RES:', response);
    } else {
      localStorage.clear()
    }
  }
}
