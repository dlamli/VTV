const urlPaisApi = 'https://restcountries.eu/rest/v2/all';

const select = document.querySelector('#country');

const crearOpcionPais = (nombre) => {

    const option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;

    select.appendChild(option);
}

const mostrarNombrePaisAsync = async () => {
    const respuesta = await fetch(urlPaisApi);
    const dato = await respuesta.json();
    const nombrePais = await dato.map(pais => pais.name);
    nombrePais.forEach(crearOpcionPais);
}

mostrarNombrePaisAsync();
