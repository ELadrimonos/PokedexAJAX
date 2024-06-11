let xhr = new XMLHttpRequest();
const url = 'https://pokeapi.co/api/v2/pokemon/';
let datosPokemon;
let datosRegion;
let datosSonDePokemon = true;
let datosSonDeRegion = false;
let datosGrupoVersiones = false;


xhr.onload = function() {
  if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
  } else { // muestra el resultado
      if (datosSonDePokemon){
          datosPokemon = xhr.response;
          rellenarDatos();
      } else if (datosSonDeRegion){
          let regex = /\/(\d+)\//;
          let URLGrupoVersiones = xhr.response.version_group.url;
          let indiceGrupoDeVersiones = parseInt(URLGrupoVersiones.match(regex)[1])
          peticionServidor( indiceGrupoDeVersiones,"https://pokeapi.co/api/v2/version-group/");
      } else if (datosGrupoVersiones){
          datosRegion = xhr.response
          regionOriginal.innerText = datosRegion.regions[datosRegion.regions.length-1].name;
          datosGrupoVersiones = false;
          datosSonDePokemon = true;
          datosSonDeRegion = false;
          juegosOriginales.innerText = datosRegion.versions.map((e) => {return " " + e.name;})
      }

  }
};


xhr.onerror = function() {
  alert("Solicitud fallida");
};

const peticionServidor = (indice = 1, newUrl = url) => {
    xhr.open('GET', newUrl + indice);
    xhr.responseType = "json";
    xhr.send();
    datosSonDePokemon = (newUrl === url);
    datosSonDeRegion = (newUrl === "https://pokeapi.co/api/v2/version/");
    datosGrupoVersiones = newUrl === "https://pokeapi.co/api/v2/version-group/";

}
peticionServidor();