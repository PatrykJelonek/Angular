import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(1000)),
    ])
  ]
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
