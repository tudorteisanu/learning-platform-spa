import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = '/profile'; // Replace with your API
  private profileSubject = new BehaviorSubject<UserProfile | null>(null);

  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProfile(): void {
    this.http.get<UserProfile>(this.apiUrl).subscribe({
      next: (profile) => this.profileSubject.next(profile),
      error: (err) => console.error('Failed to fetch profile', err),
    });
  }

  updateProfile(updatedData: Partial<UserProfile>) {
    return this.http.put<UserProfile>(this.apiUrl, updatedData).subscribe({
      next: (updatedProfile) => this.profileSubject.next(updatedProfile),
      error: (err) => console.error('Failed to update profile', err),
    });
  }
}
