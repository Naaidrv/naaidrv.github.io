const boton = document.getElementById('btnMO');
const conus = window.matchMedia('(prefers-color-scheme: dark)')
const locals = localStorage.getItem('theme');

if(locals === 'dark'){
    document.body.classList.toggle('dark-theme')
}else if(locals === 'light'){
    document.body.classList.toggle('light-theme')
}

boton.addEventListener('click', () => {
    //console.log(conus.matches)
    let colorTheme;

    if(conus.matches){
        //Se entra en Modo Oscuro
        document.body.classList.toggle('light-theme')
        colorTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark'
    }else{
        document.body.classList.toggle('dark-theme')
        colorTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    }

    localStorage.setItem('theme', colorTheme)

});


document.getElementById('but').addEventListener('click', function(){
var icon = document.getElementById('btnMO');
if(locals === 'dark'){
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');    
} else if(locals === 'light'){
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}
})
