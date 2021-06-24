export class Annotation {

  public id: number;
  public label: string;
  public top: string;
  public left: string;

  constructor(top, left) {
    this.id = 0;
    this.top = top;
    this.left = left;
    this.label = '';
  }
}
