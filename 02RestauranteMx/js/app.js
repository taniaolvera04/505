var platillos = JSON.parse(localStorage.getItem("platillos")) || [];
var ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
var propina=0, subtotal=0, total=0, porcentaje=0;


const guardarItem = () => {
    platillos = JSON.parse(localStorage.getItem("platillos")) || [];

    var descripcion = document.getElementById("descripcion").value;
    var precio = parseFloat(document.getElementById("precio").value); // Utilizar parseFloat en lugar de parseInt para manejar precios decimales

    if (descripcion.trim() === "" || isNaN(precio) || document.getElementById("precio").value==="" || precio <= 0) {
        Swal.fire({ icon: "error", title: "ERROR", text: "LOS DATOS SON INCORRECTOS" });
        return;
    }


    const platillo = { descripcion, precio };
    platillos.push(platillo);
    localStorage.setItem("platillos", JSON.stringify(platillos));

    Swal.fire({ icon: "success", title: "PLATILLO REGISTRADO", text: "EL PLATILLO FUE REGISTRADO CORRECTAMENTE" });
    bootstrap.Modal.getInstance(document.getElementById("nuevoItem")).hide();

    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";

   
    cargarPlatillos();
}


const cargarPlatillos = () => {
    let index=0;
    platillos = JSON.parse(localStorage.getItem("platillos")) || [];

    let tablaHTML = ``;

    platillos.map(p => {
        tablaHTML += `
        <tr>
         <td class="text-center">
            <div class="d-flex justify-content-center align-items-center">
            <button type="button" onclick="add(${index})" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
             ${p.descripcion}
            </button>
            <button class="btn btn-info ms-2"> $${parseFloat(p.precio).toFixed(2)}</button>
            </div>
        </td>
    </tr>
        `;
        
        index++;
    });

    document.getElementById("listaPlatillos").innerHTML = tablaHTML;
    cargarOrdenes();
}
