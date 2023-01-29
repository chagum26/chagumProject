export class Dataset {
  label?: string;
  data: number[];
  backgroundColor = '#30a7d7'
  constructor() {
    this.label = 'Pokemon stats';
    this.data = [];
  }
}
