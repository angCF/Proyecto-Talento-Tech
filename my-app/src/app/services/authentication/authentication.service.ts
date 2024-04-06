import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginInterface } from '../../core/interfaces/login-interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../core/models/user.model';
import { ROUTES_APP } from '../../core/enum/routes.enum';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: UserModel;
  constructor(private httpClient: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || 'expired';
  }
  //Vigila hasta que llega una respuesta
  validateToken(): Observable<boolean> {
    return this.httpClient.get(`${baseUrl}/auth`, {
      headers: {
        'x-token': this.token
      },
    })
      .pipe(
        map((res: any) => {
          const {
            _id,
            name,
            email,
            login,
            password,
            documentType,
            documentNumber,
            rol,
            state,
            createdAt
          } = res.user;

          this.user = new UserModel(
            _id,
            name,
            email,
            login,
            password,
            documentType,
            documentNumber,
            rol,
            state,
            createdAt
          );
          localStorage.setItem('token', res.token);
          return true;

        }),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }

  login(login: LoginInterface) {
    return this.httpClient.post(`${baseUrl}/auth`, login).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl(ROUTES_APP.AUTH);
  }
}
