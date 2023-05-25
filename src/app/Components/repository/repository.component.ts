import {ActivatedRoute} from "@angular/router";
import {GithubAPIService} from "../../Services/github-api.service";
import {Component} from '@angular/core';
import {formatDistance, parseISO} from "date-fns";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})

export class RepositoryComponent {
  currentUsername: string = '';
  currentRepository: string = '';
  repository: any = null;
  branches: any = [];
  contributors: any[] = [];
  issues: any[] = [];

  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentUsername = params['username'];
      this.currentRepository = params['repository'];
      this.getRepositoryDetails();
    });
  }

  ngAfterViewInit() {
    this.getBranches();
    this.getContributors();
    this.getIssues();
  }

  getRepositoryDetails() {
    this.githubAPIService.getUserRepository(this.currentUsername, this.currentRepository).subscribe(
      (data: any) => {
        this.repository = data;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.repository = null;
      }
    );
  }

  getBranches() {
    this.githubAPIService.getUserRepositoryBranches(this.currentUsername, this.currentRepository).subscribe(
      (data: any) => {
        this.branches = data;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.branches = [];
      }
    );
  }

  getContributors() {
    this.githubAPIService.getUserRepositoryContributors(this.currentUsername, this.currentRepository).subscribe(
      (data: any) => {
        this.contributors = data;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.contributors = [];
      }
    );
  }

  getIssues() {
    this.githubAPIService.getUserRepositoryIssues(this.currentUsername, this.currentRepository).subscribe(
      (data: any) => {
        this.issues = data;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.issues = [];
      }
    );
  }
}
