import { Component } from '@angular/core';
import { GithubAPIService } from "../../Services/github-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent {
  query: string = '';
  repositories: any[] = [];

  perPage: number = 10;
  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.searchRepositories();
    });
  }

  public searchRepositories(currentPage: number = this.currentPage) {
    if (this.query) {
      this.githubAPIService.searchRepositories(this.query, this.perPage, currentPage).subscribe(
        (data: any) => {
          this.repositories = data.items;
          this.currentPage = currentPage;
        },
        (error) => {
          console.log('Wystąpił błąd podczas wyszukiwania repozytoriów:', error);
          this.repositories = [];
        }
      );
    } else {
      this.repositories = [];
    }
  }
}
