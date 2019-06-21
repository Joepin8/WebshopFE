export class User {
  constructor(
    // tslint:disable-next-line:variable-name
    public user_id?: number,
    public naam?: string,
    public voornaam?: string,
    public postcode?: string,
    public huisnummer?: number,
    public toevoeging?: string,
    public email?: string,
    public wachtwoord?: string,
    public rol?: string,
  ) { }
}
