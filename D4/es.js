var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var url = "./abbigliamento.json";
var Abbigliamento = /** @class */ (function () {
    function Abbigliamento(id, collezione, capo, modello, quantità, colore, prezzoivaesclusa, prezzoivainclusa, disponibile, saldo) {
        this.id = id;
        this.collezione = collezione;
        this.capo = capo;
        this.modello = modello;
        this.quantità = quantità;
        this.colore = colore;
        this.prezzoivaesclusa = prezzoivaesclusa;
        this.prezzoivainclusa = prezzoivainclusa;
        this.disponibile = disponibile;
        this.saldo = saldo;
    }
    Abbigliamento.prototype.getSaldoCapo = function () {
        return this.prezzoivainclusa * (this.saldo / 100);
    };
    Abbigliamento.prototype.getAcquistoCapo = function () {
        return (this.prezzoivainclusa - this.getSaldoCapo()).toFixed();
    };
    return Abbigliamento;
}());
function Acquisti() {
    return __awaiter(this, void 0, void 0, function () {
        var capi, response, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    capi = [];
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    res = _a.sent();
                    res.forEach(function (e) {
                        capi.push(new Abbigliamento(e.id, e.collezione, e.capo, e.modello, e.quantità, e.colore, e.prezzoivaesclusa, e.prezzoivainclusa, e.disponibile, e.saldo));
                    });
                    console.log(capi);
                    capi.forEach(function (e) {
                        var body = document.querySelector('#body');
                        var card = document.createElement("div");
                        var info = document.createElement("div");
                        var btn = document.createElement("button");
                        btn.innerHTML = "Prezzo Scontato";
                        var toggle = true;
                        btn.addEventListener("click", function () {
                            if (toggle == true) {
                                var prezzoScontato = document.createElement("div");
                                prezzoScontato.innerHTML = "<p>Il capo scontato costa ".concat(e.getAcquistoCapo(), "\u20AC</p>");
                                card.append(prezzoScontato);
                                toggle = false;
                            }
                        });
                        info.innerHTML = "<h2>".concat(e.capo.toUpperCase(), "</h2> <p>Collezione: ").concat(e.collezione, "</p> <p>Colore: ").concat(e.colore, "</p> <p>Prezzo: ").concat(e.prezzoivainclusa, "\u20AC</p> <p>Sconto: ").concat(e.saldo, "%</p> ");
                        body.append(card);
                        card.append(info, btn);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
Acquisti();
//  let res = await fetch(url).then(res=>res.json()).then((res)=>{
//     capi = res
//     capi.forEach((e) => {
//         capi.push(new Abbigliamento(e.id, e.collezione, e.capo, e.modello, e.quantità, e.colore, e.prezzoivaesclusa, e.prezzoivainclusa, e.disponibile, e.saldo ))
//     });
// })
