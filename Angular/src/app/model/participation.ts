import { Sondage } from "./sondage";

export class Participation {
  constructor(
    public id: number,
    public etat: boolean,
    public sondage: Sondage
  ) { }
}
