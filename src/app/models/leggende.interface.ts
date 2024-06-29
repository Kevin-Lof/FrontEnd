export interface LeggendeResponse {
    content: Leggende[];
  }

export interface Leggende {

    id : number;

    nome : string; 

    cognome : string; 

    avatar : string;

    ruolo : string;

    valore : number;

}