class LivroDao
{
    constructor(db){
        this._bd = db;
    }

    lista(){
        return new Promise((resolve,reject) => {
            this._bd.all(
                'Select * from livros',
                (erro, resultado) =>{
                    if (erro) return reject('Não foi possivel listar livros');
                    return resolve(resultado);                 
                }   
            )
        });
    }

    adiciona(livro){
        return new Promise( (resolve,reject) => {
            this._bd.run(`INSERT INTO LIVROS (TITULO, PRECO, DESCRICAO
                ) VALUES (?,?,?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function(err){
                    if(err){
                        console.log(err);
                        return reject('Não foi possivel adicionar o livro');
                    }
                    resolve();
                } )
        });
    }

    buscaPorId(livro){
        return new Promise( (resolve,reject) => {
            console.log(livro);
            this._bd.get(`SELECT * FROM LIVROS WHERE ID = ? `, livro, 
                (err, resultado) => {
                    if(err){
                        console.log(err);
                        return reject('Não foi encontrar o livro');
                    }
                    console.log(resultado);
                    resolve(resultado);
                } )
        });
    }

    atualiza(livro){
        return new Promise( (resolve,reject) => {
            console.log(livro);
            this._bd.all(`UPDATE LIVROS SET TITULO = ?, PRECO = ?, DESCRICAO= ? WHERE ID = ? `, 
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ]
            , 
                (err) => {
                    if(err){
                        console.log(err);
                        return reject('Não foi possivel atualizar');
                    }
                    resolve();
                } )
        });
    }

     remove(livro){
        return new Promise( (resolve,reject) => {
            console.log(livro);
            this._bd.all(`DELETE FROM LIVROS WHERE ID = ? `, livro, 
                (err) => {
                    if(err){
                        console.log(err);
                        return reject('Não foi possivel deletar o livro');
                    }
                    resolve();
                } )
        });
    }




}
module.exports = LivroDao;

