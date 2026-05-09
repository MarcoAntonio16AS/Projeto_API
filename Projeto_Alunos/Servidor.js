/* =====================================================================================
| Criando o servidor usando do express
| Framework próprio do Node.js para facilitar a criação de servidores e rotas.
===================================================================================== */

const express = require('express');
const app = express();

const conexao = require('./Databank');
app.use(express.json());


/* ============================================================================
|   Rota para Inserir um Novo Aluno (INSERT/CREATE/POST)
|
|   Lembra um pouco como é o DAO no JAVA, mas... não há camadas separadas
|   Req = requisição do cliente | Res = resposta do servidor
============================================================================ */


//Rota para inserir um novo aluno | POST => No CRUD é o nosso C => Create
app.post('/alunos', (req, res) => {
    const { nome, email, nota1, nota2 } = req.body;
    

// Inicio de validação dos campos obrigatórios
    if (!nome) {
        return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'O campo "email" é obrigatório.' });
    }

    if (nota1 === undefined) {
        return res.status(400).json({ error: 'O campo "nota1" é obrigatório.' });
    }

    if (nota2 === undefined) {
        return res.status(400).json({ error: 'O campo "nota2" é obrigatório.' });
    }
// Fim da validação dos campos obrigatórios


//Inicio da verificação das notas: Se os dados são válidos, ou seja, números
    if (isNaN(nota1) || isNaN(nota2)) {
        return res.status(400).json({ error: 'As notas devem ser números válidos.' });
    }

//Verificar se as notas estão dentro do intervalo válido
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
        return res.status(400).json({ error: 'As notas devem estar entre 0 e 10.' });
    }


/* ============================================================================
|   Regras de Negócio para o Cálculo da Nota Final e Status do Aluno
============================================================================ */


    // Cálculo da nota final como a soma das duas notas
   const notaFinal = nota1 + nota2;


   // Determinação do status do aluno com base na nota final, usando if/else
   let status;

   if (notaFinal >= 7) {
       status = 'Aprovado';
   } else {
        status = 'Reprovado';
}


/* ============================================================================
|   Inserção dos Dados do ALuno no Banco de Dados
============================================================================ */


// Preparação da String que será executada no banco de dados.
    const sql = `INSERT INTO alunos
(nome, email, nota1, nota2, notaFinal, status)
VALUES (?, ?, ?, ?, ?, ?)`;


// Execução da query usando a conexão com o banco de dados
    conexao.query(sql,
        [nome, email, nota1, nota2, notaFinal, status],
        (err, result) => {  

            //Para caso dê erro na hora de executar a query.
            if (err) {

                console.log(err); // Log do erro para depuração e debug

                return res.status(500).json({ 
                    error: err.message 
                }); // Retorno de erro para o cliente, com a mensagem do erro
            }


            //Para caso dê tudo certo na hora de executar a query.
            else {
                res.status(201).json({ 
                    message: 'Aluno inserido com sucesso!', 
                    alunoId: result.insertId,
                    nome,
                    notaFinal,
                    status
                });
            }

        }
    );
});

/* ============================================================================
|   Rota para Listar Todos os Alunos (SELECT/READ/GET)
|
|   GET => No CRUD é o nosso R => Read => Ler os dados do banco de dados
|   em outras palavras nosso SELECT do SQL.
============================================================================ */


//Criação de rota para listagem dos alunos.
app.get('/alunos', (req, res) => {
    const sql = 'SELECT * FROM alunos'; //String a qual será digitada


    //Execução da query usando a conexão com o banco de dados
    conexao.query(sql, (err, results) => {


        //Resposta de retorno para caso dê erro
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar alunos no banco de dados.' });
        }

        //Resposta de retorno para caso dê tudo certo
        res.status(200).json(results);
    });

});


/* ============================================================================
|   Rota para Listar um Aluno Específico por ID (SELECT/READ/GET)
|
|   GET => No CRUD é o nosso R => Read => Ler os dados do banco de dados
|   em outras palavras nosso SELECT do SQL.
|
|  Aqui usamos o parâmetro de rota ":id" para capturar o ID do aluno que
|  queremos buscar especificamente.
============================================================================ */


//Criação da rota para buscar aluno pelo seu ID
app.get('/alunos/:id', (req, res) => {

    const { id } = req.params; //Captura do ID do aluno a ser buscado
    const sql = 'SELECT * FROM alunos WHERE id = ?'; //String a qual será digitada


//Execução da query usando a conexão com o banco de dados
    conexao.query(sql, [id], (err, results) => {


        //Resposta de retorno para caso dê erro
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar aluno no banco de dados.' });
        }

        //Resposta de retorno para caso o aluno não seja encontrado no banco de dados
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        //Resposta de retorno para caso dê tudo certo e o aluno seja encontrado
        res.status(200).json(results[0]);
    });

});


/* ======================================
| SERVIDOR DA API
====================================== */

//Definição da porta onde o servidor irá rodar
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
