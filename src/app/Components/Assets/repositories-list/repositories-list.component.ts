import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-repositories-list',
  templateUrl: './repositories-list.component.html',
  styleUrls: ['./repositories-list.component.scss']
})
export class RepositoriesListComponent {
  @Input() repositories: any[] = [];
  @Input() showAuthor: boolean = false;
}
