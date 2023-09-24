export class Entreprise {
  constructor(
    public id: number,
    public companyname: string,
    public email: string,
    public password: string,
    public points: number,
    public enabled:boolean
  ) { }
}
