const DEV_ROLE_1 = 'Responda as perguntas com uma instrução SQL';
const DEV_ROLE_2 = 'O SQL deve ser compatível com o banco de dados SQLite';
const DEV_ROLE_3 = 'Os campos das tabelas utilizadas devem respeitar a estrutura do banco de dados informada';
const DEV_ROLE_4 = 'A resposta deve conter somente o texto SQL, sem tags de identificação';
const DEV_ROLE_5 = 'Utilize Join para trazer descrições e nomes das tabelas de referência';

const USER_DB_1 = 'CREATE TABLE IF NOT EXISTS CIDADES (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, CIDADE TEXT (50), UF TEXT (2));';
const USER_DB_2 = 'CREATE TABLE IF NOT EXISTS ENTIDADES (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, NOME TEXT (60), ID_CIDADE INTEGER REFERENCES CIDADES (ID));';
const USER_DB_3 = 'CREATE TABLE IF NOT EXISTS PRODUTOS (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, DESCRICAO TEXT (50), UN TEXT (5));';
const USER_DB_4 = 'CREATE TABLE IF NOT EXISTS VENDAS (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, ID_CLIENTE INTEGER REFERENCES ENTIDADES (ID), ID_PRODUTO INTEGER REFERENCES PRODUTOS (ID), QUANTIDADE NUMERIC, VALOR NUMERIC, TOTAL NUMERIC);';

export function setPrompt(message){    
    let arraymessages = [];    
    
    arraymessages.push({role:'developer', content:DEV_ROLE_1});
    arraymessages.push({role:'developer', content:DEV_ROLE_2});
    arraymessages.push({role:'developer', content:DEV_ROLE_3});
    arraymessages.push({role:'developer', content:DEV_ROLE_4});
    arraymessages.push({role:'developer', content:DEV_ROLE_5});

    arraymessages.push({role:'user', content:'Considere um banco de dados com as colunas e tabelas listadas abaixo:'});
    arraymessages.push({role:'user', content:USER_DB_1});
    arraymessages.push({role:'user', content:USER_DB_2});
    arraymessages.push({role:'user', content:USER_DB_3});
    arraymessages.push({role:'user', content:USER_DB_4});
    arraymessages.push({role:'user', content:'Responda a seguinte pergunta:'});
    arraymessages.push({role:'user', content:message});

    return arraymessages;
}