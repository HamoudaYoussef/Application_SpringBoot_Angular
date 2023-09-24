import { Sondage } from "./sondage";

export class Question {
  constructor(
    public id: number,
    public titre: string,
    public sondage:Sondage
  ) { }
}
