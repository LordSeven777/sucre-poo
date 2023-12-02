import promptLib from "prompt-sync";

const prompt = promptLib({ sigint: true });

class Client {
  id!: number;
  nom!: string;
  prenom!: string;
  tel!: string;
  adresse!: string;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    tel: string,
    adresse: string
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.tel = tel;
    this.adresse = adresse;
  }
}

class Banque {
  private clients: Client[] = [];
  private comptes: Compte[] = [];

  public addClient(client: Client) {
    this.clients.push(client);
  }

  public addCompte(type: TypeCompte, client: Client) {
    let compte: Compte;
    switch (type) {
      case "Mobile":
        compte = new CompteMobile(type, client);
        break;
      case "Epargne":
        compte = new CompteEpargne(type, client);
        break;
      case "Principale":
        compte = new ComptePrincipale(type, client);
        break;
    }
    banque.comptes.push(compte);
  }

  public getClientById(id: number) {
    return this.clients.find((client) => client.id === id);
  }

  public getComptesByClient(idClient: number) {
    return this.comptes.find((compte) => compte.client.id === idClient);
  }

  public getCompteByClient(idClient: number, type: TypeCompte) {
    return this.comptes.find(
      (compte) => compte.client.id === idClient && compte.type === type
    );
  }
}

interface ICompte {
  transaction(compte: Compte): void;
  depot(montant: number): void;
  retrait(montant: number): void;
  getSolde(): void;
  pret(): void;
}

type TypeCompte = "Mobile" | "Epargne" | "Principale";

abstract class Compte implements ICompte {
  public client!: Client;
  public type!: TypeCompte;
  private solde: number = 0;
  private tauxRetrait = 6;

  constructor(type: TypeCompte, client: Client) {
    this.client = client;
    this.type = type;
  }

  public depot(montant: number) {
    this.solde += montant;
  }

  public retrait(montant: number) {
    if (this.solde < montant) {
      throw new Error("Votre solde est insuffisant pour ce retrait.");
    }
    this.solde -= montant + (montant * this.tauxRetrait) / 100;
  }

  public getSolde() {
    return this.solde;
  }

  abstract pret(): void;
  abstract transaction(compte: Compte): void;
}

class CompteMobile extends Compte {
  constructor(type: TypeCompte, client: Client) {
    super(type, client);
  }

  transaction(): void {
    throw new Error("Method not implemented.");
  }
  pret(): void {
    throw new Error("Method not implemented.");
  }
}

class CompteEpargne extends Compte {
  constructor(type: TypeCompte, client: Client) {
    super(type, client);
  }

  transaction(): void {
    throw new Error("Method not implemented.");
  }
  pret(): void {
    throw new Error("Method not implemented.");
  }
}

class ComptePrincipale extends Compte {
  constructor(type: TypeCompte, client: Client) {
    super(type, client);
  }

  transaction(): void {
    throw new Error("Method not implemented.");
  }
  pret(): void {
    throw new Error("Method not implemented.");
  }
}

function main() {
  let isEnd = false;
  while (!isEnd) {
    console.log(`
        Menu principal:\n
        1- Devenir membre\n
        2- Déjà membre
        `);
    let choix = prompt("Choix: ");
    console.clear();
    switch (choix) {
      case "1":
        creationCompte();
        isEnd = true;
        break;
      case "2":
        choixCompte();
        break;
      default:
        break;
    }
  }
}

const banque = new Banque();
let clientsId = 0;

function creationCompte() {
  console.log("Informations personnelles:");
  const nom = prompt("nom: ");
  const prenom = prompt("prenom: ");
  const tel = prompt("telephone: ");
  const adresse = prompt("adresse: ");
  const client = new Client(++clientsId, nom, prenom, tel, adresse);
  banque.addClient(client);
  console.log(
    `Choisir un type de compte:\n1- Mobile\n2- Epargne\n3- Principale`
  );
  let choix = prompt("Choix: ");
  let typeCompte: TypeCompte = "Mobile";
  switch (choix) {
    case "1":
      typeCompte = "Mobile";
      break;
    case "2":
      typeCompte = "Epargne";
      break;
    case "3":
      typeCompte = "Principale";
      break;
  }
  banque.addCompte(typeCompte, client);
}

function choixCompte() {}

main();
