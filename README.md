# Projeto_API
Trabalho da matéria de "Tópicos Avançados de Sistema de Informação"

[Informações.md](https://github.com/user-attachments/files/27542264/Informacoes.md)
              REGRAS DE NEGÓCIO E DE USABILIDADE + ORIENTAÇÕES:

===========================================================================

Necessário que o app a ser criado seja capaz de cadastrar alunos diretamente em um banco de dados do tipo MySQL

Utilização do banco MySQL e que a aplicação converse com ele, salvando os dados e os retornando quando chamados

======================================================================
    Utilizar Node.js + Express.js integrado ao banco MySQL
    Receber dados dos alunos;
    Validar informações obrigatórias;
    Calcular o resulltado acadêmico do aluno;
    Retornar o status do aluno
======================================================================

=========================================================================
    > POST/Alunos

  Responsável por:
    - receber os dados dos alunos
    - validar os dados
    - calcular o resultado
    - salvar no banco
    - retornar resposta ao cliente
    
==========================================================================
    > GET/Alunos

  Responsável por:
    - listar todos os alunos cadastrados
    - buscar um aluno através de seu id

===========================================================================================

===========================================================================================
    > REGRAS DE VALIDAÇÃO

  O sistema deve validar obrigatóriamente:
    - nome obrigatório
    - email obrigatório
    - nota 1 obrigatória
    - nota 2 obrigatória
    - notas devem ser números
    - notas devem estar entre 0 e 10

  Caso alguma validação dê erro:
    - API deve retonar {"erro": Mensagem explicando o erro}

==========================================================================================
    > REGRAS DE NEGÓCIO

  O sistema deve calcular:
    - notaFinal = nota1 + nota2
    - se notaFinal >= 7 -> Aprovado
    - se notaFinal < 7 -> Reprovado

===========================================================================================

===========================================================================================
    > RESPOSTA ESPERADA NO POST

  A API deve retornar um JSON com:
    - id do aluno
    - nome do aluno
    - nota notaFinal
    - status(aprovado ou reprovado)

===========================================================================================
    > OBSERVAÇÂO
    - O código deve ser postado no corpo da mensagem da atividade.
    
===========================================================================================
