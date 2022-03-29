const express = require("express")
const router = express.Router();
const conexion = require('./database/db')


//Mostrar los registros
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results)=> {
        if(error){
            throw error;
        }else{
            res.render('index.ejs', {results:results});
        }
    })
});


//Rutapara crear registros nuevos

router.get('/create', (req, res)=>{
    res.render ('create')
});


//Actualizar los cambios 
const crud = require('./controllers/crud');
router.post('/save', crud.save)
router.post('/update', crud.update);


//Rura para eliminar un registro 
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id=?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/')
        }
    })
})


//Ruta para editar registros
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id=?', [id], (error,results) => {
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]})
        }
    })
})

module.exports = router;


