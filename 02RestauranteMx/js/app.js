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
            <button class="btn btn-info ms-2">$${parseFloat(p.precio).toFixed(2)}</button>
            <button class="btn btn-danger ms-2" style="border-radius: 48%;" onclick="delP(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
          </svg></button>

            </div>
        </td>
    </tr>
        `;
        
        index++;
    });

    document.getElementById("listaPlatillos").innerHTML = tablaHTML;
    cargarOrdenes();
}

const delP=(index)=>{
    platillos = JSON.parse(localStorage.getItem("platillos")) || [];
    Swal.fire({
        icon:"question",
        title: "¿Estás seguro de eliminar este platillo?",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar",
        denyButtonText: "No estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            platillos.splice(index, 1);
            localStorage.setItem("platillos", JSON.stringify(platillos)); 
            Swal.fire("El platillo se eliminó exitosamente", "", "success");
            cargarPlatillos();
        }
    });
}




const calcularPropina=()=>{
    let rPropina=document.querySelector('input[name="propina"]:checked');
    if(rPropina){
        porcentaje=parseFloat(rPropina.value);
    }
    cargarOrdenes();
}


const del=(index)=>{
    ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    Swal.fire({
        icon:"question",
        title: "¿Estás seguro de eliminar esta orden?",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar",
        denyButtonText: "No estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            ordenes.splice(index, 1);
            localStorage.setItem("ordenes", JSON.stringify(ordenes)); 
            cargarOrdenes();
            Swal.fire("La orden se eliminó exitosamente", "", "success");
        }
    });
}


const terminarP=()=>{
    Swal.fire({
        icon:"question",
        title: "¿Estás seguro de terminar el pedido?",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar",
        denyButtonText: "No estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("ordenes"); 
            subtotal=0;
            propina=0;
            total=0;
            cargarOrdenes();
            Swal.fire("PEDIDO TERMINADO EXITOSAMENTE", "", "success");
        }
    });
}

cargarPlatillos();