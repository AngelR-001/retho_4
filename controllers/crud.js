const conexion = require('../database/db');

exports.save = (req, res) => {
    const usuario = req.body.user;
    const rol = req.body.rol;
    const FechaSolicitada = req.body.FechaSolicitada;
    const rfc = req.body.rfc;
    const NEmpleado = req.body.NEmpleado;
    const lugar = req.body.lugar;
    const DiasSol = req.body.DiasSol;
    const DiasRes1 = 12-DiasSol;
    const DiasRes = DiasRes1;

    if(DiasSol<=2){
        conexion.query('INSERT INTO usuarios SET ?', {usuario:usuario, rol:rol, FechaSolicitada:FechaSolicitada, rfc:rfc, NEmpleado:NEmpleado, lugar:lugar, DiasSol:DiasSol, DiasRes:DiasRes}, (error, results)=>{
            if(error){
                console.log(error)
            }else{
                res.redirect('/tabla')
            }
        })
    }else{
        res.redirect('/tabla')
    }
};

exports.update = (req, res) => {
    const id = req.body.id;
    const usuario = req.body.user;
    const rol = req.body.rol;
    const FechaSolicitada = req.body.FechaSolicitada;
    const rfc = req.body.rfc;
    const NEmpleado = req.body.NEmpleado;
    const lugar = req.body.lugar;
    const DiasRes1 = 12-DiasSol;
    const DiasRes = DiasRes1;

    

    conexion.query('UPDATE usuarios SET ? WHERE id=?', [{usuario:usuario, rol:rol, FechaSolicitada:FechaSolicitada, rfc:rfc, NEmpleado:NEmpleado, lugar:lugar, DiasSol:DiasSol, DiasRes:DiasRes}, id], (error,results) => {
        if(error){
            console.log(error)
        }else{
            res.redirect('/tabla')
        }
    })
};

