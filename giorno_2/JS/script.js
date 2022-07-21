var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var arrayUsers = [];
//SUPER CLASS
var Tipologia;
(function (Tipologia) {
    Tipologia["M"] = "mother";
    Tipologia["S"] = "son";
})(Tipologia || (Tipologia = {}));
var Conto = /** @class */ (function () {
    function Conto(name, type) {
        this.allDeposits = [];
        this.allWithdrawals = [];
        this.name = name;
        this.type = type;
        this.saldo = 100;
        this.allDeposits = [];
        this.allWithdrawals = [];
    }
    Conto.prototype.getName = function () {
        return this.name;
    };
    Conto.prototype.getSaldo = function () {
        return this.saldo;
    };
    Conto.prototype.withdraw = function (amount) {
        var dep = amount;
        if (this.saldo - amount > 0) {
            this.saldo = this.saldo - amount;
            this.allWithdrawals.push(dep);
        }
        else {
            alert("ERRORE! L'operazione porterebbe il saldo in negativo");
        }
        console.log("Prelevati " + amount + " sul tuo conto ora il saldo è: " + this.saldo);
    };
    Conto.prototype.deposit = function (amount) {
        this.saldo = this.saldo + amount;
        this.allDeposits.push(amount);
        console.log("Depositati " + amount + " sul tuo conto ora il saldo è: " + this.saldo);
    };
    Conto.prototype.getAllDeposits = function () {
        return this.allDeposits;
    };
    return Conto;
}());
//EXTENDS
var SonAccount = /** @class */ (function (_super) {
    __extends(SonAccount, _super);
    function SonAccount(name) {
        return _super.call(this, name, Tipologia.S) || this;
    }
    return SonAccount;
}(Conto));
var MotherAccount = /** @class */ (function (_super) {
    __extends(MotherAccount, _super);
    function MotherAccount(name) {
        return _super.call(this, name, Tipologia.M) || this;
    }
    MotherAccount.prototype.getAllInterest = function () {
        var arrForInterest = [];
        var sumOfDep = this.allDeposits.reduce(function (sum, dep) { return sum + dep; });
        var sumOfWith = this.allWithdrawals.reduce(function (a, b) { return a + b; });
        arrForInterest.push(sumOfDep);
        arrForInterest.push(sumOfWith);
        arrForInterest.reduce(function (sum, dep) { return sum + dep; });
        console.log("interesse totale: " + arrForInterest);
        return arrForInterest[0] * 10 / 100;
    };
    MotherAccount.prototype.deposit = function (amount) {
        _super.prototype.deposit.call(this, amount);
        this.payInterest(amount);
    };
    MotherAccount.prototype.withdraw = function (amount) {
        var dep = amount;
        if (this.saldo - amount > 0) {
            this.saldo = this.saldo - amount;
            this.allWithdrawals.push(dep);
            this.payInterest(amount);
            console.log("Prelevati " + amount + " sul tuo conto ora il saldo è: " + this.saldo + " euro al netto dell'interesse");
        }
        else {
            alert("ERRORE! L'operazione porterebbe il saldo in negativo");
        }
    };
    MotherAccount.prototype.payInterest = function (amount) {
        var int = (amount * 10) / 100;
        this.saldo = this.saldo - int;
        console.log("pagato interesse di " + int + " euro calcolato sulla transazione di " + amount);
    };
    return MotherAccount;
}(Conto));
;
//ISTANZE
var sonAccount = new SonAccount("sonAccount");
arrayUsers.push(sonAccount);
var motherAccount = new MotherAccount("motherAccount");
arrayUsers.push(motherAccount);
//DISPLAY 
var DisplayUsers = /** @class */ (function () {
    function DisplayUsers(array) {
        this.array = array;
    }
    DisplayUsers.prototype.displayUsers = function () {
        this.array.forEach(function (e) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML = e.name;
            var td2 = document.createElement("td");
            td2.innerHTML = e.type;
            var td3 = document.createElement("td");
            td3.innerHTML = e.saldo.toString();
            var td4 = document.createElement("td");
            var buttonDep = document.createElement("button");
            buttonDep.id = "deposit";
            buttonDep.innerHTML = "Deposit";
            var buttonWith = document.createElement("button");
            buttonWith.id = "withdraw";
            buttonWith.innerHTML = "Withdraw";
            td4.append(buttonDep, buttonWith);
            tr.append(td1, td2, td3, td4);
            var body = document.querySelector("tbody");
            body.append(tr);
            var c1 = true;
            var c2 = true;
            buttonDep.addEventListener("click", function () {
                if (c1) {
                    var inputDep_1 = document.createElement("input");
                    inputDep_1.type = "text";
                    inputDep_1.placeholder = "Deposit";
                    var buttonOk = document.createElement("button");
                    buttonOk.innerHTML = "OK";
                    td4.append(inputDep_1, buttonOk);
                    buttonOk.addEventListener("click", function () {
                        var value = inputDep_1.value;
                        console.log(e.saldo);
                        e.deposit(parseInt(value));
                        td3.innerHTML = e.getSaldo().toString();
                    });
                    c1 = false;
                }
            });
            buttonWith.addEventListener("click", function () {
                if (c2) {
                    var inputWith_1 = document.createElement("input");
                    inputWith_1.type = "text";
                    inputWith_1.placeholder = "Withdraw";
                    var buttonOk = document.createElement("button");
                    buttonOk.innerHTML = "OK";
                    td4.append(inputWith_1, buttonOk);
                    buttonOk.addEventListener("click", function () {
                        var value = inputWith_1.value;
                        e.withdraw(parseInt(value));
                        td3.innerHTML = e.getSaldo().toString();
                    });
                }
                c2 = false;
            });
        });
    };
    return DisplayUsers;
}());
//RICHIAMO FUNZIONE DISPLAY
var users = new DisplayUsers(arrayUsers);
users.displayUsers();
