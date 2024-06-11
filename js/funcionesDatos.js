const nombrePokemon = document.getElementById("nombrePokemon");
const idPokemon = document.getElementById("indexPokemon");
const imgPokemon = document.getElementById("imgPokemon");
const inputIDPokemon = document.getElementById("inputIDPokemon");
inputIDPokemon.value = 1;
const siguientePokemon = document.getElementById("siguientePok");
const anteriorPokemon = document.getElementById("anteriorPok");
const regionOriginal = document.getElementById("regionOriginal");
const juegosOriginales = document.getElementById("origenJuegos");
const pesoPokemon = document.getElementById("pesoPokemon");
const alturaPokemon = document.getElementById("alturaPokemon");
const saludPokemon = document.getElementById("vida");
const ataquePokemon = document.getElementById("attk");
const defensaPokemon = document.getElementById("def");
const velocidadPokemon = document.getElementById("vel");

const tiposPokemon = document.getElementById("tipos");

let idActual = 1;

const rellenarDatos = () =>{
    nombrePokemon.innerText = datosPokemon.name;
    idPokemon.innerText = datosPokemon.id;
    imgPokemon.src = datosPokemon.sprites.front_default;
    imgPokemon.alt = datosPokemon.name;
    pesoPokemon.innerText = datosPokemon.weight/10 + " kg";
    alturaPokemon.innerText = datosPokemon.height/10 + " m";
    if (datosPokemon.game_indices[0] !== undefined){
        let regex = /\/(\d+)\//;
        let URLVersion = xhr.response.game_indices[0].version.url;
        let indiceVersion = parseInt(URLVersion.match(regex)[1])
        peticionServidor(indiceVersion,"https://pokeapi.co/api/v2/version/");
    } else {
        regionOriginal.innerText = "???";
        juegosOriginales.innerText = "???";
    }

    saludPokemon.innerText = datosPokemon.stats[0].base_stat;
    ataquePokemon.innerText = datosPokemon.stats[1].base_stat;
    defensaPokemon.innerText = datosPokemon.stats[2].base_stat;
    velocidadPokemon.innerText = datosPokemon.stats[5].base_stat;

    tiposPokemon.innerHTML = "";

    for (const tipo of datosPokemon.types) {
        const cajaTipo = document.createElement("div");
        const nombreTipo =  tipo.type.name;
        cajaTipo.className = "cartaTitulo";
        let colorFondo;
        let colorTexto = "black";
        let tipoTraducido;

        switch (nombreTipo) {
            case "grass":
                colorTexto = "rgb(39,201,79)";
                colorFondo = "rgb(20,122,61)";
                tipoTraducido = "Hierba";
                break;
            case "poison":
                colorTexto = "rgb(154,104,216)";
                colorFondo = "rgb(93,45,136)";
                tipoTraducido = "Veneno";
                break;
            case "fire":
                colorTexto = "rgb(251,74,89)";
                colorFondo = "rgb(170,31,35)";
                tipoTraducido = "Fuego";
                break;
            case "water":
                colorTexto = "rgb(132,167,249)";
                colorFondo = "rgb(20,81,223)";
                tipoTraducido = "Agua";
                break;
            case "bug":
                colorTexto = "rgb(39,201,79)";
                colorFondo = "rgb(27,73,39)";
                tipoTraducido = "Bicho";
                break;
            case "electric":
                colorTexto = "rgb(249,248,113)";
                colorFondo = "rgb(222,223,42)";
                tipoTraducido = "Electrico";
                break;
            case "normal":
                colorTexto = "rgb(200,151,165)";
                colorFondo = "rgb(116,81,91)";
                tipoTraducido = "Normal";
                break;
            case "flying":
                colorTexto = "rgb(147,177,197)";
                colorFondo = "rgb(73,102,124)";
                tipoTraducido = "Volador";
                break;
            case "fighting":
                colorTexto = "rgb(238,97,57)";
                colorFondo = "rgb(152,63,37)";
                tipoTraducido = "Lucha";
                break;
            case "rock":
                colorTexto = "rgb(138,62,34)";
                colorFondo = "rgb(71,25,10)";
                tipoTraducido = "Roca";
                break;
            case "psychic":
                colorTexto = "rgb(245,29,145)";
                colorFondo = "rgb(164,42,107)";
                tipoTraducido = "Psiquico";
                break;
            case "steel":
                colorFondo = "rgb(95,116,109)";
                colorTexto = "rgb(66,188,147)";
                tipoTraducido = "Acero";
                break;
            case "ground":
                colorFondo = "rgb(167,111,45)";
                colorTexto = "rgb(109,72,31)";
                tipoTraducido = "Tierra";
                break;
            case "fairy":
                colorFondo = "rgb(149,26,68)";
                colorTexto = "rgb(232,19,103)";
                tipoTraducido = "Hada";
                break;
            case "ice":
                colorFondo = "rgb(133,208,244)";
                colorTexto = "rgb(214,238,248)";
                tipoTraducido = "Hielo";
                break;
            case "ghost":
                colorFondo = "rgb(51,51,106)";
                colorTexto = "rgb(143,102,144)";
                tipoTraducido = "Fantasma";
            break;
            case "dragon":
                colorFondo = "rgb(67,137,148)";
                colorTexto = "rgb(97,200,215)";
                tipoTraducido = nombreTipo;
                break;
            case "dark":
                colorFondo = "rgb(4,7,7)";
                colorTexto = "rgb(88,88,119)";
                tipoTraducido = "oscuro";
                break;
            default:
                colorFondo = "white";
                tipoTraducido = nombreTipo;
        }

        cajaTipo.innerText = tipoTraducido;
        cajaTipo.style.color = colorTexto;
        cajaTipo.style.backgroundColor = colorFondo;
        tiposPokemon.appendChild(cajaTipo);
    }

}

