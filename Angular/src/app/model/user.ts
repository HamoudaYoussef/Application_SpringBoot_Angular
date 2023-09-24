import { gender } from "./gender";

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public age: number,
    public gender:gender
  ) { }
}
