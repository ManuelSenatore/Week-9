let url = "./abbigliamento.json"

class Abbigliamento {
 constructor(public id:number, public collezione:string, public capo:string, public modello:string, public quantità: number, public colore:number, public prezzoivaesclusa:number, public prezzoivainclusa:number, public disponibile:string, public saldo:number){

 }
 getSaldoCapo(){
    return this.prezzoivainclusa * (this.saldo / 100)
 }

 getAcquistoCapo(){
   return (this.prezzoivainclusa - this.getSaldoCapo()).toFixed() 
 }
}

async function Acquisti(){
    let capi:Abbigliamento[] = [];

    let response = await fetch(url)
    let res = await response.json();
    
         res.forEach((e:Abbigliamento) => {
            capi.push(new Abbigliamento(e.id, e.collezione, e.capo, e.modello, e.quantità, e.colore, e.prezzoivaesclusa, e.prezzoivainclusa, e.disponibile, e.saldo ))} 
           )
             console.log(capi);
             capi.forEach((e)=> {
                let body = document.querySelector('#body')!;
                let card = document.createElement("div");
                let info = document.createElement("div");
                let btn = document.createElement("button");
                btn.innerHTML = "Prezzo Scontato"
                let toggle = true
                btn.addEventListener("click", function (){  
                    if(toggle == true){
                    let prezzoScontato = (document.createElement("div") as HTMLElement);
                   prezzoScontato.innerHTML = `<p>Il capo scontato costa ${e.getAcquistoCapo()}€</p>`
                   card.append(prezzoScontato)
                   toggle = false
                    }                 
               
                   
                })

                info.innerHTML = `<h2>${e.capo.toUpperCase()}</h2> <p>Collezione: ${e.collezione}</p> <p>Colore: ${e.colore}</p> <p>Prezzo: ${e.prezzoivainclusa}€</p> <p>Sconto: ${e.saldo}%</p> `
                body.append(card)
                card.append(info, btn)
            

             })
             
}
Acquisti()


 //  let res = await fetch(url).then(res=>res.json()).then((res)=>{
    //     capi = res
    //     capi.forEach((e) => {
    //         capi.push(new Abbigliamento(e.id, e.collezione, e.capo, e.modello, e.quantità, e.colore, e.prezzoivaesclusa, e.prezzoivainclusa, e.disponibile, e.saldo ))
    //     });
    // })
