var platillos = JSON.parse(localStorage.getItem("platillos")) || [];


const guardarItem = () => {
    var descripcion = document.getElementById("descripcion").value;
    var precio = parseFloat(document.getElementById("precio").value); // Utilizar parseFloat en lugar de parseInt para manejar precios decimales

    if (descripcion.trim() === "" || isNaN(precio) || precio <= 0) {
        Swal.fire({ icon: "error", title: "ERROR", text: "TIENES CAMPOS VACÍOS O EL PRECIO NO ES VÁLIDO" });
        return;
    }


    const platillo = { descripcion, precio };
    platillos.push(platillo);
    localStorage.setItem("platillos", JSON.stringify(platillos));

    Swal.fire({ icon: "success", title: "PLATILLO REGISTRADO", text: "EL PLATILLO FUE REGISTRADO CORRECTAMENTE" });
    bootstrap.Modal.getInstance(document.getElementById("nuevoItem")).hide();

    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";

   
    imprimirPlatillos();
}


const imprimirPlatillos = () => {
    let tablaHTML = '';
    let total = 0;

    platillos.forEach(platillo => {
        tablaHTML += `
            <tr>
                <td>${platillo.descripcion}</td>
                <td><button class="btn btn-info">$${platillo.precio.toFixed(2)}</button></td>
            </tr>
        `;
        total += platillo.precio; 
    });

    document.getElementById("listaPlatillos").innerHTML = tablaHTML;
}
