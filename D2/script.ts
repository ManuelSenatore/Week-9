
// class sonAccount {
//     saldo:number
//     versamento:number
//     prelievo:number
//     constructor(saldo:number, versamento:number, prelievo:number) {
//         this.saldo = saldo
//         this.versamento = versamento
//         this.prelievo = prelievo
//     }
//     getVersamento():number {
//         return this.saldo + this.versamento    
//     }
//     getPrelievo():number {
//         return this.saldo - this.prelievo 
//     }
//     getBalance(): number{
//         return this.saldo - this.prelievo 
//     }
// }

// class motherAccount extends sonAccount {
//     private interesse:number
//     constructor(saldo:number, interesse:number, versamento:number, prelievo:number) {
//         super(saldo,  versamento, prelievo)
//         this.interesse = interesse
//     }
//     getVersamento(): number {
//         return this.saldo + (this.versamento - (this.versamento * this.interesse))
//     }
//     getPrelievo(): number {
//         return this.saldo - (this.prelievo - (this.interesse * this.interesse))
//     }
// }
// let figlio = new  sonAccount(450,0,300)
// let madre = new motherAccount(6000, 10/100, 200, 0)
// console.log(figlio);
// console.log(figlio.getBalance());

// console.log(madre);
// console.log(madre.getVersamento());



class Conto {
    private balaceInit:number
    intestatario: string
    saldo: number
    constructor(intestatario: string, saldo: number) {
        this.balaceInit = 0
        this.intestatario = intestatario
        this.saldo = this.balaceInit + saldo
    }
    getSaldo() {
        console.log(this.saldo+'euro')
    }
    versamento(transazione: number) {
        this.saldo = this.saldo + transazione;
        this.getSaldo()
    }
    prelievo(transazione: number) {
        if (transazione < this.saldo) {
            this.saldo = this.saldo - transazione;
            this.getSaldo()
        }else{console.log('credito insufficiente');
        }
    }
}

class ContoUnder18 extends Conto {
    constructor(intestatario: string, saldo: number) {
        super(intestatario, saldo)
    }
}

class ContoOver18 extends Conto {
    private interesse: number
    constructor(intestatario: string, saldo: number) {
        super(intestatario, saldo)
        this.interesse = 10
    }
    versamento(transazione: number) {
        this.saldo = this.saldo + transazione - (transazione * this.interesse) / 100;
        this.getSaldo()
    }
}

let contoMadre = new ContoOver18('Giglia', 7500)
let contoFiglio = new ContoUnder18('Rocco', 1200)


// operazioni madre
document.getElementById('prelievoMadre')!.addEventListener('click',function(){
    let inputMadre = (document.getElementById('inputMadre') as HTMLInputElement).value
    console.log(inputMadre);
    contoMadre.prelievo(parseInt(inputMadre));
})
document.getElementById('versamentoMadre')!.addEventListener('click',function(){
    let inputMadre = (document.getElementById('inputMadre') as HTMLInputElement).value
    console.log(inputMadre);

    contoMadre.versamento(parseInt(inputMadre));
})
// operazione figlio
document.getElementById('prelievoFiglio')!.addEventListener('click',function(){
    let inputFiglio = (document.getElementById('inputFiglio') as HTMLInputElement).value
    contoFiglio.prelievo(parseInt(inputFiglio));
})
document.getElementById('versamentoFiglio')!.addEventListener('click',function(){
    let inputFiglio = (document.getElementById('inputFiglio') as HTMLInputElement).value
    contoFiglio.versamento(parseInt(inputFiglio));
})