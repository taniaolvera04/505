var tPresupuesto = parseInt(localStorage.getItem("presupuesto")); // VARIABLE DE TOTAL DE PRESUPUESTO
var gastos = JSON.parse(localStorage.getItem("gastos")) || [];

var divPresupuesto = document.querySelector("#divPresupuesto");
var presupuesto = document.querySelector("#presupuesto");
var btnPresupuesto = document.querySelector("#btnPresupuesto");
var btnActualizar=document.querySelector("#actualizar");
var divGastos = document.querySelector("#divGastos");
var progress = document.querySelector("#progress");

var tGastos=0;
var disponible=0;
let index;


const inicio =()=>{
    tPresupuesto=parseInt(localStorage.getItem("presupuesto"));
    if (tPresupuesto>0) {
        divPresupuesto.classList.remove("d-block");
        divGastos.classList.remove("d-none");
        divPresupuesto.classList.add("d-none");
        divGastos.classList.add("d-block");
        totalPresupuesto.innerHTML=`$ ${tPresupuesto.toFixed(2)}`;
        mostrarGastos();
    }else{
        divPresupuesto.classList.remove("d-none");
        divGastos.classList.remove("d-block");
        divPresupuesto.classList.add("d-block");
        divGastos.classList.add("d-none");
        presupuesto.value=0;
    }
    imprimirInfo();
}




/*EVENTO ON CLICK BOTÓN INICIAR*/ 
btnPresupuesto.onclick=()=>{
tPresupuesto=parseInt(presupuesto.value);
localStorage.setItem('presupuesto', tPresupuesto);
if(tPresupuesto==0){
    Swal.fire({icon:"error",title:"ERROR",text:"EL PRESUPUESTO DEBE DE SER MAYOR A 0"});
 return;
}


/*BLOQUE QUE SIRVE PARA QUE AL APRETAR BOTÓN INICIAR (SI PRESUPUESTO ES MAYOR A 0)
 DESAPAREZCAN LOS DIVS DE PRESUPUESTO Y GASTO*/

divPresupuesto.classList.remove("d-block");
divGastos.classList.remove("d-none");
divPresupuesto.classList.add("d-none");
divGastos.classList.add("d-block");

totalPresupuesto.innerHTML=`$${tPresupuesto.toFixed(2)}`;
/*document.getElementById('totalPresupuesto').textContent =  "$" +tPresupuesto.toFixed(2);DIEGO SOLUCIÓN*/

mostrarGastos();

}

/*BLOQUE REGISTRA LOS DATOS QUE SE INGRESEN EN MODAL Y LOS GUARDA LOCALMENTE */
const guardarGasto = () => {
    gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    let descripcion = document.getElementById("descripcion").value;
    let costo = parseInt(document.getElementById("costo").value);
    let categoria = document.getElementById("categoria").value;

    if (descripcion.trim() === "" || isNaN(costo) || costo <= 0) {
        Swal.fire({icon: "error", title: "ERROR", text: "TIENES CAMPOS VACÍOS O EL COSTO NO ES VÁLIDO"});
        return;
    }

    if (costo > disponible) {
        Swal.fire({icon: "error", title: "ERROR", text: "FONDOS INSUFICIENTES"});
        return;
    }

    const gasto = { descripcion, costo, categoria };
    gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    Swal.fire({icon: "success", title: "GASTO REGISTRADO", text: "EL GASTO FUE REGISTRADO CORRECTAMENTE"});
    bootstrap.Modal.getInstance(document.getElementById("nuevoGasto")).hide();

    document.getElementById("descripcion").value = "";
    document.getElementById("costo").value = "";
    document.getElementById("categoria").selectedIndex = 0;
    mostrarGastos();
}


    // Añadimos un escuchador de eventos al elemento con id "filtrarCategoria"
    document.getElementById("filtrarCategoria").addEventListener("change", (event) => {
        // Cuando el evento "change" ocurre, obtenemos el valor seleccionado del elemento
        const categoriaSeleccionada = event.target.value;
        // Llamamos a la función mostrarGastos pasando el valor seleccionado como argumento
        mostrarGastos(categoriaSeleccionada);
    });


