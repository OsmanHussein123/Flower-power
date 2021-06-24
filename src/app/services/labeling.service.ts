import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelingService {

  public labels: [] = [];

  public label = '';

  constructor() { }

  addLabel(label: any): void{
    // @ts-ignore
    this.labels.push(label);
  }
  deleteLabel(id: any): void{
    this.labels.splice(id, 1);
  }


}
