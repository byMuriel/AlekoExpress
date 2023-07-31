const elIndex = document.getElementById("elIndex");
if (elIndex) {
    //PREGUNTAS FRECUENTES
    const preg1 = document.querySelector("#preg1");
    const preg2 = document.querySelector("#preg2");
    const preg3 = document.querySelector("#preg3");
    const preg4 = document.querySelector("#preg4");
    preg1.addEventListener("mouseover", function () {
        mostrarResp(this);
    });
    preg1.addEventListener("mouseout", function () {
        ocultarResp(this);
    });
    preg2.addEventListener("mouseover", function () {
        mostrarResp(this);
    });
    preg2.addEventListener("mouseout", function () {
        ocultarResp(this);
    });
    preg3.addEventListener("mouseover", function () {
        mostrarResp(this);
    });
    preg3.addEventListener("mouseout", function () {
        ocultarResp(this);
    });
    preg4.addEventListener("mouseover", function () {
        mostrarResp(this);
    });
    preg4.addEventListener("mouseout", function () {
        ocultarResp(this);
    });
    function mostrarResp(este) {
        const parenTT = este.parentElement;
        const respuesta = parenTT.querySelector("div");
        respuesta.classList.remove('oculto');
        respuesta.className = "visible slideLeft";
    }
    function ocultarResp(este) {
        const parenTT = este.parentElement;
        const respuesta = parenTT.querySelector("div");
        respuesta.classList.remove('visible');
        respuesta.className = "oculto";
    }
    //PROGRAMANOS EL PANEL DE NOTICIAS DEL MENU PRINCIPAL 
    function cargar() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                mostrar(this);
            }
        };
        xhttp.open("GET", "noticias.xml", true);
        xhttp.send();
    }
    //PROGRAMAMOS EL ARCHIVO XML
    function mostrar(xml) {
        let i;
        let elArchivo = xml.responseXML;
        let cadena = "";
        let titulo = elArchivo.getElementsByTagName('titulo'); //array de titulos
        let imagenNoti = elArchivo.getElementsByTagName('imagen'); //array de imagenes
        let descripcion = elArchivo.getElementsByTagName('descripcion'); //array de descripcion
        let contenido = elArchivo.getElementsByTagName('contenido'); //array de contenido
        let fechaPub = elArchivo.getElementsByTagName('fechaPub'); //array de fechas
        //hacemos un bucle para crear arrays cada uno con su noticia completa
        for (i = 0; i < titulo.length; i++) {
            cadena += "<h5>" + titulo[i].childNodes[0].nodeValue + "</h5><br/>";
            cadena += "<div class='contenidoNoticia'><img " + imagenNoti[i].childNodes[0].nodeValue + "class='hide-on-med-and-down' id='imagenNoti" + (i + 1) + "' alt='noticia" + (i + 1) + "' /><br/><div>";
            cadena += "<h6>" + descripcion[i].childNodes[0].nodeValue + "</h6><br/>";
            cadena += contenido[i].childNodes[0].nodeValue + "<br/><span>";
            cadena += fechaPub[i].childNodes[0].nodeValue + "</span></div></div><br/><br/><br/><br/>";
        }
        document.getElementById("lasNoticias").innerHTML = cadena;
    }
}

//PROGRAMANOS EL MENU DE SERVICIOS
const dropPS = document.getElementById("dropPS");
const dropEI = document.getElementById("dropEI");
const dropM = document.getElementById("dropM");
const dropRC = document.getElementById("dropRC");
dropPS.addEventListener("click", () => {
    const sectionPS = document.getElementById("sectionPS");
    sectionPS.click();
});
dropEI.addEventListener("click", () => {
    const sectionEI = document.getElementById("sectionEI");
    sectionEI.click();
});
dropM.addEventListener("click", () => {
    const sectionM = document.getElementById("sectionM");
    sectionM.click();
});
dropRC.addEventListener("click", () => {
    const sectionRC = document.getElementById("sectionRC");
    sectionRC.click();
});

