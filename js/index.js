//Tekijät: Tapio Humaljoki
//Viimeisin muutos 4.5.2022
//Ohjelma avaa etusivulla tiedot tekijöistä tai videon suunnittelu- ja tuotantoprosessista syötetystä salasanasta riippuen.
//Samalla salasana laatikko piiloitetaan.
//Ohjelma myös sulkee avatut tiedot kun sulkemisnappia painetaan tyhjentäen samalla salasana laatikon.

const staff = document.getElementById('staff');
const process = document.getElementById('process')
const pswrd = document.getElementById('passField');
const open = document.getElementById('enter');
const ph = document.getElementById('passHeader')
const close = document.getElementById('close')
const close2 = document.getElementById('close2')

function passwordCheck(){
    let password = pswrd.value
    if(password === "Metropolia"){
        staff.className = 'visible';
        ph.className = 'hidden';
    }
    else if(password === "Video"){
        process.className = 'visible';
        ph.className = 'hidden';
    }
    else{
        alert('Väärä salasana');
    }
}

function shut(){
    staff.className = 'hidden';
    process.className = 'hidden';
    ph.className = 'visible';
    pswrd.value = null;
}
open.addEventListener('click',passwordCheck);
close.addEventListener('click', shut);
close2.addEventListener('click', shut);