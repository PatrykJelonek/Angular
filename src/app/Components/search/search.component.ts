import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchType: string = 'user';
  searchQuery: string = '';

  constructor(private router: Router) {}

  setSearchType(type: string) {
    this.searchType = type;
  }

  search() {
    if (this.searchQuery) {
      const route = this.searchType === 'user' ? `/users?query=${this.searchQuery}` : `/repositories?query=${this.searchQuery}`;
      this.router.navigateByUrl(route);
    }
  }
}
