import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user : any;
  constructor(private apis : ApisService) { }

  
  fetchProfile() {
    this.apis.fetchProfile().subscribe((data: any) => {
      this.user = data?.user || null;
      console.log('Profile data:', data);
    });
  }

  ngOnInit(): void {
    this.fetchProfile();
  }

}