//PROGRAMANOS EL MENU DE PRESUPUESTOS
const formulario1 = document.getElementById("formulario1");
if (formulario1) {
    const nombre = document.getElementById("nombre1");
    const apellido = document.getElementById("apellido");
    const telefono = document.getElementById("telf");
    const correo = document.getElementById("email");
    let total = 0;
    let precioVolumen = 0;
    let precioPeso = 0;
    let pro;
    let f2Correcto;
    const acepto = document.getElementById("aceptacion");
    let val;
    let formulario2 = document.getElementById("formulario2");
    const botonEnviar = document.getElementById("enviar");
    //Asi hacemos que se reinicie el formulario y se borre todo al actualizar la pagina
    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    correo.value = "";
    //Con este objeto verificaremos que el formulario 1 sea valido
    let validaF1 = {
        nombre: false,
        apellido: false,
        telefono: false,
        correo: false,
    };
    //Validar que se hayan introducido todos la datos y sean correctos
    let inputsEnvioInternac = {
        destino: false,
        tipoEnv: false,
        tipoPaq: false,
    };
    function validacionEnvioInternacional() {
        let errorV = false;
        for (const property in inputsEnvioInternac) {
            if (inputsEnvioInternac[property] == false) {
                errorV = true;
                borrarSimulPres();
                borrarForm3();
            }
        }
        if (!errorV) {
            //SI ES VALIDO muestro el total
            mostrarSimulPres();
            cargaForm3();
        }
    }
    formulario1.addEventListener("submit", (e) => {
        e.preventDefault();
        let errorV = false;
        for (const property in validaF1) {
            if (validaF1[property] == false) {
                errorV = true;
            }
        }
        if (!errorV) {
            //Primero deshabilito los campos introducidos y luego cargo el formulario
            nombre.disabled = true;
            apellido.disabled = true;
            telefono.disabled = true;
            correo.disabled = true;
            cargaForm2();
        }
    });
    //Programamos la aparicion o no de los mensajes de error en los small de los inputs
    function setErrorFor(input, mensaje) {
        console.log("error" + input + mensaje);
        const inputError = input.parentElement;
        const cajaMsj = inputError.querySelector("small");
        cajaMsj.classList.remove('oculto');
        cajaMsj.className = "form-control error";
        cajaMsj.innerText = mensaje;
    }
    function setSuccessFor(input) {
        const inputSuccess = input.parentElement;
        const cajaMsj = inputSuccess.querySelector("small");
        cajaMsj.classList.remove('error');
        cajaMsj.className = "oculto";
    }
    //Validaremos los verdaderos y los falsos del FORMULARIO 1 para avisar los fallos
    //al instante cuando salgo del elemento del form para ello utilizo blur
    nombre.addEventListener("blur", () => {
        let name_re = /^[a-zA-Z]{2,15}$/;
        if (nombre.value == "" || nombre.value == null) {
            validaF1.nombre = false;
            setErrorFor(nombre, "El campo nombre esta vacio");
        } else {
            if (!name_re.exec(nombre.value)) {
                validaF1.nombre = false;
                setErrorFor(nombre, "El nombre debe tener entre 2 y 20 caracteres alfabeticos");
            } else {
                validaF1.nombre = true;
                setSuccessFor(nombre);
            }
        }
    });
    apellido.addEventListener("blur", () => {
        let apellido_re = /^[a-zA-Z ]{2,40}$/;
        if (apellido.value == "" || apellido.value == null) {
            validaF1.apellido = false;
            setErrorFor(apellido, "El campo apellido esta vacio");
        } else {
            if (!apellido_re.exec(apellido.value)) {
                validaF1.apellido = false;
                setErrorFor(apellido, "El apellido debe tener entre 2 y 40 caracteres alfabeticos");
            } else {
                validaF1.apellido = true;
            }
        }
    });
    telefono.addEventListener("blur", () => {
        let tel_re = /^[0-9]{7,9}$/;
        if (telefono.value == "" || telefono.value == null) {
            validaF1.telefono = false;
            setErrorFor(telefono, "El campo telefono esta vacio.");
        } else {
            if (!tel_re.exec(telefono.value)) {
                validaF1.telefono = false;
                setErrorFor(telefono, "Debe ingresar un numero valido");
            } else {
                validaF1.telefono = true;
                setSuccessFor(telefono);
            }
        }
    });
    correo.addEventListener("blur", () => {
        let mail_re = /^([.a-zA-Z0-9_]{3,10})+[@]+([.a-zA-Z0-9_]{3,10})+[.]+([a-z]{2,10})$/;
        if (correo.value == "" || correo.value == null) {
            validaF1.correo = false;
            setErrorFor(correo, "El campo E-Mail esta vacio.");
        } else {
            if (!mail_re.exec(correo.value)) {//como quiero saber cuando no lo cumple lo niego !
                validaF1.correo = false;
                setErrorFor(correo, "Debe ingresar una direccion de E-Mail valida.");
            } else {
                validaF1.correo = true;
                setSuccessFor(correo);
            }
        }
    });
    //Limpiamos el mensaje de error al estar en focus
    nombre.addEventListener("focus", function () {
        this.parentElement.querySelector("small").className = "oculto";
    });
    apellido.addEventListener("focus", function () {
        this.parentElement.querySelector("small").className = "oculto";
    });
    telefono.addEventListener("focus", function () {
        this.parentElement.querySelector("small").className = "oculto";
    });
    correo.addEventListener("focus", function () {
        this.parentElement.querySelector("small").className = "oculto";
    });
    //Carga del Formulario 2 y dependiendo del servicio seleccionado cargamos el resto del MENU VARIABLE
    function cargaForm2() {
        const formulario2 = document.getElementById("formulario2");
        formulario2.className = "descubierto";
        const borrar = document.getElementById("borrar");
        //Reseteamos el form, por si alguien habia hecho alguna eleccion
        borrar.click();
        borrar.addEventListener("click", () => {
            console.log("diste borrar");
            borrarForm3();
            borrarSimulPres();
        });
        //Tomamos el servicio seleccionado
        const laOpcion = document.getElementById("losServicios");
        //Verificamos que menu cargar dependiendo del servicio seleccionado
        laOpcion.addEventListener("change", () => {
            pro = laOpcion.options[laOpcion.selectedIndex].value;
            const menuVariable = document.getElementById("menuVariable");
            //Dependiendo de la seleccion activamos o no los botones del formulario
            if (pro == "envioInternacional") {
                //Limpiamos el div
                menuVariable.innerHTML = '';
                //Cargamos el contenido primario del menu de envios
                menuVariable.insertAdjacentHTML("afterbegin", '<div id="menuEnvios1"><span class="col s6"><label><input type="checkbox" id="usaVzla" name="usaVzla" class="filled-in" /><span>Envio de USA a Venezuela</span></label></span><span class="col s6"><label><input type="checkbox" id="usaCol" name="usaCol" class="filled-in" /><span>Envio de USA a Colombia</span></label></span><div class="col s12 espacios"><p>¿Desea Habilitar el Servicio de Casillero?</p><p class="info"> Con este servicio recibimos tus paquetes en nuestras oficinas y nos encargamos del reempaque de los mismos</p><div class="switch"><label><input type="checkbox" id="casillero"><span class="lever"></span></label></div></div><div class="col s12 l6  row espacios"><p class="bolDer">Tipo de Envío:</p><p class="row"><label class="col s12"><input type="checkbox" id="aereo" name="aereo" class="filled-in" /><span>Envío Aereo</span></label><label class="col s12"><input type="checkbox" id="maritimo" name="maritimo" class="filled-in" /><span>Envío Marítimo</span></label></p></div><div class="col s12 l6 espacios"><p class="bolDer">Tipo de Paquete:</p><p class="row"><label class="col s12"><input type="checkbox" id="sobre" name="sobre" class="filled-in" /><span>Sobre (hasta 500 gr.)</span></label><label class="col s12"><input type="checkbox" id="caja" name="caja" class="filled-in" /><span>Caja (a partir de 500 gr.)</span></label></p></div></div>');
                const paqueteTipoCaja = document.querySelector("input[name=caja]");
                paqueteTipoCaja.addEventListener('change', function () {
                    //Si se ha seleccionado el tipo de paquete caja aparecera el siguiente menu
                    if (this.checked) {
                        const menuEnvios1 = document.getElementById("menuEnvios1");
                        menuEnvios1.insertAdjacentHTML("beforeend", '<div id="menuEnvios2" class="col s12 espacios oculto"><p class="anchoC bolDer">Indique Dimensiones y Peso de la Caja:</p><div class="input-field"><div class="input-field col s12 m4 cajaError"><input type="text" id="ancho" required><label for="ancho" class="indigo-text">Ancho (cm):</label><small class="oculto">Error Mensaje</small></div><div class="input-field col s12 m4 cajaError"><input type="text" id="largo" required><label for="largo" class="indigo-text">Largo (cm):</label><small class="oculto">Error Mensaje</small></div><div class="input-field col s12 m4 cajaError"><input type="text" id="alto" required><label for="alto" class="indigo-text">Alto (cm):</label><small class="oculto">Error Mensaje</small></div><div class="input-field col s12 m4 cajaError"><input type="text" id="peso" required><label for="peso" class="indigo-text">Peso Caja (kg.):</label><small class="oculto">Error Mensaje</small></div></div></div>');
                        const menuEnvios2 = document.getElementById("menuEnvios2");
                        menuEnvios2.classList.remove("oculto");
                        menuEnvios2.className = " descubierto";
                    }
                    else {
                        //Si desmarcamos el checkbox de caja eliminamos el nodo
                        menuEnvios2.parentNode.removeChild(menuEnvios2);
                    }
                });
                const paqueteTipoSobre = document.querySelector("input[name=sobre]");
                paqueteTipoSobre.addEventListener('change', function () {
                    //Si se ha seleccionado el tipo de paquete caja aparecera el siguiente menu
                    if (this.checked) {
                        menuEnvios2.parentNode.removeChild(menuEnvios2);
                    }
                });
                //validamos el formulario de Envio Internacional
                validaEnvInternac();
            }
            else if (pro == "mudanza") {
                //Primero limpiamos el div
                menuVariable.innerHTML = '';
                menuVariable.insertAdjacentHTML("afterbegin", '<div id="menuMudanza" class="row center espacios"><p class="col s4 indigo-text">Seleccione una fecha disponible para que uno de nuestros agentes realice una evaluación para calcular su presupuesto</p><div class="col s3 espacios center"><input type="date" name="calendMudanza" id="calendMudanza"><small class="oculto">Error Mensaje</small></div></div>');
                validaMudanza();
            }
            else if (pro == "rentalCar") {
                //Primero limpiamos el div
                menuVariable.innerHTML = '';
                menuVariable.insertAdjacentHTML("afterbegin", '<div class="col s12 m6 eapacios"><p class="bolDer">Selecciona el Vehiculo de tu Preferencia:</p><select id="vehiculo"><option></option><option value="vehiculo1">Marca1  Modelo1 Año1</option><option value="vehiculo2">Marca2  Modelo2 Año2</option><option value="vehiculo3">Marca3  Modelo3 Año3</option></select><small class= "oculto">Error Mensaje</small></div><div class="col s12 m3 center"><p class="bolDer">Fecha Inicio</p><input type="date" id="inicioRentalC"><small class= "oculto">Error Mensaje</small></div><div class="col s12 m3 center"><p class="bolDer">Fecha Fin</p><input type="date" id="finRentalC"><small class= "oculto">Error Mensaje</small></div>');
                validaRentalCar();
            }
            else if (pro == "personalShopper") {
                //Primero limpiamos el div
                menuVariable.innerHTML = '';
                menuVariable.insertAdjacentHTML("afterbegin", '<div id="menuPerSho" class="row center"><p class="col s5 indigo-text">Seleccione una fecha disponible e indique el numero de horas en que desea agendar el servicio de Personal Shopper</p><div class="col s4"><span><input type="date" name="calendPersho" id="calendPersho"><small class= "oculto">Error Mensaje</small></span><span><input type="number" placeholder="Duración" name="horasPersho" id="horasPersho"><small class= "oculto">Error Mensaje</small></span></div></div>');
                validaPersonalShopper();
            }
            else if (pro == "") {
                //Limpiamos el div
                menuVariable.innerHTML = '';
            }
        });
        //Programacion del Boton Volver
        let botonVolver = document.getElementById("botonVolver");
        botonVolver.addEventListener("click", () => {
            formulario2.className = "oculto";
            nombre.disabled = false;
            apellido.disabled = false;
            telefono.disabled = false;
            correo.disabled = false;
            borrarForm3();
        });
    }
    //Validacion de formulario de Envio Internacional
    function validaEnvInternac() {
        const usaVzla = document.getElementById('usaVzla');
        const usaCol = document.getElementById('usaCol');
        let selUsaVzla = 0;
        let selUsaCol = 0;
        const aereo = document.getElementById("aereo");
        const maritimo = document.getElementById("maritimo");
        let selAereo = 0;
        let selMaritimo = 0;
        const caja = document.getElementById("caja");
        const sobre = document.getElementById("sobre");
        let selCaja = 0;
        let selSobre = 0;
        let validaF2 = {
            ancho: false,
            alto: false,
            largo: false,
            peso: false,
        };
        const elSwitch = document.getElementById("casillero");
        let i = 0;
        let casillero = 0;
        //Envio de Usa aVzla o de Usa a Col. Nos aseguramos que solo uno este marcado
        usaVzla.addEventListener("change", function () {
            if (this.checked) {
                usaCol.checked = false;
                selUsaVzla = 1;
                selUsaCol = 0;
                inputsEnvioInternac.destino = true;
                validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                validacionEnvioInternacional();
            } else if (this.checked == false) {
                selUsaVzla = 0;
                inputsEnvioInternac.destino = false;
                validacionEnvioInternacional();
            }
        });
        usaCol.addEventListener("change", function () {
            if (this.checked) {
                usaVzla.checked = false;
                selUsaCol = 1;
                selUsaVzla = 0;
                inputsEnvioInternac.destino = true;
                validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                validacionEnvioInternacional();
            } else if (this.checked == false) {
                selUsaCol = 0;
                inputsEnvioInternac.destino = false;
                validacionEnvioInternacional();
            }
        });
        //Envio aereo o maritimo. Nos aseguramos que solo uno este marcado
        aereo.addEventListener("change", function () {
            if (this.checked) {
                maritimo.checked = false;
                selAereo = 1;
                selMaritimo = 0;
                inputsEnvioInternac.tipoEnv = true;
                validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                validacionEnvioInternacional();
            } else if (this.checked == false) {
                selAereo = 0;
                inputsEnvioInternac.tipoEnv = false;
                validacionEnvioInternacional();
            }
        });
        maritimo.addEventListener("change", function () {
            if (this.checked) {
                aereo.checked = false;
                selMaritimo = 1;
                selAereo = 0;
                inputsEnvioInternac.tipoEnv = true;
                validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                validacionEnvioInternacional();
            } else if (this.checked == false) {
                selMaritimo = 0;
                inputsEnvioInternac.tipoEnv = false;
                validacionEnvioInternacional();
            }
        });
        //Paquete tipo sobre o tipo caja. Nos aseguramos que solo uno este marcado
        caja.addEventListener("change", function () {
            if (this.checked) {
                borrarSimulPres();
                borrarForm3();
                sobre.checked = false;
                selCaja = 1;
                selSobre = 0;
                const ancho = document.getElementById("ancho");
                const alto = document.getElementById("alto");
                const largo = document.getElementById("largo");
                const peso = document.getElementById("peso");
                //Validar que se rellenen los campos de las medidas y peso
                ancho.addEventListener("blur", () => {
                    let ancho_re = /^[0-9]{1,4}$/;
                    if (ancho.value == "" || ancho.value == null) {
                        validaF2.ancho = false;
                        setErrorFor(ancho, "El campo ancho esta vacio");
                    } else {
                        if (!ancho_re.exec(ancho.value)) {
                            validaF2.ancho = false;
                            setErrorFor(ancho, "El ancho debe ser en centimetros");
                        } else {
                            validaF2.ancho = true;
                            setSuccessFor(ancho);
                            validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                            validacionEnvioInternacional();
                        }
                    }
                });
                alto.addEventListener("blur", () => {
                    let alto_re = /^[0-9]{1,4}$/;
                    if (alto.value == "" || alto.value == null) {
                        validaF2.alto = false;
                        setErrorFor(alto, "El campo alto esta vacio");
                    } else {
                        if (!alto_re.exec(alto.value)) {
                            validaF2.alto = false;
                            setErrorFor(alto, "El alto debe ser en centimetros");
                        } else {
                            validaF2.alto = true;
                            setSuccessFor(alto);
                            validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                            validacionEnvioInternacional();
                        }
                    }
                });
                largo.addEventListener("blur", () => {
                    let largo_re = /^[0-9]{1,4}$/;
                    if (largo.value == "" || largo.value == null) {
                        validaF2.largo = false;
                        setErrorFor(largo, "El campo largo esta vacio");
                    } else {
                        if (!largo_re.exec(largo.value)) {
                            validaF2.largo = false;
                            setErrorFor(largo, "El largo debe ser en centimetros");
                        } else {
                            validaF2.largo = true;
                            setSuccessFor(largo);
                            validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                            validacionEnvioInternacional();
                        }
                    }
                });
                peso.addEventListener("blur", () => {
                    let peso_re = /^[0-9]{1,4}$/;
                    if (peso.value == "" || peso.value == null) {
                        validaF2.peso = false;
                        setErrorFor(peso, "El campo peso esta vacio");
                    } else {
                        if (!peso_re.exec(peso.value)) {
                            validaF2.peso = false;
                            setErrorFor(peso, "El peso debe ser en centimetros");
                        } else {
                            validaF2.peso = true;
                            setSuccessFor(peso);
                            validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
                            validacionEnvioInternacional();
                        }
                    }
                });
            } else if (this.checked == false) {
                inputsEnvioInternac.tipoPaq = false;
                validacionEnvioInternacional();
                selCaja = 0;
            }
        });
        sobre.addEventListener("change", function () {
            if (this.checked) {
                caja.checked = false;
                selSobre = 1;
                selCaja = 0;
                validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
            } else if (this.checked == false) {
                selSobre = 0;
                inputsEnvioInternac.tipoPaq = false;
                validacionEnvioInternacional();
            }
        });
        //Seleccion de Servicio de Casillero. Es opcional, no obligatorio
        elSwitch.addEventListener("change", function () {
            i++;
            if (i % 2 == 0) {
                casillero = 0;
            } else {
                casillero = 20;
            }
            validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero);
        });
        //Si todo va bien podemos enviar el Formulario 2, si no dejamos un mensaje de error
        formulario2.addEventListener("submit", (e) => {
            e.preventDefault();
            if (validaF2) {
                alert("Formulario Enviado");
                formulario2.submit();
            } else {
                alert("Error: Formulario incompleto");
            }
        });
    }
    //Validacion de formulario de Mudanza
    function validaMudanza() {
        const calendMudanza = document.getElementById("calendMudanza");
        borrarSimulPres();
        borrarForm3();
        calendMudanza.addEventListener("change", () => {
            const fecha = new Date();
            const fechaActual = fecha.getTime();
            const fechaSeleccionada = calendMudanza.valueAsNumber;
            if (fechaSeleccionada > fechaActual) {
                setSuccessFor(calendMudanza);
                cargaForm3();
            } else {
                setErrorFor(calendMudanza, "Debe ingresar una fecha valida");
                borrarForm3();
            }
        });
    }
    //Validacion de formulario de Personal Shopper
    function validaPersonalShopper() {
        const calendPersho = document.getElementById("calendPersho");
        const horasPersho = document.getElementById("horasPersho");
        let inputsPersShop = {
            dia: false,
            horas: false,
        }
        borrarSimulPres();
        borrarForm3();
        calendPersho.addEventListener("change", () => {
            const fecha = new Date();
            const fechaActual = fecha.getTime();
            const fechaSeleccionada = calendPersho.valueAsNumber;
            if (fechaSeleccionada > fechaActual) {
                inputsPersShop.dia = true;
                setSuccessFor(calendPersho);
                validacionPersonalShop();
            } else {
                inputsPersShop.dia = false;
                setErrorFor(calendPersho, "Debe ingresar una fecha valida");
                validacionPersonalShop();
            }
        });
        horasPersho.addEventListener("change", () => {
            if (horasPersho.value > 0 && horasPersho.value <= 8) {
                inputsPersShop.horas = true;
                total = horasPersho.value * 30; //30 dolares por hora
                setSuccessFor(horasPersho);
                validacionPersonalShop();
            } else {
                inputsPersShop.horas = false;
                setErrorFor(horasPersho, "Debe ingresar un lapso comprendido entre 0 y 8 horas");
                validacionPersonalShop();
            }
        });
        function validacionPersonalShop() {
            let errorV = false;
            for (const property in inputsPersShop) {
                if (inputsPersShop[property] == false) {
                    errorV = true;
                    borrarSimulPres();
                    borrarForm3();
                }
            }
            if (!errorV) {
                //SI ES VALIDO muestro el total
                mostrarSimulPres();
                cargaForm3();
            }
        }
    }
    //Validacion de formulario de Rental Car
    function validaRentalCar() {
        const vehiculo = document.getElementById("vehiculo");
        const inicioRentalC = document.getElementById("inicioRentalC");
        const finRentalC = document.getElementById("finRentalC");
        let precioVehiculo;
        let dias;
        let inputsRentalCar = {
            vehic: false,
            fechas: false,
        }
        const fecha = new Date();
        const fechaActual = fecha.getTime();
        vehiculo.addEventListener("change", function () {
            const vehiculoSel = vehiculo.options[vehiculo.selectedIndex].value;
            if (vehiculoSel == "") {
                setErrorFor(vehiculo, "Debe seleccionar un vehiculo de la lista");
                inputsRentalCar.vehic = false;
                validaInputsRentalC();
            } else {
                setSuccessFor(vehiculo);
                inputsRentalCar.vehic = true;
                if (vehiculoSel == "vehiculo1") {
                    precioVehiculo = 100;
                } else if (vehiculoSel == "vehiculo2") {
                    precioVehiculo = 120;
                } else if (vehiculoSel == "vehiculo3") {
                    precioVehiculo = 150;
                }
                validaInputsRentalC();
            }
        });
        inicioRentalC.addEventListener("change", () => {
            revisionFechas();
        });
        finRentalC.addEventListener("change", () => {
            revisionFechas();
        })
        function revisionFechas() {
            let fechaInicio = inicioRentalC.valueAsNumber;
            let fechaFin = finRentalC.valueAsNumber;
            if (fechaActual < fechaInicio) {
                if (fechaInicio < fechaFin) {
                    dias = (fechaFin - fechaInicio) / (86400000); //86400000 es el equivalente a 1 dia
                    
                    inputsRentalCar.fechas = true;
                    setSuccessFor(inicioRentalC);
                    setSuccessFor(finRentalC)
                    validaInputsRentalC();
                } else {
                    setErrorFor(finRentalC, "Fecha de finalizacion invalida");
                    inputsRentalCar.fechas = false;
                    validaInputsRentalC();
                }
            } else {
                setErrorFor(inicioRentalC, "Fecha de inicio invalida");
                inputsRentalCar.fechas = false;
                validaInputsRentalC();
            }
        }
        function validaInputsRentalC() {
            let errorV = false;
            for (const property in inputsRentalCar) {
                if (inputsRentalCar[property] == false) {
                    errorV = true;
                    borrarSimulPres();
                    borrarForm3();
                }
            }
            if (!errorV) {
                total = dias * precioVehiculo;
                //SI ES VALIDO muestro el total
                mostrarSimulPres();
                cargaForm3();
            }
        }
    }
    function validacionForm2(f2Correcto, selUsaVzla, selUsaCol, selMaritimo, selAereo, selCaja, selSobre, validaF2, casillero) {
        let cualServ = document.getElementById("losServicios").options[document.getElementById("losServicios").selectedIndex].value;
        let coeficienteCol;
        //Primero validamos que este check en los terminos de aceptacion
        if (cualServ == "envioInternacional") {
            //Verificamos que esten seleccionadas una opcion de cada categoria
            if ((selUsaVzla == 1 || selUsaCol == 1) && (selAereo == 1 || selMaritimo == 1) && (selCaja == 1 || selSobre == 1)) {
                //Si el envio es a colombia incremento un 10% el precio del envio
                if (selUsaCol == 1) {
                    coeficienteCol = 1.1;
                } else {
                    coeficienteCol = 1;
                }
                if (caja.checked) {
                    const ancho = document.getElementById("ancho");
                    const alto = document.getElementById("alto");
                    const largo = document.getElementById("largo");
                    const peso = document.getElementById("peso");
                    if (validaF2.ancho == validaF2.alto == validaF2.largo == validaF2.peso == true) {
                        let volumen = (ancho.value * alto.value * largo.value);
                        //Calculamos el precio por volumen
                        if (volumen >= 216000) {
                            precioVolumen = volumen * 70 / 216000;
                        } else if (volumen > 0 && volumen < 216000) {
                            precioVolumen = 70;
                        }
                        //Calculamos el precio por peso
                        if (peso.value >= 25) {
                            precioPeso = peso.value * 70 / 25;
                        } else if (peso.value > 0 && peso.value < 25) {
                            precioPeso = 80;
                        }
                        //Validamos que peso y volumen sean mayores que cero
                        if (volumen > 0 && peso.value > 0) {
                            f2Correcto = true;
                        } else {
                            f2Correcto = false;
                        }
                        //Si es por aereo o maritimo y el mas alto entre volumen y peso. Calculamos el precio
                        if (selAereo == 1 && precioVolumen > precioPeso) {
                            total = (selAereo * precioVolumen * coeficienteCol * 1.1) + casillero;
                            inputsEnvioInternac.tipoPaq = true;
                            validacionEnvioInternacional();
                            //console.log("TOTAL aereo por volumen: " + total + "    casillero=" + casillero);
                        } else if (selAereo == 1 && precioPeso > precioVolumen) {
                            total = (selAereo * precioPeso * coeficienteCol * 1.1) + casillero;
                            inputsEnvioInternac.tipoPaq = true;
                            validacionEnvioInternacional();
                            //console.log("TOTAL aereo por peso: " + total + "    casillero=" + casillero);
                        } else if (selMaritimo == 1 && precioVolumen > precioPeso) {
                            total = (selMaritimo * precioVolumen * coeficienteCol) + casillero;
                            inputsEnvioInternac.tipoPaq = true;
                            validacionEnvioInternacional();
                            //console.log("TOTAL maritimo por volumen: " + total + "    casillero=" + casillero);
                        } else if (selMaritimo == 1 && precioPeso > precioVolumen) {
                            total = (selMaritimo * precioPeso * coeficienteCol) + casillero;
                            inputsEnvioInternac.tipoPaq = true;
                            validacionEnvioInternacional();
                            //console.log("TOTAL maritimo por peso: " + total + "    casillero=" + casillero);
                        }
                        //mostrarSimulPres(total);
                    } else {
                        f2Correcto = false;
                        inputsEnvioInternac.tipoPaq = false;
                        validacionEnvioInternacional();
                    }
                } else if (sobre.checked) {
                    if (selAereo == 1) {
                        total = (50 * coeficienteCol * 1.15) + casillero;
                        inputsEnvioInternac.tipoPaq = true;
                        validacionEnvioInternacional();
                        //console.log("TOTAL aereo sobre: " + total + "    casillero=" + casillero);
                    } else if (selMaritimo == 1) {
                        total = (50 * coeficienteCol) + casillero;
                        inputsEnvioInternac.tipoPaq = true;
                        validacionEnvioInternacional();
                        //console.log("TOTAL maritimo sobre: " + total + "    casillero=" + casillero);
                    }
                    //mostrarSimulPres(total);
                    f2Correcto = true;
                }
            } else {
                f2Correcto = false;
            }
        } else if (cualServ == "mudanza") {
            console.log("Mudanza");
            //si mete todos los datos saldran los botones
        } else if (cualServ == "rentalCar") {
            mostrarSimulPres();
            console.log("rentalCar");
        } else if (cualServ == "personalShopper") {
            mostrarSimulPres();
            console.log("personalShopper");
        }
        return (f2Correcto);
    }
    function mostrarSimulPres() {
        const simuladorPresup = document.getElementById("cajaResultado");
        const monto = document.getElementById("monto");
        monto.innerHTML = total.toFixed(2);
        simuladorPresup.classList.remove("oculto");
        simuladorPresup.className = " descubierto";
    }
    function borrarSimulPres() {
        const simuladorPresup = document.getElementById("cajaResultado");
        const monto = document.getElementById("monto");
        simuladorPresup.classList.remove("descubierto");
        simuladorPresup.className = " oculto";
    }
    function cargaForm3() {
        if (pro == "") {
            borrarForm3();
        } else {
            const formulario3 = document.querySelector("#formulario3");
            formulario3.classList.remove("oculto");
            formulario3.className = " descubierto";
        }
    }
    function borrarForm3() {
        const formulario3 = document.querySelector("#formulario3");
        formulario3.classList.remove("descubierto");
        formulario3.className = " oculto";
    }
    //Nos preparamos para la validacion del formulario 3 y el envio final
    acepto.addEventListener("change", function () {
        if (acepto.checked) {
            botonEnviar.disabled = false;
        } else {
            botonEnviar.disabled = true;
        }
    });
}

