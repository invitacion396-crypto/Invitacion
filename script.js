//==============================
// BIENVENIDA
//==============================

const bienvenida = document.getElementById("bienvenida");

const principal = document.getElementById("principal");

const entrar = document.getElementById("entrar");

const musica = document.getElementById("musica");

entrar.onclick = ()=>{

    const musica = document.getElementById("musica");

    musica.volume = 0.3;

    musica.play().catch(error => {
    console.log("No se pudo reproducir automáticamente:", error);
    });

    bienvenida.style.opacity="0";

    setTimeout(()=>{

        bienvenida.style.display="none";

        principal.style.display="block";

    },800);

    musica.play();

}

//==============================
// CUENTA REGRESIVA
//==============================

const fechaEvento = new Date("August 1, 2026 20:00:00").getTime();

setInterval(()=>{

    const ahora = new Date().getTime();

    const diferencia = fechaEvento-ahora;

    const dias = Math.floor(diferencia/(1000*60*60*24));

    const horas = Math.floor((diferencia%(1000*60*60*24))/(1000*60*60));

    const minutos = Math.floor((diferencia%(1000*60*60))/60000);

    const segundos = Math.floor((diferencia%(60000))/1000);

    document.getElementById("dias").innerHTML=dias;

    document.getElementById("horas").innerHTML=horas;

    document.getElementById("minutos").innerHTML=minutos;

    document.getElementById("segundos").innerHTML=segundos;

},1000);

//==============================
// MODAL
//==============================

const modal=document.getElementById("modal");


const confirmar=document.getElementById("confirmar");

const cerrar=document.getElementById("cerrar");

confirmar.onclick=()=>{

    modal.style.display="flex";

}

cerrar.onclick=()=>{

    modal.style.display="none";

}

window.onclick=(e)=>{

    if(e.target==modal){

        modal.style.display="none";

    }

}

//==============================
// PERSONAS
//==============================

const radios=document.getElementsByName("respuesta");

const personasDiv=document.getElementById("personasDiv");

radios.forEach(r=>{

    r.addEventListener("change",()=>{

        if(r.value=="si" && r.checked){

            personasDiv.style.display="block";

        }else if(r.value=="no" && r.checked){

            personasDiv.style.display="none";

        }

    });

});

//==============================
// DEMO
//==============================

document.getElementById("enviar").onclick = async () => {

    const nombre = document.getElementById("nombre").value.trim();
    const personas = document.getElementById("personas").value;
    const respuesta = document.querySelector('input[name="respuesta"]:checked');

    if(nombre==""){
        alert("Escribe tu nombre");
        return;
    }

    if(respuesta==null){
        alert("Selecciona una opción");
        return;
    }

    if(respuesta.value=="si" && (personas=="" || personas<=0)){
        alert("Selecciona el número de personas que asistirán.");
        return;
    }

    try{

        await emailjs.send(
            "service_09osev8",
            "template_paq4ejd",
            {
                nombre: nombre,
                asistencia: respuesta.value,
                personas: respuesta.value=="si" ? personas : 0
            }
        );

        localStorage.setItem("confirmado","si");

        modal.style.display="none";

        document.getElementById("confirmar").disabled=true;

        document.getElementById("confirmar").innerHTML="✔ Asistencia Confirmada";

        alert("🎉 ¡Muchas gracias!\n\nTu respuesta ha sido registrada correctamente.");

    }catch(error){

        console.error(error);

        alert("No fue posible enviar la confirmación.");

    }

};