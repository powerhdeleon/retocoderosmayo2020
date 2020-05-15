import { html, define } from 'https://unpkg.com/hybrids@4.1.8/src';

export function save(host) {
   host.action=true;
   fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            //simulamos que tarda la pendejada
            setTimeout(()=>{
                host.action=false; 
                host.pantalla = 2;
            }, 1000);
            
        });
   
}
  
export function evaluar(host, event){
    host.email=event.target.value;
    // validamos correo electrónico
    let emailPattern= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if( emailPattern.test(event.target.value)){
        host.desactivado=false;
        console.log("valido");
    }else{
        host.desactivado=true;
        console.log("invalido");
    }
}

export const Sub = {
    classBtn: 'btn-hell',action:false, email:'',desactivado: true,pantalla: 1,
    render: ({ classBtn, action, email, desactivado, pantalla }) => html`
     <style>
        .texto{ color: #fff; text-align:center; font-family: arial}
        .input-text{ width:100%; font-size:15; border-radius:5px; margin-bottom:5px;}
        .btn-hell{ background:#f00; border: #f00; padding:10px; border-radius:5px; color: #000; font-weight:bold; cursor: pointer; width: 150px; height:40px; }
        .btn-hell:disabled{ background:#aaa; border: #f00; padding:10px; border-radius:5px; color: #000; font-weight:bold; cursor: pointer; width: 150px; height:40px; }
     </style>
     <div>
     ${
     pantalla==1 ?
     html`
     <div style="text-align:center;">
      <h1 class='texto'>Subscríbete a Hdeleon</h1>
     
      <div>

            <p class='texto' >Captura tu correo electrónico y todos tus bienes que tengas serán míos</p>
            ${
            desactivado && email.length>0 ?
            html`<span style="color:#f00">Correo electrónico invalido</span>`
            : html``
            }   
            <input   onkeydown="${evaluar}" type="text" class="input-text"> 
            <button disabled="${ desactivado }" class='${classBtn}' onclick="${save}">
                ${ action ?  html`<img width='30' height="20" src='media/fire.gif'>` : "Subscríbete" }
            </button>

      </div>
    </div>`:
    html`
    <div style="text-align:center;">
        <img style='width:50%' src='media/peach.gif'>
    </div>
    <br><br>
    <div class='texto'>Registrado con el correo: ${ email}</div>`
    }
    </div>`,
};
  
define('sub-tag', Sub);