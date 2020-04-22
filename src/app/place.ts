export class Regione {
    _id?: string;
    codice: number;
    descrizione: string;
}

export class Provincia {
    _id?: string;
    descrizione: string;
    codice: string;
    codiceRegione?: number;
}

export class Comune {
    _id?: string;
    descrizione: string;
    codice: string;
    codiceProvincia?: string;
}