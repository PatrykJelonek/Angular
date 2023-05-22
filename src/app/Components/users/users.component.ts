import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GithubAPIService} from "../../Services/github-api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  query: string = '';
  users: any[] = [];

  per_page: number = 12;
  current_page: number = 1;

  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.searchUsers();
    });
  }

  public searchUsers(current_page: number = this.current_page) {
    if (this.query) {
      this.githubAPIService.searchUsers(this.query, this.per_page, current_page).subscribe(
        (data: any) => {
          this.users = data.items;
          this.current_page = current_page;

        },
        (error) => {
          console.log('Wystąpił błąd podczas wyszukiwania repozytoriów:', error);
          this.users = [];
          this.current_page = 1;
        }
      );
    } else {
      this.users = [];
    }
  }
}
