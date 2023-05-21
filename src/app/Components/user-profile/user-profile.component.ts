import {Component, OnInit} from '@angular/core';
import {GithubAPIService} from "../../Services/github-api.service";
import {ActivatedRoute} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {formatDistance, parseISO} from "date-fns";

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
  userRepos: any;
  username: string = 'PatrykJelonek';

  constructor(private githubApiService: GithubAPIService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.getUserProfile();
    this.getUserRepos();
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

  getUserRepos() {
    this.githubApiService.getUserRepositories(this.username)
      .subscribe(
        repos => {
          this.userRepos = repos;
        },
        error => {
          console.log('Wystąpił błąd podczas pobierania danych z API GitHub:', error);
        }
      );
  }

  public customFormatDate(date: string) {
    const parsedDate = parseISO(date);
    const baseDate = new Date();

    return formatDistance(parsedDate, baseDate);
  }
}
