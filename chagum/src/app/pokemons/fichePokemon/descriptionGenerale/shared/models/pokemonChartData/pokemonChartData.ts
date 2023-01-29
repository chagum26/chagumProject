import { Dataset } from "./dataset";

export class PokemonChartData {
  labels: string[];
  datasets: Dataset[];

  constructor() {
    this.labels = [];
    this.datasets = [new Dataset()];
  }
}
