import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from '../../../models/users.model';

import { routes } from '../../../../consts';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: any;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail: string = 'https://flatlogic.com';

  constructor(private apis: ApisService) {}
  ngOnInit(): void {
    this.fetchProfile();
  }
  public signOutEmit(): void {
    this.signOut.emit();
  }

  fetchProfile() {
    this.apis.fetchProfile().subscribe((data: any) => {
      this.user = data?.user || null;
      console.log('Profile data:', data);
    });
  }

  firstUserLetter() {
    return null;
  }

  avatar() {
    return this.user && this.user.avatar && this.user.avatar.length
      ? this.user.avatar[0].publicUrl
      : './assets/profile.png';
  }
}
