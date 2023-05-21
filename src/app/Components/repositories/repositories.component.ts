import { Component } from '@angular/core';
import { GithubAPIService } from "../../Services/github-api.service";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent {
  repositories: any[] = [];
  selectedRepo: any;
  username: string = 'PatrykJelonek';
  paginatedRepos: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  userProfile: any;
  languageFilter: string = '';
  starsFilter: string = '';

  constructor(private githubApiService: GithubAPIService) { }

  ngOnInit() {
    this.getUserRepositories();
    this.getUserProfile();
  }

  getUserRepositories() {
    this.githubApiService.getUserRepositories(this.username)
      .subscribe(
        (repositories: any[]) => {
          this.repositories = repositories;
          this.updatePagination();
        },
        (error: any) => {
          console.log('Wystąpił błąd podczas pobierania danych z API GitHub:', error);
        }
      );
  }

  showRepoDetails(repo: any) {
    this.selectedRepo = repo;
  }

  searchRepos() {
    if (this.username) {
      this.githubApiService.getUserProfile(this.username)
        .subscribe(
          profile => {
            this.userProfile = profile;
          },
          error => {
            console.log('Wystąpił błąd podczas pobierania danych z API GitHub:', error);
          }
        );

      this.githubApiService.getUserRepositories(this.username)
        .subscribe(
          repos => {
            this.repositories = repos;
            this.updatePagination();
          },
          error => {
            console.log('Wystąpił błąd podczas pobierania danych z API GitHub:', error);
          }
        );
    }


  }

  updatePagination() {
    console.log("update");
    this.totalPages = Math.ceil(this.repositories.length / this.itemsPerPage);
    this.paginatedRepos = this.repositories.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
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

  applyFilters() {
    this.filterRepos();
    this.updatePagination();
  }

  filterRepos() {
    this.paginatedRepos = this.repositories.filter(repo => {
      let passLanguageFilter = true;
      let passStarsFilter = true;

      if (this.languageFilter !== '') {
        passLanguageFilter = repo.language === this.languageFilter;
        console.log(repo);
      }

      if (this.starsFilter !== '') {
        const stars = parseInt(this.starsFilter);
        passStarsFilter = repo.stargazers_count >= stars;
      }

      return passLanguageFilter && passStarsFilter;
    });

    console.table(this.paginatedRepos);
  }

  get uniqueLanguages(): string[] {
    return Array.from(new Set(this.repositories.map(repo => repo.language)));
  }
}
