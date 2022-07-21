let arrayUsers:Conto[] = [];
//SUPER CLASS
enum Tipologia {
    M = "mother",
    S = "son"
}
class Conto {
    name: string
    saldo: number
    type : string
    allDeposits:number[] = []
    allWithdrawals: number[] = []
    constructor(name: string, type:Tipologia) {
        this.name = name;
        this.type = type;
        this.saldo = 100;
        this.allDeposits = [];
        this.allWithdrawals = [];

    }

    getName():string {
        return this.name;
    }
    getSaldo():number {
        return this.saldo;
    }
    withdraw(amount:number) {
        let dep = amount;

        if(this.saldo - amount > 0){
            this.saldo = this.saldo - amount;
            this.allWithdrawals.push(dep);
            
        } else {
            alert("ERRORE! L'operazione porterebbe il saldo in negativo");
        }
        console.log("Prelevati " + amount + " sul tuo conto ora il saldo è: " + this.saldo)
        

    }
    deposit(amount:number) {
        this.saldo = this.saldo + amount;
        this.allDeposits.push(amount);

        console.log("Depositati " + amount + " sul tuo conto ora il saldo è: " + this.saldo)
       
    }
    getAllDeposits(){
        return this.allDeposits;
    }

     
}
//EXTENDS
class SonAccount extends Conto {
    constructor(name:string) {
        super(name, Tipologia.S);
    }
    
}
class MotherAccount extends Conto {
    constructor(name:string) {
        super(name, Tipologia.M);
    }
    getAllInterest():number {
        let arrForInterest = [];
        let sumOfDep = this.allDeposits.reduce((sum,dep) => sum + dep);
        let sumOfWith = this.allWithdrawals.reduce((a,b) => a + b);
        arrForInterest.push(sumOfDep)
        arrForInterest.push(sumOfWith);
        arrForInterest.reduce((sum,dep) => sum + dep);
        console.log("interesse totale: " + arrForInterest);
        return arrForInterest[0] * 10 / 100;
        
    }
    deposit(amount:number) {
        super.deposit(amount);
        this.payInterest(amount);
    }
    withdraw(amount: number) {

        let dep = amount;

        if(this.saldo - amount > 0){
            this.saldo = this.saldo - amount;
            this.allWithdrawals.push(dep);
            this.payInterest(amount);

            console.log("Prelevati " + amount + " sul tuo conto ora il saldo è: " + this.saldo + " euro al netto dell'interesse")
            
        } else {
            alert("ERRORE! L'operazione porterebbe il saldo in negativo");
        }
        
        
    }
        
    payInterest(amount:number) {
        let int = (amount * 10) / 100;
        this.saldo = this.saldo - int;
        console.log("pagato interesse di " + int + " euro calcolato sulla transazione di " + amount)
    }

    
};

//ISTANZE
let sonAccount = new SonAccount("sonAccount");
arrayUsers.push(sonAccount);
let motherAccount = new MotherAccount("motherAccount");
arrayUsers.push(motherAccount);


//DISPLAY 
class DisplayUsers {
    array:(Conto)[]
    constructor(array: (Conto)[]) {
        this.array = array;
    }
    displayUsers(){
        this.array.forEach(e => {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
                td1.innerHTML = e.name;
            let td2 = document.createElement("td");
                td2.innerHTML = e.type;
            let td3 = document.createElement("td");
                td3.innerHTML = e.saldo.toString();
            let td4 = document.createElement("td");
                let buttonDep = document.createElement("button");
                    buttonDep.id = "deposit";
                    buttonDep.innerHTML = "Deposit"
                let buttonWith = document.createElement("button");
                    buttonWith.id = "withdraw";
                    buttonWith.innerHTML = "Withdraw"
                    
                td4.append(buttonDep, buttonWith);
            
            tr.append(td1, td2, td3, td4);
        let body = document.querySelector("tbody")!
            body.append(tr);
            let c1 = true;
            let c2 = true;
    
            buttonDep.addEventListener("click", () => {
                if (c1) {
                    let inputDep = document.createElement("input");
                        inputDep.type = "text";
                        inputDep.placeholder = "Deposit";

                    let buttonOk = document.createElement("button");
                        buttonOk.innerHTML = "OK";
                    td4.append(inputDep, buttonOk);

                    buttonOk.addEventListener("click", () => {
                        let value = inputDep.value;
                        console.log(e.saldo);
                        e.deposit(parseInt(value));
                        td3.innerHTML = e.getSaldo().toString();
                    });
                    c1 = false;
                }
            
            })
            buttonWith.addEventListener("click", () => {
                if (c2) {
                    let inputWith = document.createElement("input");
                        inputWith.type = "text";
                        inputWith.placeholder = "Withdraw";
                        
                    let buttonOk = document.createElement("button");
                        buttonOk.innerHTML = "OK";
                    td4.append(inputWith, buttonOk);

                    buttonOk.addEventListener("click", () => {
                        let value = inputWith.value;
                        e.withdraw(parseInt(value));
                        td3.innerHTML = e.getSaldo().toString();
                    })
                }

                c2 = false;
            })

        })
    }
}

//RICHIAMO FUNZIONE DISPLAY
let users = new DisplayUsers(arrayUsers);
    users.displayUsers();