inputIDPokemon.onchange = () => {
    idActual = inputIDPokemon.value;
    setTimeout(peticionServidor(idActual), 500);
}

const incrementarPokemon = () => {
    if (idActual < inputIDPokemon.max){
        peticionServidor(++idActual);
        inputIDPokemon.value = idActual;
    }

};

const decrementarPokemon = () => {
    if (idActual > inputIDPokemon.min){
        peticionServidor(--idActual);
        inputIDPokemon.value = idActual;
    }
};

// Código sacado de:
// https://stackoverflow.com/questions/79816/need-javascript-code-for-button-press-and-hold

function holdit(btn, action, start, speedup) {
    var t;
    let velocidad = start;

    var repeat = function () {
        action();
        t = setTimeout(repeat, velocidad);
        velocidad = velocidad / speedup;
    }

    btn.addEventListener("mousedown", function() {
        repeat();
    });

    // Si no reinicio start

    btn.addEventListener("mouseup", function() {
        clearInterval(t);
        velocidad = start;
    });

    btn.addEventListener("mouseout", function() {
        clearInterval(t);
        velocidad = start;
    });
}

holdit(siguientePokemon, incrementarPokemon, 700, 2); // Ajusta el valor de start según tu preferencia
holdit(anteriorPokemon, decrementarPokemon, 700, 2); // Ajusta el valor de start según tu preferencia

imgPokemon.onclick = () => {
    let versionShiny = imgPokemon.src === datosPokemon.sprites.front_default;
    imgPokemon.src = (versionShiny ? datosPokemon.sprites.front_shiny : datosPokemon.sprites.front_default)
    imgPokemon.alt = datosPokemon.name + (versionShiny ? " shiny" : "")

}

// imgPokemon.onmouseenter = () => imgPokemon.src = datosPokemon.sprites.front_shiny;
// imgPokemon.onmouseleave = () => imgPokemon.src = datosPokemon.sprites.front_default;