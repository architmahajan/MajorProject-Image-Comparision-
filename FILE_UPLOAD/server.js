const express = require('express') ;
const fileUpload = require('express-fileupload') ;
const cors = require('cors')
const cp = require('child_process')

const exec_options = {
    cwd:null,
    env: null,
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignam: 'SIGTERM'
};

const app = express() ;
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests\
// file upload api

app.use(fileUpload()) ;

//Upload Endpoint
app.post('/upload', (req, res) => {
    console.error("1");
    //console.error(req.files)
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded' }) ;
    }

    // const file = req.files.file;
    const image1 = req.files.image1 ;
    const image2 = req.files.image2 ;
    // console.error(image1.name) ;
    // console.error(image2.name) ;
    var str1 = '/home/archit/Documents/React/React/FILE_UPLOAD/client/public/uploads/' ;
    var str2 = image1.name ;
    var fin_dir1 = str1.concat(str2) ;
    var str2 = image2.name ;
    var fin_dir2 = str1.concat(str2) ;
    var str3 = '/uploads/' ;
    // console.error(fin_dir1) ;
    // console.error(fin_dir2) ;
    image1.mv(fin_dir1, err => {
        console.error(image1.name);
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        // var dir_path = str3.concat(str2) ;
        // console.error(dir_path) ;
        // res.json({ fileName: file.name, filePath: dir_path });
    });
    image2.mv(fin_dir2, err => {
        console.error(image2.name);
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        // var dir_path = str3.concat(str2) ;
        // console.error(dir_path) ;
        // res.json({ fileName: file.name, filePath: dir_path });
    });
    var dir = 'dssim ' + image1.name + ' ' + image2.name ;
    console.error(dir) ;

    cp.exec(dir, {cwd: str1}, (err, stdout, stderr) => {
         console.log("result") ;
         console.log(stdout) ;
        str2 = image1.name ;
        var dir_path1 = str3.concat(str2) ;
        str2 = image2.name ;
        var dir_path2 = str3.concat(str2) ;
        res.json({ image1Name: image1.name, image1Path: dir_path1, image2Name: image2.name,
            image2Path: dir_path2, result: stdout});
    })
    
});

app.listen(5000, () => console.log('Server Started...'));

