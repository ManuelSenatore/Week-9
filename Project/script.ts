let users: contrattoTelefonico[] = []
interface Smartphone {
    name:string // name of the users
    carica:number // euro per le chiamate
    numeroChiamate:number // numero chiamate effettuate
}

abstract class contrattoTelefonico implements Smartphone{
     interval:number
     minuti:number
    constructor(public name:string, public carica:number,public numeroChiamate:number){
     this.interval    
    }
    
     Ricarica(n):void{
        //ricarica il telefono
         this.carica += n;
    }

    Chiamata(timer){
        this.minuti = 0
        let s = 0, m = 0, h = 0;
        // chiamata di n minuti 
        // aggiornare la carica disponibile -0,20 cent al minuto
        // incrementare la memoria di numeroChiamate
         let thisElement = this
         this.interval =  setInterval(function () {
              timer.innerHTML = 'Chiamata in corso: ' + m + " min " + s + " sec";
                s++;
                if (s == 60) {
                    m++;
                    s = 0;
                    thisElement.minuti ++
                }
                if (m == 60) {
                    h++;
                    m = 0;
                }
            }, 1000);
             this.numeroChiamate = this.numeroChiamate +1     
    }
     chiudiChiamata(scattoRisposta:number){
            clearInterval(this.interval); 

            this.carica = this.carica - scattoRisposta;
            console.log(this.carica, this.minuti);           
            this.carica = this.carica - (this.minuti * 0.2)      
       }  

    numero404():number{
        // restituisce valore della carica disponibile
        console.log( this.carica);
        
        return this.carica; 
    }
    getNumeroChiamate(){
        // restituisce il valore di numeroChiamate
        return this.numeroChiamate
    }
    azzeraChiamate():void{
        // azzera numeroChiamate
         this.numeroChiamate = 0
    }
}

class FirstUser extends contrattoTelefonico{
    constructor(public name:string, public carica:number,public numeroChiamate:number){
        super(name, carica, numeroChiamate);
    }
}

class SecondUser extends contrattoTelefonico{
    constructor(public name:string, public carica:number,public numeroChiamate:number){
        super(name, carica, numeroChiamate);
    }
}

class ThirdUser extends contrattoTelefonico{
    constructor(public name:string, public carica:number,public numeroChiamate:number){
        super(name, carica, numeroChiamate);
    }
}
let user1 = new FirstUser("Marco", 5.00, 0  );
users.push(user1);
let user2 = new SecondUser("Elisa", 5.00, 0  );
users.push(user2);
let user3 = new ThirdUser("Antonella", 5.00, 0  );
users.push(user3);

users.forEach( (e) => {
    let body = document.querySelector("body")!;
    let divinfo = document.createElement("div");
    divinfo.classList.add("card")
    // divinfo.innerHTML = `<h2>Utente: ${e.name}</h2> <p><bold>Credito disponibile: ${e.carica}€</bold></p> <p><bold>Chiamate effettuate: ${e.numeroChiamate}</bold></p>`  
    let utente = document.createElement("div")
    utente.innerHTML = `<h2>Utente: ${e.name}</h2>`
    let credito = document.createElement("div")
    credito.innerHTML = `<p><bold>Credito: ${e.carica}€</bold></p>`
    let chiamate = document.createElement("div")
    chiamate.innerHTML = `<p><bold>Chiamate: ${e.numeroChiamate}</bold></p>`
    let btnRicarica = document.createElement("button");
    let btnChiamata = document.createElement("button");
    let btnChiudi = document.createElement("button");
    let btnAzzeraChiamata = document.createElement("button");
    btnRicarica.innerHTML = "Effettua Ricarica"
    btnChiamata.innerHTML = "Effettua Chiamata"
    btnChiudi.innerHTML = "Chiudi Chiamata"
    btnChiamata.disabled = false // attivo bottone
    btnChiudi.disabled = true   // disattivo bottone
    btnAzzeraChiamata.innerHTML = "Azzera Chiamate"
    let divBtn = document.createElement("div");
    divBtn.classList.add("btn");
    divBtn.append(btnRicarica, btnChiamata, btnChiudi, btnAzzeraChiamata)
    body.append(divinfo);
    divinfo.append(utente, credito, chiamate, divBtn)
    let c1:boolean = true
    let c2:boolean = true
    let c3:boolean = true
    let timer = document.createElement("div")
    btnRicarica.addEventListener("click", () => {
        if(c1){
        let input = document.createElement("input"); 
        input.type = "text"
        input.placeholder = "Credito"
        let buttonOk = document.createElement("button"); 
        buttonOk.innerHTML = "OK"
        divinfo.append(input, buttonOk)
        buttonOk.addEventListener("click", () => {
            let value = input.value
            e.Ricarica(parseInt(value))
            credito.innerHTML = `Credito Residuo: ${e.numero404().toString()}€`
            
        });
        c1 = false
        }    
    })
    btnChiamata.addEventListener("click", () => {  
        if(e.carica > 0) {
                    divinfo.append(timer)       
           e.Chiamata(timer)
           chiamate.innerHTML = `Chiamate effettuate: ${e.getNumeroChiamate().toString()}`
           btnChiamata.disabled = true
           btnChiudi.disabled = false
        } else {
            alert("Credito insufficiente. Fare Ricarica!")
        }

    })

    btnChiudi.addEventListener("click", () => {

             e.chiudiChiamata(0.50)
            credito.innerHTML = `Credito Residuo: ${e.numero404()}€`
            timer.innerHTML = "" 
            btnChiudi.disabled = true
            btnChiamata.disabled = false
        }
    )
    btnAzzeraChiamata.addEventListener("click", () => {
        e.azzeraChiamate()
        chiamate.innerHTML = `Chiamate effettuate: ${e.getNumeroChiamate().toString()}`

    })
})
