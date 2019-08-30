const LivroDao = require('../infra/livro-dao.js');
const db = require('../../config/database.js');

module.exports = (app) => {

    app.get('/', function(req, resp){
        resp.send(`
            <html>
                <heade>
                    <meta charset="utf-8"></meta>
                </heade>
                <body>
                    <h1>Casa do Codigo</h1>
                </body>
            </html>`
    
        );
    })   
    app.get('/livros', (req, resp) => {

        const livroDao = new LivroDao(db);
    
        livroDao.lista()
                .then((retornoLista)=>{ resp.marko(
                require('../view/livro/lista.marko'),
                {
                    livros: retornoLista
                }
            )})
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../view/livro/form/form.marko'), { livro: {} })
    });

    app.post('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
        .then(resp.redirect('/livros'))
        .catch((erro) => console.log(erro));        
    });

    app.get('/livros/form/:id', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(req.params.id)
                .then((livro)=>{ 
                    console.log(livro.titulo);
                    resp.marko(
                require('../view/livro/form/form.marko'),
                {
                    livro: livro
                }
            )})
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
        .then(() => resp.status(200).end())
        .catch(erro => console.log(erro));

    });
}
