$(document).ready(function(){
    $(window).scroll(function(){
        // Barra de navegación "pegada"
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Animación
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    // Efectoen la barra de Navegación
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Animación del textotipo maquina de escribir
    var typed = new Typed(".typingen", {
        strings: ["Front-end Dev Jr.", "Designer UI/UX"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

window.addEventListener('load', () => {
    const conload = document.querySelector('.conload')
    conload.style.opacity = 0
    conload.style.visibility = 'hidden'
})