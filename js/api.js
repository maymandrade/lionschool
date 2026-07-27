/*******************************************************************************************
objetivo: Arquivo responável por gerar funções get para popular a pagina
autor: Mayara Martins
versão:1.0.0
data:27/07/2026
********************************************************************************************/

const URL = 'https://lion-school-phbo.onrender.com'

let cursos = []
let alunos = []
let alunosPorCurso = []
let alunosPorStatus = []
let detalheAluno = []


export async function getCursos() {

    const response = await fetch(`${URL}/cursos`)
    cursos = response.json()

    if (!response.ok) throw new Error('Erro ao buscar cursos!')

    return cursos

}

export async function getAlunos() {
    const response = await fetch(`${URL}/alunos`)
    alunos = response.json()

    if (!response.ok) throw new Error('Erro ao buscar alunos!')

    return alunos

}

export async function getAlunosCurso(curso) {

    const response = await fetch(`${URL}/alunos?curso_id=${curso}`)
    alunosPorCurso = response.json()

    if (!response.ok) throw new Error('Erro ao encontrar alunos!')

    return alunosPorCurso
}

export async function getStatusAlunos(status) {
    const response = await fetch(`${URL}/alunos?status=${status}`)
    alunosPorStatus = response.json()

    if (!response.ok) throw new Error('Erro ao encontrar alunos!')

    return alunosPorStatus

}

export async function getDetalhesAluno(id) {

    const response = await fetch(`${URL}/alunos/${id}`)
    detalheAluno = response.json()

    if (!response.ok) throw new Error('Erro ao encontrar detalhes do aluno!')
}