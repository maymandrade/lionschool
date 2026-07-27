/*******************************************************************************************
objetivo: Arquivo responável pelas funções utilizadas na pagina
autor: Mayara Martins
versão:1.0.0
data:27/07/2026
********************************************************************************************/
import { getAlunos, getAlunosCurso, getCursos, getDetalhesAluno, getStatusAlunos } from './api.js'

export async function abrirPagina() {
    try {
        const json = await getAlunosCurso()
        const alunos = json.response
        const container = document.getElementById('main')

        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }

        container.className = 'flex flex-1 justify-between'

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

        btnStatus.addEventListener('click', () => {
            divStatus.classList.toggle('hidden')
        })

        const status = document.createElement('a')
        status.textContent = 'Status'
        status.href = '#'
        status.className = 'block px-4 py-2 text-sm text-white hover:bg-gray-100'
        divStatus.appendChild(status)

        const finalizado = document.createElement('a')
        finalizado.textContent = 'Finalizado'
        finalizado.href = '#'
        finalizado.className = 'block px-4 py-2 text-sm text-white  hover:bg-gray-100'
        divStatus.appendChild(finalizado)

        const cursando = document.createElement('a')
        cursando.textContent = 'Cursando'
        cursando.href = '#'
        cursando.className = 'block px-4 py-2 text-sm text-white hover:bg-gray-100'
        divStatus.appendChild(cursando)

        const dropdownLegenda = document.createElement('div')
        dropdownLegenda.className = 'relative inline-block text-left'

        const btnLegenda = document.createElement('button')
        btnLegenda.textContent = 'Legenda'
        btnLegenda.className = 'text-[#3347B0] text-[18px] px-4 py-2'

        const divLegenda = document.createElement('div')
        divLegenda.className = 'flex flex-col absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden'

        btnLegenda.addEventListener('click', () => {
            divLegenda.classList.toggle('hidden')
        })

        const finalizadoLegenda = document.createElement('a')
        finalizadoLegenda.textContent = 'Finalizado'
        finalizadoLegenda.href = '#'
        finalizadoLegenda.className = 'block px-4 py-2 text-sm text-[#3347B0] hover:bg-gray-100'
        divLegenda.appendChild(finalizadoLegenda)

        const cursandoLegenda = document.createElement('a')
        cursandoLegenda.textContent = 'Cursando'
        cursandoLegenda.href = '#'
        cursandoLegenda.className = 'block px-4 py-2 text-sm text-[#E5B657] hover:bg-gray-100'
        divLegenda.appendChild(cursandoLegenda)


        // fim menu
        dropdownStatus.appendChild(btnStatus)
        dropdownStatus.appendChild(divStatus)
        dropdownLegenda.appendChild(btnLegenda)
        dropdownLegenda.appendChild(divLegenda)
        menu.appendChild(dropdownStatus)
        menu.appendChild(dropdownLegenda)
        container.appendChild(menu)


        // const titulo = document.createElement('h1')
        // titulo.textContent = "testando"
        // div.appendChild(titulo)

        container.appendChild(menu)

    } catch (error) {
        return false
    }
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