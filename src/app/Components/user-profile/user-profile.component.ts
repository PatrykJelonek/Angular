import {Component, OnInit} from '@angular/core';
import {GithubAPIService} from "../../Services/github-api.service";
import {ActivatedRoute} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {formatDistance, parseISO} from "date-fns";
import {Location} from "@angular/common";

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

  per_page: number = 10;
  current_page: number = 1;

  constructor(private githubApiService: GithubAPIService, private route: ActivatedRoute, private location: Location) {
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

  public getUserRepos(current_page: number = this.current_page) {
    this.githubApiService.getUserRepositories(this.username, this.per_page, current_page)
      .subscribe(
        repos => {
          this.userRepos = repos;
          this.current_page = current_page;
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

  public back() {
    this.location.back();
  }
}
