import {Component, OnInit} from '@angular/core';
import {GithubAPIService} from "../../Services/github-api.service";
import {ActivatedRoute} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate(500)),
    ])
  ]
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  username: string = 'PatrykJelonek';

  constructor(private githubApiService: GithubAPIService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.getUserProfile();
  }

  getUserProfile() {
    this.githubApiService.getUserProfile(this.username)
      .subscribe(
        profile => {
          this.userProfile = profile;
        },
        error => {
          console.log('Wystąpił błąd podczas pobierania danych z API GitHub:', error);
        }
      );
  }
}
