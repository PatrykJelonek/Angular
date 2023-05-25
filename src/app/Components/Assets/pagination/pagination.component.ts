import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() showPagination: boolean = false;
  @Input() showPreviewOption: boolean = false;
  @Input() showNextOption: boolean = false;
  @Input() currentPage: number = 1;
  @Output() $onClickPreviewOptionFunction = new EventEmitter<string>();
  @Output() $onClickNextOptionFunction = new EventEmitter<string>();

  public clickPreviewOptionFunction(): void {
    this.$onClickPreviewOptionFunction.emit('one');
  }
  public clickNextOptionFunction(): void {
    this.$onClickNextOptionFunction.emit('one');
  }
}
