import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from '../../shared/models/auth.models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem('token'));

  login(credentials: { email: string, password: string }) {
    return this.http.post<AuthResponse>('http://localhost:3000/auth/login', credentials).pipe(
      tap((response) => {
        this.token.set(response.accessToken);
        this.currentUser.set(response.user);
        localStorage.setItem('token', response.accessToken);
      })
    )
  }

  logout() {
    this.token.set(null)
    this.currentUser.set(null)
    localStorage.removeItem('token')
  }

}
