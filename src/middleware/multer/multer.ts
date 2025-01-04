import  multer from "multer";
import path from "node:path";

export const storagePath = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, path.resolve(__dirname, "../../../public/temp"));
    },

    filename: (req, file, cb) => {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }catch(err) {
            console.log(err)
        }
    }
})


export const upload = multer({storage: storagePath})
