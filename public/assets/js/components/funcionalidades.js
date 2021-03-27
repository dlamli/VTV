// const btnLogin = document.getElementById("btnLogin"),
//     btnRegistrar = document.getElementById("btnRegistrar"),
//     txtUsuario = document.getElementById("txtUsuario"),
//     txtContraseña = document.getElementById("txtContraseña"),
//     formLogin = document.getElementById("formLogin"),
//     formRegistro = document.getElementById("formRegistro"),
//     msg = document.getElementById("msg");

// btnLogin.addEventListener("mouseup", () => {
//     let div = document.createElement("div");

//     if (txtUsuario.value === "admin" && txtContraseña.value === "admin") {
//         formLogin.setAttribute("action", "/admin_index");

//     } else if (txtUsuario.value === "usuario" && txtContraseña.value === "usuario") {
//         formLogin.setAttribute("action", "/usuario_index");

//     } else if (txtUsuario.value === "" && txtContraseña.value === "") {
//         const html = `
//         <div class="alert alert-warning alert-dismissible fade show" role="alert">
//             <strong>Ops!</strong> Datos vacios, ingrese los datos.
//             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//         </div>`;

//         div.innerHTML = html;
//         formLogin.appendChild(div);
//     } else {
//         const html = `
//         <div class="alert alert-warning alert-dismissible fade show" role="alert">
//             <strong>Ups!</strong>Datos incorrectos, vuelva a intentarlo.
//             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//         </div>`;

//         div.innerHTML = html;
//         formLogin.appendChild(div);
//     }
// });

// btnRegistrar.addEventListener("mouseup", () => {
//   let div = document.createElement("div");

//   const html = `
//         <div class="alert alert-warning alert-dismissible fade show" role="alert">
//             <strong>Registro!</strong> Datos vacios, ingrese los datos.
//             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//         </div>

//         `;
//   div.innerHTML = html;
//   formRegistro.appendChild(div);
// });
