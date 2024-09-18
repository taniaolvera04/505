var infoCalorias = JSON.parse(localStorage.getItem("infoCalorias")) || [];

var btnActualizar = document.querySelector("#actualizar");

var tConsumidas = document.querySelector("#tConsumidas");
var tEjercicio = document.querySelector("#tEjercicio");
var tDiferencia = document.querySelector("#tDiferencia");

// Función para guardar las calorías en el localStorage
const guardarCalorias = () => {
    infoCalorias = JSON.parse(localStorage.getItem("infoCalorias")) || [];
    let categoria = document.getElementById("categoria").value;
    let actividad = document.getElementById("actividad").value;
    let calorias = parseInt(document.getElementById("calorias").value);

    if (actividad.trim() === "" || isNaN(calorias) || calorias <= 0) {
        Swal.fire({icon: "error", title: "ERROR", text: "TIENES CAMPOS VACÍOS O LAS CALORÍAS NO SON VÁLIDAS"});
        return;
    }

    const informacion = { categoria, actividad, calorias };
    infoCalorias.push(informacion);
    localStorage.setItem("infoCalorias", JSON.stringify(infoCalorias));
    Swal.fire({icon: "success", title: "INFORMACIÓN REGISTRADA", text: "LA INFORMACIÓN FUE REGISTRADA CORRECTAMENTE"});
    bootstrap.Modal.getInstance(document.getElementById("nuevaCaloria")).hide();

    document.getElementById("categoria").selectedaIndex = 0;
    document.getElementById("actividad").value = "";
    document.getElementById("calorias").value = "1";
    mostrarCalorias();
};


// Función para mostrar las calorías
const mostrarCalorias = () => {
    infoCalorias = JSON.parse(localStorage.getItem("infoCalorias")) || [];
    let caloriasHTML = ``;
    let totalConsumidas = 0;
    let totalEjercicio = 0;

    infoCalorias.forEach((c, index) => {
        caloriasHTML += `
        <div class="card text-center w-75 m-auto mt-3 shadow p-2">
            <div class="row">
            <div class="col">
            
            <h5 id="ca"><b>${c.categoria.toUpperCase()}</b></h5>

            <img src="img/calorias.jpg" class="imgCaloria mt-2"></div>
                <div class="col text-center">
                    <h5 id="c1"><b>ACTIVIDAD </b></h5>  <h6>${c.actividad}</h6>
                    <h5 id="c2"><b>CALORÍAS </b></h5>  <h6>${c.calorias}</h6>
                </div>
                <div class="col">
                    <button class="btn btn-info mb-2 d-block" onclick="mostrarC(${index})" data-bs-toggle="modal" data-bs-target="#editarCaloria">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5  15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                    <button class="btn btn-danger mb-2 d-block" onclick="delCalorias(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>  
            </div>  
        `;

        // Actualiza los totales
        if (c.categoria === "ejercicio") {
            totalEjercicio += c.calorias;
        } else {
            totalConsumidas += c.calorias;
        }
    });

    document.getElementById("listaCalorias").innerHTML = caloriasHTML;
    imprimirInfo(totalConsumidas, totalEjercicio);
};



// Función para imprimir la información de calorías
const imprimirInfo = (consumidas, ejercicio) => {
    let diferencia = consumidas - ejercicio;

    tConsumidas.innerHTML = `${consumidas}`;
    tEjercicio.innerHTML = `${ejercicio}`;
    tDiferencia.innerHTML = `${diferencia}`;
};



// Función para mostrar los datos en el modal de edición
function mostrarC(index) {
    var informacion = infoCalorias[index];
    document.getElementById("ecategoria").value = informacion.categoria;
    document.getElementById("eactividad").value = informacion.actividad;
    document.getElementById("ecalorias").value = informacion.calorias;
    document.getElementById("eindex").value = index;
}


// Función para actualizar un registro
btnActualizar.onclick = () => {
    infoCalorias = JSON.parse(localStorage.getItem("infoCalorias")) || [];

    let categoria = document.getElementById("ecategoria").value;
    let actividad = document.getElementById("eactividad").value;
    let calorias = parseInt(document.getElementById("ecalorias").value);
    let index = parseInt(document.getElementById("eindex").value);

    if (categoria.trim() === "" || actividad.trim() === "" || isNaN(calorias) || calorias <= 0) {
        Swal.fire({icon: "error", title: "ERROR", text: "DATOS INCORRECTOS"});
        return;
    }

    infoCalorias[index].categoria = categoria;
    infoCalorias[index].actividad = actividad;
    infoCalorias[index].calorias = calorias;
    localStorage.setItem("infoCalorias", JSON.stringify(infoCalorias));
    Swal.fire({icon: "success", title: "INFORMACIÓN ACTUALIZADA", text: "LA INFORMACIÓN FUE ACTUALIZADA CORRECTAMENTE"});
    bootstrap.Modal.getInstance(document.getElementById("editarCaloria")).hide();
    mostrarCalorias();
};


// Función para eliminar un registro
function delCalorias(index) {
    Swal.fire({
        icon: "question",
        title: "¿Estás seguro de eliminar este registro?",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "No estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            infoCalorias.splice(index, 1);
            localStorage.setItem("infoCalorias", JSON.stringify(infoCalorias)); 
            mostrarCalorias();
            Swal.fire("EL REGISTRO SE ELIMINÓ EXITOSAMENTE", "", "success");
        }
    });
}

// Mostrar calorías al cargar la página
mostrarCalorias();
