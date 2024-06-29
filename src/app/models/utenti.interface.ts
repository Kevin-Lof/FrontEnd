export interface UtentiResponse {
    content: Utenti[];
  }

export interface Utenti {

    id : number;

    username : string;

    email : string;

    password : string;

    nome : string; 

    cognome : string; 

    avatar : string;

    ruolo : string;

}
