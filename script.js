const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')

focoButton.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
})

curtoButton.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
})

longoButton.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
})