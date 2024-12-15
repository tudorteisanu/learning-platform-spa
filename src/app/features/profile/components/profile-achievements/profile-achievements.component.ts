import { Component, Input } from '@angular/core';
import { Achievement } from '../../models/profile.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-profile-achievements',
    standalone: true,
    templateUrl: './profile-achievements.component.html',
    styleUrls: ['./profile-achievements.component.scss'],
    imports: [DatePipe]
})
export class ProfileAchievementsComponent {
  @Input() achievements: Achievement[] = [];
}
