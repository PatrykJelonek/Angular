import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GithubAPIService} from "../../Services/github-api.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  query: string = '';
  users: any[] = [];

  perPage: number = 12;
  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService, private location: Location) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.searchUsers();
    });
  }

  public searchUsers(current_page: number = this.currentPage) {
    if (this.query) {
      this.githubAPIService.searchUsers(this.query, this.perPage, current_page).subscribe(
        (data: any) => {
          this.users = data.items;
          this.currentPage = current_page;

        },
        (error) => {
          console.log('Wystąpił błąd podczas wyszukiwania repozytoriów:', error);
          this.users = [];
          this.currentPage = 1;
        }
      );
    } else {
      this.users = [];
    }
  }

  public back() {
    this.location.back();
  }
}
