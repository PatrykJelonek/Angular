import {Pipe, PipeTransform} from '@angular/core';
import {formatDistance, parseISO} from "date-fns";

@Pipe({
  name: 'sinceDate'
})
export class SinceDatePipes implements PipeTransform {
  transform(date: string): string {
    const parsedDate = parseISO(date);
    const baseDate = new Date();

    return formatDistance(parsedDate, baseDate);
  }
}