//PROGRAMANOS EL MENU DE GALERIA
const slideshow = document.getElementById("slideshow-principalgal")
if (slideshow) {
    let indexValue = 0;
    const fotos = document.querySelectorAll(".fotosgal");

    //creo los circulos a mostrar que dependeran de la cantidad de fotos
    for (indexValue = 0; indexValue < (fotos.length); indexValue++) {
        const circulo = document.createElement('div');
        circulo.id = indexValue;
        circulo.classList = "todosLosInd Circlesgal";
        const indicadores = document.getElementById("indicadoresgal");
        indicadores.appendChild(circulo);
    }

    function mostrarGaleria(indexValue, fotos) {
        showImg(indexValue, fotos);
        let bDer = document.getElementById("derecho");
        let bIzq = document.querySelector(".leftgal");
        //click en boton derecho
        bDer.addEventListener("click", () => {
            console.log("diste click der");
            indexValue += +1;
            console.log("diste al boton derecho, indexValue= " + indexValue);
            if (indexValue > (fotos.length - 1)) {
                indexValue = 0;
            }
            showImg(indexValue, fotos);
        });
        //click en boton izquierdo
        bIzq.addEventListener("click", () => {
            console.log("diste click izq");
            indexValue += -1;
            if (indexValue < 0) {
                indexValue = (fotos.length - 1);
            }
            showImg(indexValue, fotos);
        });

        function showImg(indexValue, fotos) {
            let i;
            const circulosVacios = document.getElementsByClassName("todosLosInd");
            const porcentaje_base = 100 / fotos.length;
            let progressBar = document.getElementById("progress-bar");

            //hacemos que todas las imagenes esten fuera de la pantalla
            for (i = 0; i < fotos.length; i++) {
                fotos[i].style.left = "100%";
            }
            for (i = 0; i < circulosVacios.length; i++) {
                circulosVacios[i].style.backgroundColor = "transparent";
            }
            //IMPORTANTE: la 1era imagen que se muestra al cargar la pagina se declaraen el css con el left= 0% y es la img1   

            //designamos la imagen por la que va a cambiar
            fotos[indexValue].style.left = "0%";
            //designamos el circulo a marcar
            circulosVacios[indexValue].style.backgroundColor = "white";
            //designamos la posicion barra de progreso
            progressBar.style.width = (porcentaje_base * (indexValue + 1) + "%");
        }
    }

    //aqui hacemos el bucle infinito para que se repitan
    setInterval(() => {
        indexValue++;//hacemos que cada vez que se entre al bucle muestre la siguiente foto
        if (indexValue > (fotos.length - 1)) { //pero que si llega al final vuelva al inicio
            indexValue = 0;
        }
        mostrarGaleria(indexValue, fotos);
    }, 3000);
}

