``/*******************************************************************************************
objetivo: Arquivo responável pelas funções utilizadas na pagina
autor: Mayara Martins
versão:1.0.0
data:27/07/2026
********************************************************************************************/
import { getAlunos, getAlunosCurso, getCursos, getDetalhesAluno, getStatusAlunos } from './api.js'

export async function abrirPaginaCurso(curso) {
    try {
        const alunos = await getAlunosCurso(curso.id)

        const container = document.getElementById('main')

        const botaoSair = document.getElementById('span-sair')
        botaoSair.textContent = 'Voltar'

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

        criarSatus(alunos, divStatus)

        // const finalizado = document.createElement('button')
        // finalizado.id = 'finalizado'
        // finalizado.textContent = 'Finalizado'
        // finalizado.href = '#'
        // finalizado.className = 'block px-4 py-2 text-sm text-white text-left  hover:bg-[#BCC2E5] hover:text-[#3347B0]'
        // divStatus.appendChild(finalizado)

        // const cursando = document.createElement('button')
        // cursando.id = 'cursando'
        // cursando.textContent = 'Cursando'
        // cursando.href = '#'
        // cursando.className = 'block px-4 py-2 text-sm text-white text-left  hover:bg-[#BCC2E5] hover:text-[#3347B0]'
        // divStatus.appendChild(cursando)

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

        //titulo principal
        const divTituloPrincipal = document.createElement('div')
        divTituloPrincipal.className = 'pt-6'

        const tituloPrincipal = document.createElement('h1')
        tituloPrincipal.className = 'text-[#3347B0] text-[clamp(2rem,2vw,4rem)] md:text-[64px] text-center font-medium'
        tituloPrincipal.textContent = curso.nome
        divTituloPrincipal.appendChild(tituloPrincipal)
        //fim titulo principal

        const containerAlunos = await criarContainerAlunos(alunos)

        dropdownStatus.appendChild(btnStatus)
        dropdownStatus.appendChild(divStatus)
        menu.appendChild(dropdownStatus)
        menu.appendChild(divLegenda)
        container.appendChild(menu)
        container.appendChild(divTituloPrincipal)
        container.appendChild(containerAlunos)

    } catch (error) {
        return false
    }
}

async function criarContainerAlunos(alunos) {
    //alunos
    const containerAlunos = document.createElement('div')
    containerAlunos.className = 'flex items-center justify-center'
    containerAlunos.id = 'container-alunos'

    const gridAlunos = document.createElement('div')
    gridAlunos.className = 'grid md:grid-cols-1  lg:grid-cols-3 xl:grid-cols-6 py-10 gap-16'

    alunos.forEach(async aluno => {

        const cardAlunos = document.createElement('button')
        if (aluno.status === 'cursando') {
            cardAlunos.className = 'flex flex-col bg-[#3347B0] w-52 h-64 items-center justify-center px-4 shadow-2xl shadow-[8px_8px_6px_#3347B050] md:shadow-[8px_8px_6px_#3347B050] flex items-center justify-center transition- all duration-300 hover:shadow-[8px_8px_6px_#3347B050] hover:-translate-y-2'

        } else if (aluno.status === 'finalizado') {
            cardAlunos.className = 'flex flex-col bg-[#E5B657] w-52 h-64 items-center justify-center px-4 shadow-2xl shadow-[8px_8px_6px_#3347B050] md:shadow-[8px_8px_6px_#3347B050] flex items-center justify-center transition- all duration-300 hover:shadow-[8px_8px_6px_#3347B050] hover:-translate-y-2'
        }

        const imgAluno = document.createElement('img')
        imgAluno.src = aluno.foto
        imgAluno.alt = aluno.nome
        imgAluno.className = 'w-40 h-40 rounded-full'

        const nome = document.createElement('h1')
        nome.className = 'text-center text-xl text-white py-2 [text-shadow:_3px_1px_3px_black]'
        nome.textContent = aluno.nome

        const infoAlunos = await getDetalhesAluno(aluno.id)

        cardAlunos.addEventListener('click', async () => {

            const infoAluno = await getDetalhesAluno(aluno.id)
            abrirTelaAluno(infoAluno)
        })

        cardAlunos.appendChild(imgAluno)
        cardAlunos.appendChild(nome)
        gridAlunos.appendChild(cardAlunos)

    })
    containerAlunos.appendChild(gridAlunos)

    return containerAlunos
    //fim alunos
}

