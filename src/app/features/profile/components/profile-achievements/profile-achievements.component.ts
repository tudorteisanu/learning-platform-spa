import { Component, Input } from '@angular/core';
import { Achievement } from '../../models/profile.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-achievements',
  standalone: true,
  templateUrl: './profile-achievements.component.html',
  styleUrls: ['./profile-achievements.component.scss'],
  imports: [NgIf, NgFor, DatePipe]
})
export class ProfileAchievementsComponent {
  @Input() achievements: Achievement[] = [];
}