//PROGRAMANOS EL MENU DE CONTACTO
const contacto = document.getElementById("contacto");
if (contacto) {
    console.log("estas en contacto");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var map = L.map('map', {
                center: [latitude, longitude],
                zoom: 12
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            //ICONO DE INICIO
            var inicio = L.icon({
                iconUrl: '../assets/image/ubicacionVerde.png',
                shadowUrl: '../assets/image/sombreVerde.png',

                iconSize: [45, 45], // size of the icon
                shadowSize: [45, 45], // size of the shadow
                iconAnchor: [23, 23], // point of the icon which will correspond to marker's location
                shadowAnchor: [23, 23],  // the same for the shadow
                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
            });

            //ICONO DE FINAL
            var final = L.icon({
                iconUrl: '../assets/image/ubicacionRojo.png',
                shadowUrl: '../assets/image/sombraRojo.png',

                iconSize: [45, 45], // size of the icon
                shadowSize: [45, 45], // size of the shadow
                iconAnchor: [23, 23], // point of the icon which will correspond to marker's location
                shadowAnchor: [23, 23],  // the same for the shadow
                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
            });
            //ICONO DE TRACK
            var track = L.icon({
                iconUrl: '../assets/ubicacionVerde.png',
                shadowUrl: '../assets/sombraVerde.png',

                iconSize: [45, 45], // size of the icon
                shadowSize: [45, 45], // size of the shadow
                iconAnchor: [23, 23], // point of the icon which will correspond to marker's location
                shadowAnchor: [23, 23],  // the same for the shadow
                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
            });

            var control = L.Routing.control({
                waypoints: [
                    L.latLng(latitude, longitude),
                    L.latLng(40.44142, -3.69743)
                ],
                language: 'es',
                createMarker: function (i, wp, nWps) {
                    switch (i) {
                        case 0:
                            return L.marker(wp.latLng, {
                                icon: inicio,
                                draggable: true
                            }).bindPopup("<b>" + "Inicio" + "</b>");
                        case nWps - 1:
                            return L.marker(wp.latLng, {
                                icon: final,
                                draggable: true
                            }).bindPopup("<b>" + "Destino" + "</b>");
                        default:
                            return L.marker(wp.latLng, {
                                icon: track,
                                draggable: true
                            }).bindPopup("<b>" + "Waypoint" + "</b>");
                    }
                }
            }).addTo(map);
        });
    }
    else {
        var map = L.map('map', {
            center: [40.44142, -3.69743],
            zoom: 17
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}