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

  perPage: number = 10;
  currentPage: number = 1;

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

  public getUserRepos(current_page: number = this.currentPage) {
    this.githubApiService.getUserRepositories(this.username, this.perPage, current_page)
      .subscribe(
        repos => {
          this.userRepos = repos;
          this.currentPage = current_page;
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
