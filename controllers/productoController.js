const producto = require("../models/producto");


exports.leerProductoHome = async ( req, res ) => {
    try{
        const producto1 = await producto.find();
        res.json({ producto1 });
    }catch(error){
        console.log(error);
    }


}


exports.leerProducto = async (req, res) => {
    const {id} = req.params;
    const producto1 = await producto.find().where("categoriaId").equals(id);
    res.json(producto1
        );
}

exports.leerProductoAct = async (req, res) => {
    const {id} = req.params;
    try{
        const producto1 = await producto.findById(id);
        res.json({ producto1 });
    }catch(error){
        console.log(error);
    }

}
exports.crearProducto = async ( req, res ) => {
   
    try{
        const producto1 = new producto(req.body);
        producto1.save();
        res.json(producto1);
    }catch(error){
        console.log(error);
    }


}
exports.actualizarProducto = async ( req, res ) => {
    const { id } = req.params;

    const producto1 = await producto.findById(id);

    if(!producto1){
        return res.status(400).json({msg:"categoria no encontrada"});
    }

    //if(categoria.creador.toString() !== req.usuario.id.toString()){
        //return res.status(400).json({ msg: "acción no valida para este usuario"});
    //}

    producto1.nombre = req.body.nombre || producto.nombre;
    producto1.descripcion = req.body.descripcion || producto.descripcion;
    producto1.stock = req.body.stock || producto.stock;
    producto1.precio = req.body.precio || producto.precio;
    producto1.imagen = req.body.imagen || producto.imagen;
 
    producto1.save();
    res.json({ producto});
}
exports.borrarProducto = async ( req, res ) => {
    try{
        await producto.deleteOne({_id: req.params.id});
        res.json({msg : "categoria eliminada"});
    }catch(error){
        console.log(error);
    }
}