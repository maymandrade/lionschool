``/*******************************************************************************************
objetivo: Arquivo responável pelas funções utilizadas na pagina
autor: Mayara Martins
versão:1.0.0
data:27/07/2026
********************************************************************************************/
import { getAlunos, getAlunosCurso, getCursos, getDetalhesAluno, getStatusAlunos } from './api.js'

export async function abrirPagina(curso) {
    try {

        const container = document.getElementById('main')

        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }

        container.className = 'flex flex-col flex-1'

        // menu
        const menu = document.createElement('div')
        menu.className = 'flex w-full bg-[#BCC2E5] h-12 justify-between px-10 items-center'

        const dropdownStatus = document.createElement('div')
        dropdownStatus.className = 'relative inline-block text-left'

        const btnStatus = document.createElement('button')
        btnStatus.textContent = 'Status'
        btnStatus.className = 'text-[#3347B0] text-[18px] px-4 py-2'

        const divStatus = document.createElement('div')
        divStatus.className = 'flex flex-col absolute w-48 bg-[#3347B0] border border-gray-200 rounded-md shadow-lg hidden'

        dropdownStatus.addEventListener('mouseenter', () => {
            divStatus.classList.remove('hidden')
        })

        dropdownStatus.addEventListener('mouseleave', () => {
            divStatus.classList.add('hidden')
        })

        dropdownStatus.addEventListener('click', () => {
            divStatus.classList.toggle('hidden')
        })

        const finalizado = document.createElement('button')
        finalizado.textContent = 'Finalizado'
        finalizado.href = '#'
        finalizado.className = 'block px-4 py-2 text-sm text-white text-left  hover:bg-[#BCC2E5] hover:text-[#3347B0]'
        divStatus.appendChild(finalizado)

        const cursando = document.createElement('button')
        cursando.textContent = 'Cursando'
        cursando.href = '#'
        cursando.className = 'block px-4 py-2 text-sm text-white text-left  hover:bg-[#BCC2E5] hover:text-[#3347B0]'
        divStatus.appendChild(cursando)

        const divLegenda = document.createElement('div')
        divLegenda.className = 'flex flex-col md:flex-row md:gap-4 items-center justify-center'

        const legenda = document.createElement('span')
        legenda.textContent = 'LEGENDA'
        legenda.className = 'text-[#3347B0] text-[14px]'
        divLegenda.appendChild(legenda)

        const divIcones = document.createElement('div')
        divIcones.className = 'flex gap-2 items-center justify-center'

        const divAzul = document.createElement('div')
        divAzul.className = 'w-4 h-4 bg-[#3347B0] shadow-2xl shadow-[1px_1px_8px_gray]'
        divIcones.appendChild(divAzul)

        const cursandoLegenda = document.createElement('span')
        cursandoLegenda.textContent = 'Cursando'
        cursandoLegenda.className = 'text-[#3347B0] text-[12px]'
        divIcones.appendChild(cursandoLegenda)
        divLegenda.appendChild(divIcones)

        const divLaranja = document.createElement('div')
        divLaranja.className = 'w-4 h-4 bg-[#E5B657] shadow-2xl shadow-[1px_1px_8px_gray]'
        divIcones.appendChild(divLaranja)

        const finalizadoLegenda = document.createElement('span')
        finalizadoLegenda.textContent = 'Finalizado'
        finalizadoLegenda.className = 'text-[#3347B0] text-[12px]'
        divIcones.appendChild(finalizadoLegenda)
        // fim menu

        const divTituloPrincipal = document.createElement('div')
        divTituloPrincipal.className = 'pt-6'

        const tituloPrincipal = document.createElement('h1')
        tituloPrincipal.className = 'text-[#3347B0] text-[clamp(2rem,2vw,4rem)] md:text-[64px] text-center font-medium'
        tituloPrincipal.textContent = curso.nome
        divTituloPrincipal.appendChild(tituloPrincipal)


        dropdownStatus.appendChild(btnStatus)
        dropdownStatus.appendChild(divStatus)
        menu.appendChild(dropdownStatus)
        menu.appendChild(divLegenda)
        container.appendChild(menu)
        container.appendChild(divTituloPrincipal)

    } catch (error) {
        return false
    }
}

export async function abrirTelaInicial() {
    const cursos = await getCursos()

    const botoes = document.getElementById('botoes')

    cursos.forEach(curso => {

        const card = document.createElement('button')
        card.className = 'bg-[#3347B0] gap-10 h-[clamp(175px,40vw,200px)] w-[clamp(175px,40vw,400px)] shadow-2xl shadow-[15px_15px_6px_#3347B050] md:shadow-[15px_15px_0_#3347B050] flex items-center justify-center transition-all duration-300 hover:shadow-[15px_15px_6px_#3347B050] hover:-translate-y-2'

        card.addEventListener('click', () => {
            abrirPagina(curso)
        })

        card.addEventListener('click', () => {
            abrirPagina(curso)

        })

        const imagemCurso = document.createElement('img')
        imagemCurso.src = curso.icon
        imagemCurso.alt = curso.nome
        imagemCurso.className = 'hidden md:flex w-24 h-19 '

        const nomeCurso = document.createElement('h1')
        nomeCurso.textContent = curso.sigla
        nomeCurso.className = 'text-6xl text-white'

        card.appendChild(imagemCurso)
        card.appendChild(nomeCurso)
        botoes.appendChild(card)

    })
}

export async function abrirBotao() {
    try {
        const botaoDs = document.getElementById('botao-ds')
        const botaoRds = document.getElementById('botao-rds')

        botaoDs.addEventListener('click', () => {
            abrirPagina()
        })

        botaoRds.addEventListener('click', () => {
            abrirPagina()

        })

    } catch (error) {
        return false
    }

}