document.querySelector('.busca').addEventListener('submit', async (event)=>{
    //PREVENIR COMANDO DEFAULT
    event.preventDefault()

    //ACESSANDO O QUE O USUSARIO DIGITOU
    var input = document.querySelector('#searchInput').value 

    //TESTANDO SE INPUT ESTÁ VAZIO
    if(input !== ''){
        clearInfo()
        showWarning('Carregando...')

        //MODIFICAR URL DE API USANDO A VAR INPUT
        //encodeURI transforma string em string para URL
        //API KEY ESTÁ NA CONTA DO OPENWEATHER
        //METRIC
        //LANG
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=641cb8a0c6e13344ba503fb8c34c1e68&units=metric&lang=pt_br`
        //USANDO FETCH - PROMISE
        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                icon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else {
            clearInfo()
            showWarning('Não encontramos essa localização')
        }

    }else {
        clearInfo()
    }

})

function showInfo(json){
    showWarning('')

    document.querySelector('.resultado').style.display = 'block'

    //TRABALHANDO COM AS INFORMAÇÕES DO OBJETO 'JSON'
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    //CHANGING IMG THROUGH QUERY SELECTOR
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`)
    
    document.querySelector('.ventoPonto').style.transform= `rotate(${json.windAngle-90}deg)`
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}