// Función para mostrar los gastos, con una categoría opcional para filtrar
const mostrarGastos = (categoria = "todos") => {
    // Obtener los gastos almacenados en el localStorage y convertirlos a un arreglo de objetos
    gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    
    // Inicializar una variable para construir el HTML de los gastos
    gastosHTML = ``;

    // Si no hay gastos, mostrar un mensaje indicando que no hay gastos
    if (gastos.length == 0) {
        document.getElementById('listaGastos').innerHTML = `<b>No hay gastos</b>`;
        return; // Salir de la función ya que no hay nada más que hacer
    }

    // Inicializar el índice para los botones de edición y eliminación
    index = 0; 
    // Inicializar el total de gastos
    tGastos = 0;  

    // Iterar sobre cada gasto en el arreglo
    gastos.map(gasto => {
        // Mostrar solo los gastos que coinciden con la categoría seleccionada o todos
        if (categoria == gasto.categoria || categoria == "todos") {
            // Construir el HTML para cada gasto
            gastosHTML += `
                <div class="card text-center w-75 m-auto mt-3 shadow p-2 " >
                    <div class="row">
                        <div class="col"><img src="img/${gasto.categoria}.png" class="imgCategoria"></div>
                        <div class="col text-start">
                            <p><b>DESCRIPCIÓN: </b><small>${gasto.descripcion}</small></p>
                            <p><b>COSTO: </b><small>$${parseInt(gasto.costo).toFixed(2)}</small></p>
                        </div>
                        <div class="col">
                            <button class="btn btn-info mb-2" onclick="mostrarG(${index})" data-bs-toggle="modal" data-bs-target="#editarGasto">Update 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg></button>
                            <button class="btn btn-danger mb-2" onclick="delGastos(${index})">Delete 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                            </button>
                        </div>
                    </div>  
                </div>
            `;
            // Sumar el costo del gasto al total
            tGastos += parseFloat(gasto.costo);
        }
        // Incrementar el índice para la siguiente iteración
        index++;
    });

    // Mostrar el HTML generado en el elemento con id "listaGastos"
    document.getElementById("listaGastos").innerHTML = gastosHTML;
    // Llamar a una función para actualizar la información (como el total de gastos, etc.)
    imprimirInfo();
}




/*ESTE CÓDIGO IMPRIME INFORMACIÓN DEL PRESUPUESTO, DISPONIBLE, GASTADO Y CALCULA PORCENTAJE TOTAL 
CON BASE EN GASTOS Y LOS MANDA A CIRCLE-PROGRESS Y A ETIQUETAS CORRESPONDIENTES */
const imprimirInfo = () => {
    var totalPresupuesto = document.querySelector("#totalPresupuesto");
    var totalDisponible = document.querySelector("#totalDisponible");
    var totalGastos = document.querySelector("#totalGastos");
    var tPresupuesto = parseFloat(localStorage.getItem("presupuesto")) || 0;
    disponible = tPresupuesto - tGastos;

    let porcentaje = 100-((tGastos/tPresupuesto)*100);
    progress.innerHTML=`<circle-progress value="${porcentaje}" min="0" max="100" text-format="percent"></circle-progress>`;

    totalGastos.innerHTML = `$${tGastos.toFixed(2)}`;
    totalPresupuesto.innerHTML = `$${tPresupuesto.toFixed(2)}`;
    totalDisponible.innerHTML = `$${disponible.toFixed(2)}`;
};




/*BLOQUE QUE MUESTRA LOS DATOS REGISTRADOS EN LOCAL AL DARLE CLICK PARA QUE SE  MUESTREN EN MODAL*/
function mostrarG(index){
var gasto=gastos[index];
document.getElementById("edescripcion").value=gasto.descripcion;
document.getElementById("ecosto").value=gasto.costo;
document.getElementById("ecategoria").value=gasto.categoria;
document.getElementById("eindex").value=index;
}


btnActualizar.onclick = () => {
    gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    let descripcion = document.getElementById("edescripcion").value;
    let costo = parseFloat(document.getElementById("ecosto").value);
    let categoria = document.getElementById("ecategoria").value;
    let index = parseInt(document.getElementById("eindex").value);

    if (descripcion.trim() === "" || isNaN(costo) || costo <= 0) {
        Swal.fire({icon: "error", title: "ERROR", text: "DATOS INCORRECTOS"});
        return;
    }

    let costoAnterior = parseFloat(gastos[index].costo);
    if (costo > (costoAnterior + disponible)) {
        Swal.fire({icon: "error", title: "ERROR", text: "YA NO TIENES FONDOS"});
        return;
    }

    gastos[index].descripcion = descripcion;
    gastos[index].costo = costo;
    gastos[index].categoria = categoria;
    localStorage.setItem("gastos", JSON.stringify(gastos));
    Swal.fire({icon: "success", title: "GASTO ACTUALIZADO", text: "EL GASTO FUE ACTUALIZADO CORRECTAMENTE"});
    bootstrap.Modal.getInstance(document.getElementById("editarGasto")).hide();
    mostrarGastos();
}




/*BLOQUE PARA BORRAR DEL LOCAL UN REGISTRO */
function delGastos(index) {
    Swal.fire({
        icon:"question",
        title: "¿Estás seguro de eliminar este gasto?",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar",
        denyButtonText: "No estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            gastos.splice(index, 1);
            localStorage.setItem("gastos", JSON.stringify(gastos)); 
            Swal.fire("El gasto se eliminó exitosamente", "", "success");
            mostrarGastos();
        }
    });
}



const reset=()=>{
    localStorage.clear();
    Swal.fire({icon:"success",title:"RESET",text:"LOS GASTOS SE HAN RESETADO CORRECTAMENTE"});
    inicio();
}