//1- creare interface per la classe astratta (prop e metodi che dovra avere)
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
//2- creare la classe astratta e definire assegnazione delle proprietà che possiamo inizializzare e i metodi che sappiamo come lavorano, gli altri astratti
//3- creare tre sottoclassi commerciante libero professionista e dipendente specificando props e metodi specifici (polimorfismo su metodi della superclasse, definizione dei metodi astratti, se necessario definizione di nuovi metodi e prop)
//4 - calcolare in output le tasse per i 3 lavoratori
//codred - precentuale per il calcolo dell'utile utile tasse reddito annuo lordo * 20/100
// tassaInps  utile tasse * 35/100
// tassaIrpef utile tasse * 10/100
// reddito annuo netto - tasse inps e/o tasso irpef (meno una o entrambe le tasse)
// reddito annuo lorodo unico parametro
var lavoratori = [];
var Lavoratore = /** @class */ (function () {
    function Lavoratore(redditoannuolordo) {
        this.redditoannuolordo = redditoannuolordo;
    }
    Lavoratore.prototype.getUtileTasse = function () {
        return this.redditoannuolordo * this.codred;
    };
    Lavoratore.prototype.getTasseInps = function () {
        return this.redditoannuolordo * this.tasseinps;
    };
    Lavoratore.prototype.getTasseIrpef = function () {
        if (this.redditoannuolordo <= 15000) {
            return this.redditoannuolordo * 23 / 100;
        }
        else if (this.redditoannuolordo <= 28000) {
            return this.redditoannuolordo * 27 / 100;
        }
        else {
            return this.redditoannuolordo * 38 / 100;
        }
    };
    return Lavoratore;
}());
var Commerciante = /** @class */ (function (_super) {
    __extends(Commerciante, _super);
    function Commerciante(redditoannuolordo, tasseinps, codred) {
        var _this = _super.call(this, redditoannuolordo) || this;
        _this.tasseinps = tasseinps;
        _this.codred = codred;
        return _this;
    }
    Commerciante.prototype.getRedditoAnnuoNetto = function () {
        return (this.redditoannuolordo * this.tasseinps) * this.codred;
    };
    return Commerciante;
}(Lavoratore));
var LiberoProfessionista = /** @class */ (function (_super) {
    __extends(LiberoProfessionista, _super);
    function LiberoProfessionista(redditoannuolordo, tasseinps, codred) {
        var _this = _super.call(this, redditoannuolordo) || this;
        _this.tasseinps = tasseinps;
        _this.codred = codred;
        return _this;
    }
    LiberoProfessionista.prototype.getRedditoAnnuoNetto = function () {
        return (this.redditoannuolordo * this.getTasseIrpef()) * this.tasseinps;
    };
    return LiberoProfessionista;
}(Lavoratore));
var Dipendente = /** @class */ (function (_super) {
    __extends(Dipendente, _super);
    function Dipendente(redditoannuolordo, tasseinps, codred) {
        var _this = _super.call(this, redditoannuolordo) || this;
        _this.tasseinps = tasseinps;
        _this.codred = codred;
        return _this;
    }
    Dipendente.prototype.getRedditoAnnuoNetto = function () {
        return this.redditoannuolordo - (this.redditoannuolordo * this.getTasseIrpef());
    };
    return Dipendente;
}(Lavoratore));
var commerciante = new Commerciante(45000, 20 / 100, 10 / 100);
lavoratori.push(commerciante);
var liberoprofessionista = new LiberoProfessionista(55000, 20 / 100, 10 / 100);
lavoratori.push(liberoprofessionista);
var dipendente = new Dipendente(15000, 20 / 100, 10 / 100);
lavoratori.push(dipendente);
console.log(dipendente.getRedditoAnnuoNetto());
var DisplayUsers = /** @class */ (function () {
    function DisplayUsers(array) {
        this.array = array;
    }
    DisplayUsers.prototype.displayUsers = function () {
        this.array.forEach(function (e) {
            var riga = document.createElement("tr");
            var c = document.createElement("td");
            var t = document.createElement("td");
            c.innerHTML = e.redditoannuolordo.toString();
            t.innerHTML = e.getRedditoAnnuoNetto().toString();
            var table = document.getElementById("table");
            table.append(riga);
            riga.append(c, t);
        });
    };
    return DisplayUsers;
}());
var users = new DisplayUsers(lavoratori);
users.displayUsers();
