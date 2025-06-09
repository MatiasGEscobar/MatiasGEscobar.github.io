// script.js

// Este es el listener principal que espera a que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', function() {

    // === CÓDIGO DEL MENÚ (Mueve todo este bloque aquí dentro) ===
    const smMenuBtn = document.querySelector('.main-header__sm-scr-nav-btn');
    const smMenu = document.querySelector('.main-header__sm-menu');
    const smMenuCloseBtn = document.querySelector('.main-header__sm-menu-close');

    const smMenuLinks = document.querySelectorAll('.main-header__sm-menu-link');
    const smMenuLink1 = document.querySelector('.main-header__sm-menu-link--1');
    const smMenuLink2 = document.querySelector('.main-header__sm-menu-link--2');
    const smMenuLink3 = document.querySelector('.main-header__sm-menu-link--3');
    const smMenuLink4 = document.querySelector('.main-header__sm-menu-link--4');

    if (smMenuBtn) { // Buena práctica: verificar que el elemento existe antes de adjuntar el listener
        smMenuBtn.addEventListener('click', () => {
            smMenu.style.transitionDelay = '0s';
            smMenu.classList.add('main-header__sm-menu--active');

            smMenuLink1.style.transitionDelay = '.5s';
            smMenuLink1.style.transform = 'translateY(0)';
            smMenuLink1.style.opacity = '1';

            smMenuLink2.style.transitionDelay = '.8s';
            smMenuLink2.style.transform = 'translateY(0)';
            smMenuLink2.style.opacity = '1';

            smMenuLink3.style.transitionDelay = '1.1s';
            smMenuLink3.style.transform = 'translateY(0)';
            smMenuLink3.style.opacity = '1';

            smMenuLink4.style.transitionDelay = '1.4s';
            smMenuLink4.style.transform = 'translateY(0)';
            smMenuLink4.style.opacity = '1';
        });
    }

    smMenuLinks.forEach((ele) => {
        ele.addEventListener('click', () => {
            smMenuLink4.style.transitionDelay = '0s';
            smMenuLink4.style.transform = 'translateY(50px)';
            smMenuLink4.style.opacity = '0';

            smMenuLink3.style.transitionDelay = '.3s';
            smMenuLink3.style.transform = 'translateY(50px)';
            smMenuLink3.style.opacity = '0';

            smMenuLink2.style.transitionDelay = '.6s';
            smMenuLink2.style.transform = 'translateY(50px)';
            smMenuLink2.style.opacity = '0';

            smMenuLink1.style.transitionDelay = '.9s';
            smMenuLink1.style.transform = 'translateY(50px)';
            smMenuLink1.style.opacity = '0';

            smMenu.style.transitionDelay = '1.2s';
            smMenu.classList.remove('main-header__sm-menu--active');

            setTimeout(() => {
                document.getElementById(ele.name).scrollIntoView();
            }, 1300);
        });
    });

    if (smMenuCloseBtn) { // Verificar si existe
        smMenuCloseBtn.addEventListener('click', () => {
            smMenuLink4.style.transitionDelay = '0s';
            smMenuLink4.style.transform = 'translateY(50px)';
            smMenuLink4.style.opacity = '0';

            smMenuLink3.style.transitionDelay = '.3s';
            smMenuLink3.style.transform = 'translateY(50px)';
            smMenuLink3.style.opacity = '0';

            smMenuLink2.style.transitionDelay = '.6s';
            smMenuLink2.style.transform = 'translateY(50px)';
            smMenuLink2.style.opacity = '0';

            smMenuLink1.style.transitionDelay = '.9s';
            smMenuLink1.style.transform = 'translateY(50px)';
            smMenuLink1.style.opacity = '0';

            smMenu.style.transitionDelay = '1.2s';
            smMenu.classList.remove('main-header__sm-menu--active');
        });
    }
    // === FIN DEL CÓDIGO DEL MENÚ ===


    // === CÓDIGO DEL SELECTOR DE COLOR (Mueve todo este bloque aquí dentro) ===
    const themeColorSelector = document.querySelector('.themeClrSelector');
    const themeColorSelectorInput = document.querySelector('.themeClrSelector__input');
    const root = document.documentElement;

    const hexToRgb = (hex) => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
            : null;
    };

    const eventFire = (el, etype) => {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            let evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    };

    if (themeColorSelector) { // **Añade esta verificación**
        themeColorSelector.addEventListener('click', () => {
            eventFire(themeColorSelectorInput, 'input');
        });
    }

    if (themeColorSelectorInput) { // **Añade esta verificación**
        themeColorSelectorInput.addEventListener('input', (e) => {
            setDynamicColor(e.target.value);
        });
    }

    const setDynamicColor = (color) => {
        const { r, g, b } = hexToRgb(`${color}`);
        root.style.setProperty('--themeColor', `${r},${g},${b}`);
    };
    // === FIN DEL CÓDIGO DEL SELECTOR DE COLOR ===


    // === SECCIÓN DEL LOGO (Mueve todo este bloque aquí dentro) ===
    const headerLogoConatiner = document.querySelector('.main-header__logo-container');

    if (headerLogoConatiner) { // Verificar si existe
        headerLogoConatiner.addEventListener('click', () => {
            location.href = 'index.html';
        });
    }
    // === FIN DE LA SECCIÓN DEL LOGO ===


    // === CÓDIGO DE FORMULARIO EMAILJS (Ya estaba dentro del DOMContentLoaded en mi última sugerencia) ===
    emailjs.init({
        publicKey: "CqwtpBxBFpPr5CGsU", // Tu Public Key de EmailJS
    });

    const form = document.getElementById('contactForm');

    if (form) {
        console.log('Formulario con ID "contactForm" encontrado. Adjuntando listener.');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Evento de submit detectado. Intentando enviar correo...');
            emailjs.sendForm('service_or439c5', 'template_miumfrc', this)
                .then(function() {
                    alert('¡Mensaje enviado con éxito!');
                    form.reset();
                    console.log('Correo enviado con éxito por EmailJS.');
                }, function(error) {
                    alert('¡Error al enviar el mensaje! Por favor, intenta de nuevo más tarde.');
                    console.error('FAILED...', error);
                });
        });
    } else {
        console.error('ERROR: No se encontró el formulario con ID "contactForm". Verifica tu HTML.');
    }

}); // <--- Cierra el DOMContentLoaded listener aquí