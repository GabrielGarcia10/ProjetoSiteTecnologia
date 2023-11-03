window.onload = function(){
    stylePage = document.getElementById('stylePage');
    switch_theme = new switchTheme(document.getElementById('switch_theme').children);
    loadPreferences();
    systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(true);
    updateView();
}

//Preferencias
var systemDarkTheme;
var prefTheme;

//Preferencias manager
function loadPreferences(){
    prefTheme = sessionStorage.getItem('prefTheme');
}

function savePreferences(){
    sessionStorage.setItem('prefTheme',prefTheme);
}

function removePreferences(){
    sessionStorage.clear();
    alert('Todas as preferências foram removidas!');
    location.reload();
}


//Tema
function setTheme(_onload = false){
    var link = String(stylePage.getAttribute('href'));
    for (let i = link.length-1; i >= 0; i--) {
        if (link[i] == '/'){
            link = link.substring(0,i+1);
            i = 0;
        }
    }
    if(prefTheme  =='L'){
        stylePage.href = link + "style.css";
        if(_onload){
            switch_theme.setValue('L');
        }
    }else if (prefTheme == 'D'){
        stylePage.href = link + "styleDark.css";
        if(_onload){
            switch_theme.setValue('D');
        }
    }else{
        if(systemDarkTheme){
            stylePage.href = link + "styleDark.css";
        }else{
            stylePage.href = link + "style.css";
        }
        if(_onload){
            switch_theme.setValue('A');
        }
    }
}

//Instancias
var stylePage;
let switch_theme;


//Botão Switch
function switch_themeClickEvent(){
    prefTheme = document.querySelector('input[name=switch_theme]:checked').value;
    savePreferences();
    setTheme();
    updateView();
}


//Atualizar Tela
function updateView(){
    //switch_theme
    switch_theme.update();
}

//Animação do menu hamburguer
async function btn_navHamburguerClickEvent(_object){
    _object.classList.toggle("change");

    var _nav = document.getElementsByTagName('nav')[0];
    if(_object.getAttribute('class') == 'btn-navHamburguer'){
        _nav.setAttribute('class','retrat');
        await new Promise(r => setTimeout(r, 500));
        _nav.setAttribute('class','');
    }else{
        _nav.setAttribute('class','expand');
    }

    await new Promise(r => setTimeout(r, 500));

    if(_object.getAttribute('class') == 'btn-navHamburguer change' && _nav.getAttribute('class') == ''){
        _object.classList.toggle("change");
    }
}



//Classes
class switchTheme{
    constructor(objectHTML){
        this.objectInstance = objectHTML;
    }

    setValue(value){
        for (let i = 0; i < this.objectInstance.length; i++) {
            if(this.objectInstance[i].firstChild.value == value){
                this.objectInstance[i].firstChild.setAttribute('checked','true');
            }
        }
        this.update();
    }

    getValue(){
        return this.objectInstance;
    }

    update(){
        for (let i = 0; i < this.objectInstance.length; i++) {
            if(this.objectInstance[i].firstChild.checked){
                this.objectInstance[i].setAttribute('class','selected');
            }else{
                this.objectInstance[i].setAttribute('class','');
            }
        }
    }
}