import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GithubAPIService} from "../../Services/github-api.service";

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit {
  query: string = '';
  repositories: any[] = [];

  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query = this.route.snapshot.params['query'];
      this.searchRepositories();
    });
  }

  searchRepositories() {
    if (this.query) {
      this.githubAPIService.searchRepositories(this.query).subscribe(
        (data: any) => {
          this.repositories = data.items;
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
