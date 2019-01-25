import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(arr: any[], key1: string, key2?: string): any[] {
    if(!arr) return null;
    if(!key1 || key1.length <= 0) return arr;
    
    return arr.sort((a, b) => {
      return a[key1] === b[key1] ? 0 : a[key1] ? -1 : 1;
    });
  }

}
