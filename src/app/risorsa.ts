export interface Risorsa {
    _id: string,
    nome: string,
    cognome: string,
    dataNascita: string,

    residenza: {
        regione: {
            codice: number,
            descrizione: string
        },
        provincia: {
            codice: number,
            descrizione: string
        },
        comune: {
            codice: number,
            descrizione: string
        }
    },
    settore: {
        _id: string,
        codice: string,
        descrizione: string
    }

    stipendioRAL: number,

}