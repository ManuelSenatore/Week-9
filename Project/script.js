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
var users = [];
var contrattoTelefonico = /** @class */ (function () {
    function contrattoTelefonico(name, carica, numeroChiamate) {
        this.name = name;
        this.carica = carica;
        this.numeroChiamate = numeroChiamate;
        this.interval;
    }
    contrattoTelefonico.prototype.Ricarica = function (n) {
        //ricarica il telefono
        this.carica += n;
    };
    contrattoTelefonico.prototype.Chiamata = function (timer) {
        this.minuti = 0;
        var s = 0, m = 0, h = 0;
        // chiamata di n minuti 
        // aggiornare la carica disponibile -0,20 cent al minuto
        // incrementare la memoria di numeroChiamate
        var thisElement = this;
        this.interval = setInterval(function () {
            timer.innerHTML = 'Chiamata in corso: ' + m + " min " + s + " sec";
            s++;
            if (s == 60) {
                m++;
                s = 0;
                thisElement.minuti++;
            }
            if (m == 60) {
                h++;
                m = 0;
            }
        }, 1000);
        this.numeroChiamate = this.numeroChiamate + 1;
    };
    contrattoTelefonico.prototype.chiudiChiamata = function (scattoRisposta) {
        clearInterval(this.interval);
        this.carica = this.carica - scattoRisposta;
        console.log(this.carica, this.minuti);
        this.carica = this.carica - (this.minuti * 0.2);
    };
    contrattoTelefonico.prototype.numero404 = function () {
        // restituisce valore della carica disponibile
        console.log(this.carica);
        return this.carica;
    };
    contrattoTelefonico.prototype.getNumeroChiamate = function () {
        // restituisce il valore di numeroChiamate
        return this.numeroChiamate;
    };
    contrattoTelefonico.prototype.azzeraChiamate = function () {
        // azzera numeroChiamate
        this.numeroChiamate = 0;
    };
    return contrattoTelefonico;
}());
var FirstUser = /** @class */ (function (_super) {
    __extends(FirstUser, _super);
    function FirstUser(name, carica, numeroChiamate) {
        var _this = _super.call(this, name, carica, numeroChiamate) || this;
        _this.name = name;
        _this.carica = carica;
        _this.numeroChiamate = numeroChiamate;
        return _this;
    }
    return FirstUser;
}(contrattoTelefonico));
var SecondUser = /** @class */ (function (_super) {
    __extends(SecondUser, _super);
    function SecondUser(name, carica, numeroChiamate) {
        var _this = _super.call(this, name, carica, numeroChiamate) || this;
        _this.name = name;
        _this.carica = carica;
        _this.numeroChiamate = numeroChiamate;
        return _this;
    }
    return SecondUser;
}(contrattoTelefonico));
var ThirdUser = /** @class */ (function (_super) {
    __extends(ThirdUser, _super);
    function ThirdUser(name, carica, numeroChiamate) {
        var _this = _super.call(this, name, carica, numeroChiamate) || this;
        _this.name = name;
        _this.carica = carica;
        _this.numeroChiamate = numeroChiamate;
        return _this;
    }
    return ThirdUser;
}(contrattoTelefonico));
var user1 = new FirstUser("Marco", 5.00, 0);
users.push(user1);
var user2 = new SecondUser("Elisa", 5.00, 0);
users.push(user2);
var user3 = new ThirdUser("Antonella", 5.00, 0);
users.push(user3);
users.forEach(function (e) {
    var body = document.querySelector("body");
    var divinfo = document.createElement("div");
    divinfo.classList.add("card");
    // divinfo.innerHTML = `<h2>Utente: ${e.name}</h2> <p><bold>Credito disponibile: ${e.carica}€</bold></p> <p><bold>Chiamate effettuate: ${e.numeroChiamate}</bold></p>`  
    var utente = document.createElement("div");
    utente.innerHTML = "<h2>Utente: ".concat(e.name, "</h2>");
    var credito = document.createElement("div");
    credito.innerHTML = "<p><bold>Credito: ".concat(e.carica, "\u20AC</bold></p>");
    var chiamate = document.createElement("div");
    chiamate.innerHTML = "<p><bold>Chiamate: ".concat(e.numeroChiamate, "</bold></p>");
    var btnRicarica = document.createElement("button");
    var btnChiamata = document.createElement("button");
    var btnChiudi = document.createElement("button");
    var btnAzzeraChiamata = document.createElement("button");
    btnRicarica.innerHTML = "Effettua Ricarica";
    btnChiamata.innerHTML = "Effettua Chiamata";
    btnChiudi.innerHTML = "Chiudi Chiamata";
    btnChiamata.disabled = false; // attivo bottone
    btnChiudi.disabled = true; // disattivo bottone
    btnAzzeraChiamata.innerHTML = "Azzera Chiamate";
    var divBtn = document.createElement("div");
    divBtn.classList.add("btn");
    divBtn.append(btnRicarica, btnChiamata, btnChiudi, btnAzzeraChiamata);
    body.append(divinfo);
    divinfo.append(utente, credito, chiamate, divBtn);
    var c1 = true;
    var c2 = true;
    var c3 = true;
    var timer = document.createElement("div");
    btnRicarica.addEventListener("click", function () {
        if (c1) {
            var input_1 = document.createElement("input");
            input_1.type = "text";
            input_1.placeholder = "Credito";
            var buttonOk = document.createElement("button");
            buttonOk.innerHTML = "OK";
            divinfo.append(input_1, buttonOk);
            buttonOk.addEventListener("click", function () {
                var value = input_1.value;
                e.Ricarica(parseInt(value));
                credito.innerHTML = "Credito Residuo: ".concat(e.numero404().toString(), "\u20AC");
            });
            c1 = false;
        }
    });
    btnChiamata.addEventListener("click", function () {
        if (e.carica > 0) {
            divinfo.append(timer);
            e.Chiamata(timer);
            chiamate.innerHTML = "Chiamate effettuate: ".concat(e.getNumeroChiamate().toString());
            btnChiamata.disabled = true;
            btnChiudi.disabled = false;
        }
        else {
            alert("Credito insufficiente. Fare Ricarica!");
        }
    });
    btnChiudi.addEventListener("click", function () {
        e.chiudiChiamata(0.50);
        credito.innerHTML = "Credito Residuo: ".concat(e.numero404(), "\u20AC");
        timer.innerHTML = "";
        btnChiudi.disabled = true;
        btnChiamata.disabled = false;
    });
    btnAzzeraChiamata.addEventListener("click", function () {
        e.azzeraChiamate();
        chiamate.innerHTML = "Chiamate effettuate: ".concat(e.getNumeroChiamate().toString());
    });
});
