const express = require("express")
const router = express.Router();
const conexion = require('./database/db')
var bcryptjs = require('bcryptjs');

//Mostrar los registros
router.get('/tabla', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results)=> {
        if(error){
            throw error;
        }else{
            res.render('tabla', {results:results});
        }
    })
});


//Mostrar la pagina de inicio
 router.get('/', (req, res) => {
     try {
        conexion.query('SELECT * FROM usuarios', (error, results)=> {
            if(error){
                throw error;
            }else{
                res.render('tabla', {results:results});
            }
        })
     } catch (error) {
         console.log("Error al mostrar la página")
     }
 });


/* router.post('/login', async (req, res) => {

    const usuario = req.body.user;
    const rfc = req.body.password;
    //let passwordHaash = await bcrypt.hash(password, 8);
    if(usuario && rfc){
        
        await conexion.query('SELECT * FROM usuarios WHERE rfc = ?', [usuario], async (req, resultado) => {

            if(resultado.length == 0 || !(await bcryptjs.compare(rfc, resultado[0].password))){
                res.render('index', {
                    alert:true,
                    alertTitle: "Error",
                    alertMessage:"Usuario o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton:true,
                    timer:100000000000,
                    ruta:'tabla'
                })
            }else{
                req.session.loggedin = true
                req.session.usuario = resultado[0].usuario;
                res.render('index', {
                    alert:true,
                    alertTitle: "Inicio de sesión",
                    alertMessage:"Inicio de sesión exitoso",
                    alertIcon: "success",
                    showConfirmButton:false,
                    timer:10000000000,
                    ruta:'tabla'
                })
            }

        })

    }else{
        res.render('index', {
            alert:true,
            alertTitle: "Advertencia",
            alertMessage:"Por favor ingrese usuario y contraseña",
            alertIcon: "warning",
            showConfirmButton:true,
            timer:90000000000,
            ruta:'index'
        })
    }

})

router.get('/', (req, res) => {

    if(req.session.loggedin){

        res.render('edit',{
            login:true,
            name:req.session.nombre
        })

    }else{
        res.render('edit',{
            login:false,
            name:'Debe iniciar sesión'
        })
    }

})
 */

//Formato de impresion
router.get('/formato', (req, res)=>{
    res.render ('formato')
});


//Ruta para crear registros nuevos

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
            res.redirect('/tabla')
        }
    })
})


//Ruta para editar registros
router.get('/editar/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id=?', [id], (error,results) => {
        if(error){
            throw error;
        }else{
            res.render('editar', {user:results[0]})
        }
    })
})

module.exports = router;