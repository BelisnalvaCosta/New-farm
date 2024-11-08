const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pharmassure_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado ao banco de dados MySQL!");
});

app.post('/api/produtos', (req, res) => {
    const { nome, prescricao_medica, qtde_entrada, qtde_saida, qtde_estoque, preco, localidade_farmacia } = req.body;
    const sql = "INSERT INTO produtos SET ?";
    db.query(sql, req.body, (err) => {
        if (err) throw err;
        res.send("Produto adicionado com sucesso.");
    });
});

app.put('/api/produtos/:id', (req, res) => {
    const sql = "UPDATE produtos SET ? WHERE id = ?";
    db.query(sql, [req.body, req.params.id], (err) => {
        if (err) throw err;
        res.send("Produto atualizado com sucesso.");
    });
});

app.delete('/api/produtos/:id', (req, res) => {
    const sql = "DELETE FROM produtos WHERE id = ?";
    db.query(sql, req.params.id, (err) => {
        if (err) throw err;
        res.send("Produto excluído com sucesso.");
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000."));
