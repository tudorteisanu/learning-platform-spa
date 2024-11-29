import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile } from '../../models/profile.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  imports: [FormsModule, NgIf]
})
export class ProfileDetailsComponent {
  @Input() profile: UserProfile | null = null;
  @Output() update = new EventEmitter<Partial<UserProfile>>();

  editMode = false;
  editableProfile: Partial<UserProfile> = {};

  saveProfile(): void {
    this.update.emit(this.editableProfile);
    this.editMode = false;
  }
}
