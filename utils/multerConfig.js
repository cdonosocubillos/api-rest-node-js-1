const multer = require('multer');
const shortid = require('shortid');

const multerConfig = {
    storage: fileStore = multer.diskStorage({
        destination: (res, req, cb) => {
            cb(null, __dirname+'../../uploads/'); //directorio de destino.
        },
        filename: (res, req, cb) => {
            //obtener la extension del archivo
            const extension = file.mimetype.split('/'[1]);
            //generar ID para usar como nombre de imagen
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, res, cb){
        if ( file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ) { //solo aceptar imagenes
            cb(null, true);
        } else {
            cb(new Error('Formato de imagen no válido'));    
        }
    },
}

module.exports = multerConfig;