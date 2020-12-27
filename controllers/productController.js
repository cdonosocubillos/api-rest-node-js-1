const Products = require('../models/Products');
const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error){
        if (error) {
            res.json({message: error});
        }
        return next();
    });
}

// getAll
exports.list = async (req, res) => {
    try {
        const products = await Products.find({}); //await espera nuestro proceso.
        res.json(products);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//add
exports.add = async(req, res, next) => {
    const product = new Products(req.body);
    try {
        if (req.file && req.file.filename) {
            product.image = req.file.filename;
        }

        await product.save();
        res.json({ message: 'Nuevo producto agregado'})
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({
                message: `El producto ya existe en la base de datos con el sku: ${req.body.sku}`
            });
        }
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
        next();
    }
};

//find by id
exports.show = async(req, res, next) => {
   
    try {
        const product = await Products.findById(req.params.id);
        if(!product){
            res.status(404).json({
                message: 'El producto no existe'
            });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

//update
exports.update = async(req, res, next) => {
     try {
        let newProduct = req.body;
        if (req.file && req.file.filename) { //Si existe imagen.
            newProduct.image = req.file.filename;
        } else {
            const product = await Products.findById(req.params.id);
            newProduct.image = product.image;
        }
        
         const productUpdated = await Products.findOneAndUpdate({ 
             _id: req.params.id }, newProduct, { new: true }
            );
         res.status(200).json({
             message: 'Producto modificado correctamente'
         })
     } catch (error) {
         console.log(error);
         res.status(400).json({
             message: 'Error al procesar la peticion'
         });
     }
 };

 //delete
exports.delete = async(req, res, next) => {
    try {
        await Products.findOneAndDelete({ _id: req.params.id});
        res.status(200).json({
            message: 'Eliminado Correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

exports.search = async(req, res, next) => {
    try {
        const products = await Products.find({
            name: new RegExp(req.params.query, 'i')
        })
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
} 