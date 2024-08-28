var tPresupuesto=parseInt(localStorage.getItem("presupuesto"));
var gastos=JSON.parse(localStorage.getItem("gastos"))||[];
var divPresupuesto=document.querySelector('#divPresupuesto');
var presupuesto=document.querySelector('#presupuesto');
var btnpresupuesto=document.querySelector('#btnPresupuesto');
var divGastos=document.querySelector('#divGastos');
var totalPresupuesto=document.querySelector("#totalPresupuesto");
var progress=document.querySelector("#progress"); 
var ruta;


const inicio =()=>{
    if (tPresupuesto>0) {
        divPresupuesto.classList.remove("d-block");
        divGastos.classList.remove("d-none");
        divPresupuesto.classList.add("d-none");
        totalPresupuesto.innerHTML=`$ ${tPresupuesto.toFixed(2)}`;
        mostrarGastos();
    }else{
        divPresupuesto.classList.remove("d-none");
        divGastos.classList.remove("d-block");
        divPresupuesto.classList.add("d-block");
        divGastos.classList.add("d-none");
    }
}




btnpresupuesto.onclick=()=>{
    tPresupuesto=parseInt(presupuesto.value);
    localStorage.setItem('presupuesto', tPresupuesto);
    if (tPresupuesto==0) {
        Swal.fire({title: "ERROR!",text: "PRESUPUESTO MAYOR A 0",icon: "error"});
    return;
    }


divPresupuesto.classList.remove("d-block");
divGastos.classList.remove("d-none");
divPresupuesto.classList.add("d-none");
divGastos.classList.add("d-block");
totalPresupuesto.innerHTML=`$ ${tPresupuesto.toFixed(2)};`
progress.innerHTML=`<circle-progress value="0" min="0" max="100" text-format="percent" id="progress"></circle-progress>`

}
const guardarGasto=()=>{
    gastos=JSON.parse(localStorage.getItem("gastos"))||[];
    let descripcion=document.querySelector("#descripcion").value;
    let costo=document.querySelector("#costo").value;
    let categoria=document.querySelector("#categoria").value;

    const gasto={descripcion,costo,categoria}
    gastos.push(gasto)
    localStorage.setItem("gastos",JSON.stringify(gastos));
mostrarGastos();
}

if (categoria=="suscripcion") {
    ruta="img\suscripcion.png"
}

const mostrarGastos=()=>{
    gastos=JSON.parse(localStorage.getItem("gastos")) || [];
    gastosHTML = ``;
    gastos.map(gasto=>{
        gastosHTML+=`
    <div class="card text-center w-50 m-auto mt-3 shadow p-2 " >
    <div class="row">

        <div class="col"><img src="${gasto.categoria}.png" class="imgCategoria"></div>
        <div class="col text-start">
         <p><b>Descripcion:</b><small > ${gasto.descripcion}</small></p>
         <p><b>Costo:</b><small>$ ${parseInt(gasto.costo).toFixed(2)}</small></p>

        </div>
        <div class="col">
        <button class="btn btn-success">Update <i class="bi bi-pencil"></i></button>
        <button class="btn btn-danger">Delete <i class="bi bi-trash2-fill"></i></button>
        </div>
    </div>  
    </div>
`
    });
    document.getElementById("listaGasto").innerHTML=gastosHTML;

}

const reset =()=>{
    localStorage.clear();
}

