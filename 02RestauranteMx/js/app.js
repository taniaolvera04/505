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


const add = (indexMenu) => {
    ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    platillos = JSON.parse(localStorage.getItem("platillos")) || [];
    
    let indexActual = ordenes.findIndex(orden => orden.index === indexMenu);
    
    if (indexActual === -1) {
        let orden1 = { index: indexMenu, cantidad: 1 };
        ordenes.push(orden1);
    } else {
        ordenes[indexActual].cantidad++;
    }
    
    localStorage.setItem("ordenes", JSON.stringify(ordenes));
    cargarOrdenes();
}


const cargarOrdenes = () => {
    subtotal = 0;
    let indexOrden = 0;
    ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    platillos = JSON.parse(localStorage.getItem("platillos")) || [];
    let divOrden = document.getElementById("orden");
    let ordenHTML = ``;
    
    if (ordenes.length === 0) {
        divOrden.innerHTML = `<h4 class="text-center"><b>NO HAY ORDENES</b></h4>`;
        document.getElementById("s").innerHTML = `$ 0.00`;
        document.getElementById("p").innerHTML = `$ 0.00`;
        document.getElementById("t").innerHTML = `$ 0.00`;
    } else {
        ordenes.map(o => {
            ordenHTML += `
            <div class="list-group-item list-group-item-action border my-2">
                <div class="list-group-item list-group-item-action border my-2">
                    <h5 class="aling-middle">${platillos[o.index].descripcion}</h5>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="align-bottom">Cantidad: <b>${o.cantidad}</b></h5>
                    <h5 class="align-middle"><b>$ ${parseFloat(platillos[o.index].precio * o.cantidad).toFixed(2)}</b></h5>
                    <button class="btn btn-danger my-1" onclick="del(${indexOrden})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                  </svg></button>
                </div>
            </div>
            `;
            indexOrden++;
            subtotal += (parseFloat(platillos[o.index].precio) * parseFloat(o.cantidad));
        });
        
        divOrden.innerHTML = ordenHTML;
        propina = (porcentaje / 100) * subtotal;
        document.getElementById("s").innerHTML = `$ ${subtotal.toFixed(2)}`;
        document.getElementById("p").innerHTML = `$ ${propina.toFixed(2)}`;
        document.getElementById("t").innerHTML = `$ ${(subtotal + propina).toFixed(2)}`;
        calcularPropina();
    }
}


const delP = (index) => {
    platillos = JSON.parse(localStorage.getItem("platillos")) || [];
    Swal.fire({
        icon: "question",
        title: "¿Estás seguro de eliminar este platillo?",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "No estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            // Eliminar el platillo de la lista de platillos
            platillos.splice(index, 1);
            localStorage.setItem("platillos", JSON.stringify(platillos));

            // Eliminar el platillo de las órdenes
            ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
            ordenes = ordenes.filter(o => o.index !== index);
            localStorage.setItem("ordenes", JSON.stringify(ordenes));

            Swal.fire("El platillo se eliminó exitosamente", "", "success");
            cargarPlatillos();
            cargarOrdenes();
        }
    });
}




function calcularPropina() {
    let rPropina = document.querySelector('input[name="propina"]:checked');
    if (rPropina) {
        porcentaje = parseFloat(rPropina.value);
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


const cancelar=()=>{
    Swal.fire({
        icon:"question",
        title: "¿Estás seguro de cancelar el pedido?",
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
            Swal.fire("PEDIDO CANCELADOS EXITOSAMENTE", "", "success");
        }
    });
}

cargarPlatillos();