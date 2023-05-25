import {Pipe, PipeTransform} from '@angular/core';
import {format, parseISO} from "date-fns";


@Pipe({
  name: 'formattedDate'
})
export class FormattedDatePipe implements PipeTransform {
  transform(date: string): string {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'Y-MM-dd HH:ii:ss');
  }
}