async function criarSatus(alunos, divStatus) {
    let statusCriados = []

    alunos.forEach(aluno => {

        if (!statusCriados.includes(aluno.status)) {

            const status = document.createElement('button')
            status.id = aluno.status
            status.textContent = aluno.status
            status.className = 'block px-4 py-2 text-sm text-white text-left  hover:bg-[#BCC2E5] hover:text-[#3347B0]'
            divStatus.appendChild(status)

            //adiciona um novo valor ao final do array
            statusCriados.push(aluno.status)

            status.addEventListener('click', async () => {

                const alunosStatus = await getStatusAlunos(aluno.status)
                const novoContainer = await criarContainerAlunos(alunosStatus)

                const containerAtual = document.getElementById('container-alunos')

                //serve para substituir um elemento html pot outro
                containerAtual.replaceWith(novoContainer)
            })
        }
    })
}


async function abrirTelaAluno(infoAluno, curso) {

    const container = document.getElementById('main')

    const botaoSair = document.getElementById('span-sair')
    botaoSair.textContent = 'Voltar'

    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    container.className = 'flex flex-col flex-1 items-center justify-center'

    const containerPrincipal = document.createElement('div')
    containerPrincipal.className = 'px-6 py-10 flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-[235px]'

    //variávle que chama a função que cria o card do aluno
    const cardAluno = await criarCardAluno(infoAluno)

    //cria o grafico com base no desempenho do aluno
    const grafico = await criarGrafico(infoAluno.desempenho)


    containerPrincipal.appendChild(cardAluno)
    containerPrincipal.appendChild(grafico)
    container.appendChild(containerPrincipal)
}


//função que cria o card com a foto e o nome do aluno
async function criarCardAluno(aluno) {

    const cardAlunos = document.createElement('div')
    cardAlunos.className = 'flex flex-col bg-white w-52 h-64 lg:w-[500px] lg:h-[500px] items-center justify-center px-4 shadow-lg shadow-gray-500 flex items-center justify-center'
    const imgAluno = document.createElement('img')
    imgAluno.src = aluno.foto
    imgAluno.alt = aluno.nome
    imgAluno.className = 'w-40 h-40 lg:w-[400px] lg:h-[400px] rounded-full'

    const nome = document.createElement('h1')
    nome.className = 'text-center text-xl text-[#3347B0] py-2 [text-shadow:_1px_1px_4px_#000025]'
    nome.textContent = aluno.nome

    cardAlunos.appendChild(imgAluno)
    cardAlunos.appendChild(nome)

    return cardAlunos
}

async function criarGrafico(infoAluno) {

    const grafico = document.createElement('div')

    grafico.className = `h-[400px] w-full lg:h-[500px] lg:w-[500px] flex items-end justify-center gap-10  px-4 pb-5 lg:shadow-lg lg:shadow-gray-500 flex items-center justify-center`

    infoAluno.forEach(async item => {

        const coluna = await criarBarra(item)

        grafico.appendChild(coluna)

    })

    return grafico

}

async function criarBarra(item) {

    const coluna = document.createElement('div')
    coluna.className = 'flex flex-col items-center justify-end h-[387px]'

    const valor = document.createElement('span')
    valor.textContent = item.valor
    valor.className = 'text-[#3347B0] font-bold text-sm mb-3'

    // fundo da barra
    const fundoBarra = document.createElement('div')
    fundoBarra.className = `w-6 h-full bg-[#EEF0FA] rounded-full flex items-end overflow-hidden`

    const corBarra = document.createElement('div')
    corBarra.className = `w-full bg-[${preencherCor(item)}] rounded-full transition-all duration-700`

    //essa linha representa o "style" do html, ela transforma o valor que veio da api em porcentagem para preencher a barra, o style vai alterar a propriedade heigth-altura
    corBarra.style.height = `${item.valor}%`

    const categoria = document.createElement('span')
    categoria.textContent = item.categoria
    categoria.className = 'text-[#3347B0] font-bold text-xs mt-3'

    fundoBarra.appendChild(corBarra)
    coluna.appendChild(valor)
    coluna.appendChild(fundoBarra)
    coluna.appendChild(categoria)

    return coluna
}

