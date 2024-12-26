import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { RegisterRequest } from '../models/register.model';
import { ForgotPasswordRequest, ResetPasswordRequest } from '../models/password.model';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { CurrentUser } from '@/App/shared/models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected readonly http = inject(HttpClient);

  private readonly currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  loggedIn$ = this.currentUser$.pipe(map((currentUser) => Boolean(currentUser)));

  setToken(token: string | null): void {
    this.tokenSubject.next(token);

    localStorage.setItem('accessToken', String(token));
  }

  login(payload: LoginRequest): Observable<CurrentUser> {
    return this.http.post<LoginResponse>('/auth/login', payload).pipe(
      tap((response) => {
        this.setToken(response.token);
      }),
      switchMap(() => this.fetchProfile())
    )
  }

  register(payload: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/register', payload);
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<void> {
    return this.http.post<void>('/auth/forgot-password', payload)
  }

  resetPassword(payload: ResetPasswordRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/reset-password', payload)
  }

  fetchProfile(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>('/profile')
      .pipe(tap((currentUser) => this.currentUserSubject.next(currentUser)));
  }
}
