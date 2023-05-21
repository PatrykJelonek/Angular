import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getUserRepositories(username: string): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    return this.http.get<any[]>(url);
  }
  getUserRepository(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}`;
    return this.http.get<any[]>(url);
  }
  getUserRepositoryBranches(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}/branches`;
    return this.http.get<any[]>(url);
  }

  getUserProfile(username: string): Observable<any> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get<any>(url);
  }

  searchRepositories(repositoryName: string) {
    const apiUrl = `${this.apiUrl}/search/repositories?q=${repositoryName}`;
    return this.http.get(apiUrl);
  }

  getRepositoryDetails(repositoryName: string) {
    const apiUrl = `${this.apiUrl}/repos/${repositoryName}`;
    return this.http.get(apiUrl);
  }
}
