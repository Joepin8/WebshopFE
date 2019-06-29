export class Product {
  constructor(
    // tslint:disable-next-line:variable-name
    public productId?: number,
    public naam?: string,
    public omschrijving?: string,
    public prijs?: number,
    public categorie?: string,
    public imgUrl?: string,
  ) { }
}
