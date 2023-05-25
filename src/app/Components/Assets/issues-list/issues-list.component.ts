import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent {
  @Input() issues: any[] = [];
}
