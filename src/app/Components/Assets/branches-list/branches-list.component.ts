import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss']
})
export class BranchesListComponent {
  @Input() branches: any[] = [];
  @Input() defaultBranch: string = '';
}
