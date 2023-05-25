import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-contributors-list',
  templateUrl: './contributors-list.component.html',
  styleUrls: ['./contributors-list.component.scss']
})
export class ContributorsListComponent {
  @Input() contributors: any[] = []
}
