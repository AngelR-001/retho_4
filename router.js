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

router.post('/login', async (req, res) => {

    const user = req.body.user;
    const password = req.body.password;
    //let passwordHaash = await bcrypt.hash(password, 8);
    if(user && password){
        
        await connection.query('SELECT * FROM usuarios WHERE rfc = ?', [user], async (req, res) => {

            if(resultado.length == 0 || !(await bcryptjs.compare(password, resultado[0].password))){
                res.render('index', {
                    alert:true,
                    alertTitle: "Error",
                    alertMessage:"Usuario o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'index'
                })
            }else{
                req.session.loggedin = true
                req.session.nombre = resultado[0].nombre;
                res.render('index', {
                    alert:true,
                    alertTitle: "Inicio de sesión",
                    alertMessage:"Inicio de sesión exitoso",
                    alertIcon: "success",
                    showConfirmButton:false,
                    timer:1500,
                    ruta:''
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
            timer:1500,
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