import React, {Fragment, useState} from 'react'
import Message from './Message'
import Progress from './Progress'
import axios from 'axios'
const FileUpload = () => {
    // const [file, setFile] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    // const [filename, setFilename] = useState('Choose File') ;
    const [image1name, setImage1name] = useState('Choose Image1') ;
    const [image2name, setImage2name] = useState('Choose Image2') ;
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const onChange1 = e => {
        // setFile(e.target.files[0]);
        // setFilename(e.target.files[0].name);
        setImage1(e.target.files[0]);
        setImage1name(e.target.files[0].name);
        // setImage2(e.target.files[1]);
        // setImage2name(e.target.files[1].name);
    };
    const onChange2 = e => {
        setImage2(e.target.files[0]);
        setImage2name(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        //formData.append('file', file) ;
        formData.append('image1', image1) ;
        formData.append('image2', image2) ;
        try{
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt
                        (Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // CLear percentage
                setTimeout(() => setUploadPercentage(0), 100000) ;
                
            }
        });
            console.log(res) ;
            const { image1Name, image1Path, image2Name, image2Path, result } = res.data;
            console.log("image") ;
            console.log(image1Name) ;
            console.log(image1Path) ;
            console.log(image2Name) ;
            console.log(image2Path) ;
            console.log(result) ;
            setUploadedFile({ image1Name, image1Path, image2Name, image2Path, result });
            setMessage('File Uploaded')
        } catch(err) {
            console.error(err) ;
            if(err.response.status === 500) {
                setMessage('There was a problem with the server');
            }
            else
                setMessage(err.response.data.msg);
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
                {/* <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/> */}
                <input type="file"  className="custom-file-input" id="customFile" onChange={onChange1}/> 
                <label className="custom-file-label" htmlFor="customFile">
                {image1name}
                </label>
            </div>

            <div className="custom-file mb-4">
                {/* <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/> */}
                <input type="file" className="custom-file-input" id="customFile" onChange={onChange2}/> 
                <label className="custom-file-label" htmlFor="customFile">
                {image2name}
                </label>
            </div>
            
            <Progress percentage={uploadPercentage} />
            <input type="submit" value="upload" className="btn btn-primary btn-block mt-4" />
            </form>

            { uploadedFile ? (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                <h3 className="text-center">{ uploadedFile.image1Name }</h3>
                <img style={{ width: '100% ' }} src={uploadedFile.image1Path} alt='' />
                </div>

                <div className="col-md-6 m-auto">
                <h3 className="text-center">{ uploadedFile.image2Name }</h3>
                <img style={{ width: '100% ' }} src={uploadedFile.image2Path} alt='' />
                </div>
                <div className="col-md-6 m-auto">
                <h3 className="text-center"> { uploadedFile.result }</h3>
                </div>
             </div> 
            ) :null}

            
        </Fragment>
    );
};

export default FileUpload