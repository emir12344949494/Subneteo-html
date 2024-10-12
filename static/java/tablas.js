function calcularSubredes() {
    var ip = document.getElementById('ip').value;
    var mascara = document.getElementById('mascara').value;
    var subredes = parseInt(document.getElementById('subredes').value);

    if (ip === "" || mascara === "" || isNaN(subredes)) {
        alert("Por favor, ingresa una IP, una máscara y un número de subredes válido.");
        return false;
    }

    // Convertir la máscara de subred a su representación CIDR
    var bitsMascara = calcularBitsMascara(mascara);
    var numHosts = Math.pow(2, 32 - bitsMascara) - 2;

    // Calcular la dirección de red y las subredes
    var ipBase = convertirIPaNumero(ip);
    var incrementoSubred = Math.pow(2, 32 - bitsMascara);
    var tabla = document.getElementById('tablaSubredes').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    for (let i = 0; i < subredes; i++) {
        var hostMin = red + 1;
        var hostMax = red + numHosts;
        var broadcast = red + incrementoSubred - 1;

        agregarFilaTabla(tabla, {
            numeroSubred: i + 1,
            direccionRed: convertirNumeroAIP(red),
            hostMin: convertirNumeroAIP(hostMin),
            hostMax: convertirNumeroAIP(hostMax),
            broadcast: convertirNumeroAIP(broadcast),
            mascara: mascara
        });
    }
}

// Función para convertir una IP a número entero
function convertirIPaNumero(ip) {
    var partes = ip.split('.').map(Number);
    return ((partes[0] << 24) | (partes[1] << 16) | (partes[2] << 8) | partes[3]) >>> 0;
}

// Función para convertir un número entero a IP
function convertirNumeroAIP(num) {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
}

// Función para calcular la cantidad de bits en la máscara de subred
function calcularBitsMascara(mascara) {
    return mascara.split('.')
        .map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'))
        .join('').split('1').length - 1;
}

// Función para agregar una fila a la tabla de subredes
function agregarFilaTabla(tabla, datos) {
    var fila = tabla.insertRow();
    fila.insertCell(0).textContent = datos.numeroSubred;
    fila.insertCell(1).textContent = datos.direccionRed;
    fila.insertCell(2).textContent = datos.hostMin;
    fila.insertCell(3).textContent = datos.hostMax;
    fila.insertCell(4).textContent = datos.broadcast;
    fila.insertCell(5).textContent = datos.mascara;
}
