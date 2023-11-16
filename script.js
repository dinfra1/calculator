// const btnUno = document.getElementById('none');
// const buttons = document.querySelectorAll('.btn');


// buttons.forEach(button => {
//     button.addEventListener('click', ()=>{
//         let num = button.value;
//         let pos = 1;
//         if(num === '*'){
//             console.log("aqui")
//             pos++;   
//         }else{
//             console.log("Entra aqui");
//             num = button.value;
//             pos = 1 + pos
//         }
//         console.log(pos)
//         document.querySelector('.panel').innerHTML += num
//     })
// });
// logica para analizra
const info = document.querySelector('.time');
let runnigTotal = 0;
let buffer = '0';
let previusOperator;
let resultado;

 
// obtener la fecha y la hora

function horaNew(){
    let today = new Date();
    let hora = today.getHours();
    let minutes = today.getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let resul = hora + ":" + minutes;
    
    info.innerText = resul;
}

const panel = document.querySelector('.panel');

function buttonClick(value){
    if(isNaN(value)){
        // console.log(value)
        handleSymbol(value);
    }else{
        handleNumber(value)
    }
    panel.innerText = buffer; 
}

function handleSymbol(symbol){
    // console.log(symbol)
    switch(symbol){
        case 'AC':
            resultado = confirm("¿Deseas eliminar?");
            if(resultado === true){
                buffer = '0';
            runnigTotal = 0;
            break;
            }else{
                return;
            }
        case '=':
            if(previusOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previusOperator = null;
            buffer = runnigTotal;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
        case '%':
            hadleMath(symbol);
            break;
    }
}
function hadleMath(symbol){
    if(buffer === 0){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runnigTotal === 0){
        // console.log(runnigTotal)
        runnigTotal = intBuffer;
        // console.log(runnigTotal)
    }else{
        // console.log(runnigTotal)
        flushOperation(intBuffer);
    }
    previusOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    // console.log(intBuffer)
    if(previusOperator === '+'){
        runnigTotal += intBuffer;
    }else if(previusOperator === '-'){
        runnigTotal -= intBuffer;
    }else if(previusOperator === '×'){
        runnigTotal *= intBuffer;
    }else if(previusOperator === '÷'){
        runnigTotal /= intBuffer;
    }else if(previusOperator === '%'){
        runnigTotal *= intBuffer/100 
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer =  numberString
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.button').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
        horaNew();
    })
}

init();