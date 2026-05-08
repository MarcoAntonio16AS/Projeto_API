// Responsável por estabelecer a conexão com o banco de dados MySQL usando o módulo mysql2
const mysql = require('mysql2');


// Configurações básicas da conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Trabalho_TASI'
});


// Estabelecendo a conexão com o banco de dados e mostrando possíveis resultados
conexao.connect((error) => {
    if (error) {
        console.log('Erro ao conectar ao banco de dados:');
        return;
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

// Exportando a conexão para ser usada em outros arquivos, como o Servidor.js
module.exports = conexao;