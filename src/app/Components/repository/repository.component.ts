import {ActivatedRoute} from "@angular/router";
import {GithubAPIService} from "../../Services/github-api.service";
import {Component} from '@angular/core';
import {Location} from "@angular/common";

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
  commits: any[] = [];
  commitsCurrentPage: number = 1;
  commitsPerPage: number = 5;

  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService, private location: Location) {
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
    this.getCommits();
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

  public getCommits(currentPage: number = this.commitsCurrentPage) {
    this.githubAPIService.getUserRepositoryCommits(this.currentUsername, this.currentRepository, 5, currentPage).subscribe(
      (data: any) => {
        this.commits = data;
        this.commitsCurrentPage = currentPage;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.commits = [];
      }
    );
  }

  public back() {
    this.location.back();
  }
}
