import { Settore } from './settore';
import { Regione, Provincia, Comune } from './place';


export class Risorsa {
    _id: string = "";
    nome: string = "";
    cognome: string = "";
    dataNascita: string = "";
    settore: Settore = null;
    stipendioRAL: number = 0;
    residenza: {
        regione: Regione,
        provincia: Provincia,
        comune: Comune
    };

    public static getEta(risorsa: Risorsa) {
        let timeDiff = (Date.now() - new Date(risorsa.dataNascita).getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        return Math.max(0, age);
    };

    constructor() {
        this.residenza = {
            regione: null,
            provincia: null,
            comune: null
        }
    }



}



