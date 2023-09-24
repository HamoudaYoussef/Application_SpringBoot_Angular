import { Entreprise } from "./entreprise";
import { gender } from "./gender";
import { Participation } from "./participation";

export class Sondage {
  constructor(
    public id: number,
    public lien: string,
    public nomsondage: string,
    public description: string,
    public critere: string,
    public nbr_participant: number,
    public entreprise:Entreprise,
    public cout: number,
    public minage: number,
    public maxage: number,
    public gender: gender,
    public participations: Participation[],
  ) { }
}
