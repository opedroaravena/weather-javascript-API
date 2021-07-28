document.querySelector('.busca').addEventListener('submit', (event)=>{
    //PREVENIR COMANDO DEFAULT
    event.preventDefault()

    //ACESSANDO O QUE O USUSARIO DIGITOU
    var input = document.querySelector('#searchInput').value 

    //TESTANDO SE INPUT ESTÁ VAZIO
    if(input !== ''){
        showWarning('Carregando...')
    }else {

    }

})

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}