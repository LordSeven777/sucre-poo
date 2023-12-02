class Client {
  id!: number;
  nom!: string;
  prenom!: string;
  tel!: string;
  adresse!: string;
}

class Banque {
  private clients!: Client[];
  private comptes!: Compte[];

  public addClient(client: Client) {
    this.clients.push(client);
  }

  public getClientById(id: number) {
    return this.clients.find((client) => client.id === id);
  }

  public getCompteByClient(idClient: number, type: TypeCompte) {
    return this.comptes.find(
      (compte) => compte.client.id === idClient && compte.type === type
    );
  }
}

interface ICompte {
  transaction(compte: Compte): void;
  depot(): void;
  retrait(): void;
  getSolde(): void;
  pret(): void;
}

type TypeCompte = "Mobile" | "Epargne" | "Principale";

class Compte {
  public client!: Client;
  public type!: TypeCompte;
  private solde!: number;
  private tauxRetrait = 6;

  constructor(client: Client, type: TypeCompte, solde: number) {
    this.client = client;
    this.type = type;
    this.solde = solde;
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
}

class CompteMobile extends Compte implements ICompte {
  transaction(): void {
    throw new Error("Method not implemented.");
  }
  depot(): void {
    throw new Error("Method not implemented.");
  }
  retrait(): void {
    throw new Error("Method not implemented.");
  }
  pret(): void {
    throw new Error("Method not implemented.");
  }
}

class CompteEpargne extends Compte implements ICompte {
  transaction(): void {
    throw new Error("Method not implemented.");
  }
  depot(): void {
    throw new Error("Method not implemented.");
  }
  retrait(): void {
    throw new Error("Method not implemented.");
  }
  pret(): void {
    throw new Error("Method not implemented.");
  }
}

class ComptePrincipale extends Compte implements ICompte {
  transaction(): void {
    throw new Error("Method not implemented.");
  }
  depot(): void {
    throw new Error("Method not implemented.");
  }
  retrait(): void {
    throw new Error("Method not implemented.");
  }
  pret(): void {
    throw new Error("Method not implemented.");
  }
}
