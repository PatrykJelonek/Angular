import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {
  private apiUrl: string = 'https://api.github.com';
  private defaultPerPage: number = 10;
  private defaultCurrentPage: number = 1;

  constructor(private http: HttpClient) {
  }

  getUserRepositories(username: string, perPage: number = this.defaultPerPage, currentPage: number = this.defaultCurrentPage): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    return this.http.get<any[]>(url, {
      params: {
        per_page: perPage,
        page: currentPage
      }
    });
  }

  getUserRepository(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}`;
    return this.http.get<any[]>(url);
  }

  getUserRepositoryBranches(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}/branches`;
    return this.http.get<any[]>(url);
  }

  getUserRepositoryContributors(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}/contributors`;
    return this.http.get<any[]>(url);
  }

  getUserRepositoryIssues(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}/issues`;
    return this.http.get<any[]>(url);
  }

  getUserProfile(username: string): Observable<any> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get<any>(url);
  }

  searchRepositories(repositoryName: string, perPage: number = this.defaultPerPage, currentPage: number = this.defaultCurrentPage) {
    const apiUrl = `${this.apiUrl}/search/repositories?q=${repositoryName}`;
    return this.http.get(apiUrl, {
      params: {
        per_page: perPage,
        page: currentPage
      }
    });
  }

  searchUsers(username: string, perPage: number = this.defaultPerPage, currentPage: number = this.defaultCurrentPage) {
    const apiUrl = `${this.apiUrl}/search/users?q=${username}`;
    return this.http.get(apiUrl, {
      params: {
        per_page: perPage,
        page: currentPage
      }
    });
  }

  getRepositoryDetails(repositoryName: string) {
    const apiUrl = `${this.apiUrl}/repos/${repositoryName}`;
    return this.http.get(apiUrl);
  }
}
