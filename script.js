const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseButton = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const imagemPausePlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer')


const iniciarOuPauseButton = document.querySelector('#start-pause span')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const iniciarAlerta = new Audio('./sons/play.wav')
const pauseAlerta = new Audio('./sons/pause.mp3')
const alarme = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoButton.classList.add('active')
})

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoButton.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove("active")
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
        titulo.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
        ` 
            break;
        case "descanso-curto":
            titulo.innerHTML = `
        Que tal uma respirada ?<br>
        <strong class="app__title-strong">Faça uma pausa curta.</strong>
        `
            break;
        case"descanso-longo":
        titulo.innerHTML = `
        Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
      // alarme.play()
        alert('Tempo finalizado!')
        zerar()
        return
    } 
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseButton.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pauseAlerta.play()
        zerar()
        return
    }
    iniciarAlerta.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPauseButton.textContent = "Pausar"
    imagemPausePlay.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPauseButton.textContent = 'Começar'
    intervaloId = null
    imagemPausePlay.setAttribute('src', './imagens/play_arrow.png')
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second:"2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}` 
}

mostrarTempo()