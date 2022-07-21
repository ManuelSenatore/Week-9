//1- creare interface per la classe astratta (prop e metodi che dovra avere)

//2- creare la classe astratta e definire assegnazione delle proprietà che possiamo inizializzare e i metodi che sappiamo come lavorano, gli altri astratti

//3- creare tre sottoclassi commerciante libero professionista e dipendente specificando props e metodi specifici (polimorfismo su metodi della superclasse, definizione dei metodi astratti, se necessario definizione di nuovi metodi e prop)

//4 - calcolare in output le tasse per i 3 lavoratori

//codred - precentuale per il calcolo dell'utile utile tasse reddito annuo lordo * 20/100

// tassaInps  utile tasse * 35/100
// tassaIrpef utile tasse * 10/100
// reddito annuo netto - tasse inps e/o tasso irpef (meno una o entrambe le tasse)
// reddito annuo lorodo unico parametro
let lavoratori:(Commerciante | LiberoProfessionista | Dipendente)[] = []

interface tasse{
    redditoannuolordo:number
    getUtileTasse():number 
    getTasseInps():number
    getTasseInps():number
    getRedditoAnnuoNetto():number
}


abstract class Lavoratore implements tasse{
    codred:number
    tasseinps:number
    tasseirpef:number
    constructor(public redditoannuolordo:number){}

    getUtileTasse(){
        return this.redditoannuolordo * this.codred 
        
    } 
    getTasseInps(){
       return  this.redditoannuolordo * this.tasseinps   
    }
    
    getTasseIrpef():number{
        if(this.redditoannuolordo <= 15000){
           return this.redditoannuolordo * 23/100

         } else if (this.redditoannuolordo <= 28000){
            return this.redditoannuolordo * 27/100

         } else {
            return this.redditoannuolordo * 38/100
         } 
    }

     abstract getRedditoAnnuoNetto():number

}

class Commerciante extends Lavoratore{

    constructor(redditoannuolordo:number, tasseinps:number, codred:number){
        super(redditoannuolordo)
        this.tasseinps = tasseinps
        this.codred = codred 

    } 

    getRedditoAnnuoNetto():number{
         return (this.redditoannuolordo * this.tasseinps) * this.codred
        
    }
}

class LiberoProfessionista extends Lavoratore{
    
    constructor(redditoannuolordo:number, tasseinps:number, codred:number ){
        super(redditoannuolordo)
        this.tasseinps = tasseinps
        this.codred = codred
       
    } 
    getRedditoAnnuoNetto():number{
         return   (this.redditoannuolordo * this.getTasseIrpef()) * this.tasseinps
        
    
}
}
class Dipendente extends Lavoratore{
    constructor(redditoannuolordo:number, tasseinps:number, codred:number){
        super(redditoannuolordo)
        this.tasseinps = tasseinps
        this.codred = codred 
    }
    getRedditoAnnuoNetto():number{
        return this.redditoannuolordo -(this.redditoannuolordo * this.getTasseIrpef())
         
    }
}

let commerciante = new Commerciante(45000, 20/100, 10/100)
lavoratori.push(commerciante)
let liberoprofessionista = new LiberoProfessionista(55000, 20/100, 10/100)
lavoratori.push(liberoprofessionista)
let dipendente = new Dipendente(15000, 20/100, 10/100)
lavoratori.push(dipendente)
console.log(dipendente.getRedditoAnnuoNetto())

class DisplayUsers{
    array: (Commerciante | LiberoProfessionista | Dipendente)[]
    constructor(array: (Commerciante | LiberoProfessionista | Dipendente)[]){
        this.array = array
    }
    displayUsers(){
        this.array.forEach(function(e){
            let riga = document.createElement("tr")
            let c = document.createElement("td")
            let t = document.createElement("td")
            c.innerHTML = e.redditoannuolordo.toString()
             t.innerHTML = e.getRedditoAnnuoNetto().toString()
            let table = document.getElementById("table")! 
            table.append(riga)
            riga.append(c, t)
        })
    }
}

let users = new DisplayUsers(lavoratori)
 users.displayUsers()