function preencherCor(item) {
    const valor = item.valor
    let cor = ''

    if (valor <= 30) {
        cor = `#C11010`
    } else if (valor >= 31 && valor <= 50) {
        cor = `#E5B657`
    } else {
        cor = `#3347B0`
    }

    return cor
}





export async function voltarTelaInicial() {

    const botaoSair = document.getElementById('botao-sair')

    botaoSair.addEventListener('click', () => {

        criarMain()

    })

}

async function criarMain() {

    const botaoSair = document.getElementById('span-sair')
    botaoSair.textContent = 'Sair'

    const main = document.getElementById('main')

    while (main.firstChild) {
        main.removeChild(main.firstChild)
    }

    main.className = 'flex flex-1 items-center justify-center'

    const section = document.createElement('section')
    section.className = 'flex flex-col lg:flex-row p-16 gap-12 items-center justify-center'

    //titulo
    const divTituloPrincipal = document.createElement('div')
    divTituloPrincipal.className = 'flex flex-col gap-16 items-center'

    const h1 = document.createElement('h1')
    h1.className = 'text-[clamp(2rem,4vw,4rem)] font-light text-center lg:text-left'
    h1.textContent = 'Escolha um'
    const span = document.createElement('span')
    span.className = 'text-[#3347B0] font-bold'
    span.textContent = ' curso'
    const br = document.createElement('br')
    h1.appendChild(span)
    h1.appendChild(br)
    h1.appendChild(document.createTextNode(' para gerenciar'))

    const img = document.createElement('img')
    img.className = 'hidden lg:block max-w-md w-full h-auto min-w-md'
    img.src = './img/dispositivos.png'
    img.alt = 'dispositivos'

    divTituloPrincipal.appendChild(h1)
    divTituloPrincipal.appendChild(img)
    //titulo

    //estudante
    const divEstudante = document.createElement('div')
    const imgEtudante = document.createElement('img')
    imgEtudante.src = './img/studant.png'
    img.alt = 'Estudante'
    divEstudante.appendChild(imgEtudante)
    //estudante

    const botoes = document.createElement('div')
    botoes.id = 'botoes'
    botoes.className = 'flex flex-col gap-16 p-8'

    section.appendChild(divTituloPrincipal)
    section.appendChild(divEstudante)
    section.appendChild(botoes)

    main.appendChild(section)
    await abrirTelaInicial()
}

export async function abrirTelaInicial() {
    const cursos = await getCursos()

    const botoes = document.getElementById('botoes')

    cursos.forEach(curso => {

        const card = document.createElement('button')
        card.className = 'bg-[#3347B0] gap-10 h-[clamp(175px,40vw,200px)] w-[clamp(175px,40vw,400px)] shadow-2xl shadow-[15px_15px_6px_#3347B050] md:shadow-[15px_15px_0_#3347B050] flex items-center justify-center transition-all duration-300 hover:shadow-[15px_15px_6px_#3347B050] hover:-translate-y-2'

        card.addEventListener('click', () => {
            abrirPaginaCurso(curso)
        })

        const imagemCurso = document.createElement('img')
        imagemCurso.src = curso.icon
        imagemCurso.alt = curso.nome
        imagemCurso.className = 'hidden md:flex w-24 h-19 invert'

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
            abrirPaginaCurso()
        })

        botaoRds.addEventListener('click', () => {
            abrirPaginaCurso()

        })

    } catch (error) {
        return false
    }

}