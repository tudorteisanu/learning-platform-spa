import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../models/profile.model';
import { ProfileDetailsComponent } from "../../components/profile-details/profile-details.component";
import { AsyncPipe } from '@angular/common';
import { ProfileAchievementsComponent } from "../../components/profile-achievements/profile-achievements.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
    imports: [ProfileDetailsComponent, AsyncPipe, ProfileAchievementsComponent]
})
export class ProfilePageComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  profile$ = this.profileService.profile$;

  ngOnInit(): void {
    this.profileService.fetchProfile();
  }

  onProfileUpdate(updatedData: Partial<UserProfile>): void {
    this.profileService.updateProfile(updatedData);
  }
}
