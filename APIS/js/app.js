const getUsers=async()=>{
    let response=await fetch('https://jsonplaceholder.typicode.com/users');
    let res=await response.json();
    let div=``
    var fila=1;
    res.map(user=>{
      if(fila==1){
        div+=`<div class="row">`
      }
      console.log(user);
      div+=` <div class="col m-3">
      <div class="card border shadow">
      <div class="card-body">

      <p id="h">DATOS PERSONALES</p>
      <p>ID: ${user.id}</p>
      <p>Nombre: ${user.name}</p> 
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
      <p id="hh">DIRECCIÓN</p>
      <p>Calle: ${user.address.street}</p>
      <p>Suite: ${user.address.suite}</p>
      <p>Ciudad: ${user.address.city}</p>
      <p>Zipcode: ${user.address.zipcode}</p>
      <p id="hhh">COMPAÑÍA</p>
      <p>Nombre: ${user.company.name}</p> 
      <p>Catch Phrase: "${user.company.catchPhrase}" </p> 
      <p>BS: "${user.company.bs}"</p> 
      
      <a target="_black" class="btn btn-info" href="https://www.google.com/maps/@${user.address.geo.lng},${user.address.geo.lat},17z/data=!3m1!4b1!4m6!3m5!1s0x4cce045ff5c642c9:0x8d2d869b33b61032!8m2!3d45.4251774!4d-75.718906!16s%2Fg%2F11ckpy6hcv?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D">UBICACIÓN</a>  
      </div>
      </div>
      </div>
      `;

      if(fila==4){
        div+=`</div>`
        fila=0
      }
      fila++;
    });
    document.getElementById("divUsers").innerHTML=div;

}


const cargar=async(user,id)=>{
  const response=await fetch('https://jsonplaceholder.typicode.com/posts');
  let res=await response.json();
  let div=``
  let num=1;
  res.map(post=>{
    if(post.userId==id){
      div+=`<h6>${num} ${post.title}</h6>`;
      num++;
    }
  })
document.getElementById("listaPost"+user).innerHTML=div;
}


const getUsers2=async()=>{
  let response=await fetch('https://jsonplaceholder.typicode.com/users');
  let res=await response.json();
  let div=``
  res.map(user=>{

    div+=` 
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${user.username}" aria-expanded="false" aria-controls="collapse${user.username}">
       ${user.name.toUpperCase()}
      </button>
    </h2>
    <div id="collapse${user.username}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body" id="listaPost${user.username}">
         </div>
    </div>
  </div>
    `
    cargar(user.username,user.id);

  });
  document.getElementById("divUsers").innerHTML=div;

}




const getPh=async()=>{
  let response=await fetch('https://jsonplaceholder.typicode.com/photos');
  let res=await response.json();
  let div=``
  var fila=1;
  res.map(p=>{
    if(fila==1){
      div+=`<div class="row">`
    }
    console.log(p);
    div+=` <div class="col m-3">
    <div class="card border shadow">
    <div class="card-body">

    <p id="h">PHOTOS</p>
    <p>Title: "${p.title}"</p>
    <img src="${p.url}" height="60px"></p> 
</div>
    </div>
    </div>
    `;

    if(fila==4){
      div+=`</div>`
      fila=0
    }
    fila++;
  });
  document.getElementById("divPh").innerHTML=div;

}


