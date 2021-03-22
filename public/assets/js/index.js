const btnLogin = document.getElementById('btnLogin'),
    txtUsuario = document.getElementById('txtUsuario'),
    txtContraseña = document.getElementById('txtContraseña'),
    formLogin = document.getElementById('formLogin'),
    msg = document.getElementById('msg');

btnLogin.addEventListener('click', () => {

    if (txtUsuario.value === 'admin' && txtContraseña.value === 'admin') {
        console.log('Login correcto al admin');
        btnLogin.href = '/admin_index';

    } else if (txtUsuario.value === 'usuario' && txtContraseña.value === 'usuario') {
        console.log('Login correcto al admin');
        btnLogin.href = '/usuario_index';

    } else if (txtUsuario.value === '' && txtContraseña.value === '') {
        msg.classList.add('text-warning');
        msg.innerHTML = 'Datos vacios, ingrese los datos.'

    } else {
        msg.classList.add('text-warning');
        msg.innerHTML = 'Datos incorrectos, vuelva a intentarlo.'
    }

});