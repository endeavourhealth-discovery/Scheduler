import {Definition} from "./Definition";

export class Extract {
  extractId: number;
  extractName: string;
  cohortId: number;
  codeSetId: number;
  datasetId: number;
  definition: Definition;
  transactionId: number;

  constructor() {
    this.extractId = 0;
    this.extractName = '';
    this.cohortId = 0;
    this.codeSetId = 0;
    this.datasetId = 0;
    this.definition = new Definition();
    this.transactionId = 0;
  }
}
