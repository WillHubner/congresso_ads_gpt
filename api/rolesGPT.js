const REGRA_DEV_1 = 'Responda com um comando SQL';
const REGRA_DEV_2 = 'Responda somente com comandos Select';
const REGRA_DEV_3 = 'O SQL deve ser compatível com o banco SQLite';
const REGRA_DEV_4 = 'Para relacionar as tabelas utilize o comando JOIN'
const REGRA_DEV_5 = 'A resposta deve conter somente o comando SQL em formato texto';
const REGRA_DEV_6 = 'O SQL deve respeitar a estrutura do banco informado';;

const REGRA_DB_1 = 'CREATE TABLE IF NOT EXISTS CIDADES (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, CIDADE TEXT (50), UF TEXT (2));';
const REGRA_DB_2 = 'CREATE TABLE IF NOT EXISTS ENTIDADES (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, NOME TEXT (60), ID_CIDADE INTEGER REFERENCES CIDADES (ID));';
const REGRA_DB_3 = 'CREATE TABLE IF NOT EXISTS PRODUTOS (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, DESCRICAO TEXT (50), UN TEXT (5));';
const REGRA_DB_4 = 'CREATE TABLE IF NOT EXISTS VENDAS (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, ID_CLIENTE INTEGER REFERENCES ENTIDADES (ID), ID_PRODUTO INTEGER REFERENCES PRODUTOS (ID), QUANTIDADE NUMERIC, VALOR NUMERIC, TOTAL NUMERIC);';

export function gerarPrompt(message){
    let regras = [];

    regras.push({role:'developer', content:REGRA_DEV_1});
    regras.push({role:'developer', content:REGRA_DEV_2});
    regras.push({role:'developer', content:REGRA_DEV_3});
    regras.push({role:'developer', content:REGRA_DEV_4});
    regras.push({role:'developer', content:REGRA_DEV_5});
    regras.push({role:'developer', content:REGRA_DEV_6});

    regras.push({role:'user', content:'Considere a estrutura de banco de dados abaixo:'});
    regras.push({role:'user', content:REGRA_DB_1});
    regras.push({role:'user', content:REGRA_DB_2});
    regras.push({role:'user', content:REGRA_DB_3});
    regras.push({role:'user', content:REGRA_DB_4});
    regras.push({role:'user', content:'Responda a seguinte pergunta:'});
    regras.push({role:'user', content:message});
    
    return regras;
}