import multer from "multer";

//Admin Auth


export function admin(req, res, next) {
    if (req.user.role === "admin") return next();
    else return res.status(401).send("Not Authorized");
}

// Uplode images

const path="Upload";
// cb =callBack
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb (null, path);
    },
    filename: (req, file, cb)=>{
    cb(
        null,
        `${Date.now()}-${
            file.fieldname + "."+ file.originalname.split(".").pop()
        }`
    );
},
});
export const upload = multer({ storage }).single("file");
