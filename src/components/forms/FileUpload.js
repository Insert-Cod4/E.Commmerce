import React from 'react';

import Resizer from 'react-image-file-resizer';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge, Image } from 'antd'

const FileUplaod = ({ values, setValues, setLoading }) => {

    const { user } = useSelector((state) => ({
        ...state
    }));

    const fileUploadAndRezire = (e) => {

        // rezire
        let files = e.target.files; // 3

        let allUploadedFiles = values.images;


        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        //console.log(uri);
                        axios
                            .post(`${'http://localhost:8000/api'}/uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : '',
                                    },
                                }
                            )
                            .then((res) => {
                                console.log('IMAGE UPLOAD RES DATA ', res)
                                setLoading(false)
                                allUploadedFiles.push(res.data)

                                setValues({ ...values, images: allUploadedFiles });
                            })
                            .catch((err) => {
                                setLoading(false)
                                console.log('CLOUDDINARY UPLOAD ERR', err)
                            })
                    },
                    'base64'
                );
            }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component - productcreate
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        //console.log('remove image', id);
        axios.post(`${'http://localhost:8000/api'}/removeimage`,
            { public_id },
            {
                headers: {
                    authtoken: user ? user.token : "",
                },
            }
        )
            .then((res) => {
                setLoading(false)
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    };

    return (
        <>
            <div className="row">
                {values.images &&
                    values.images.map((image) => (
                        <Badge
                            count="X"
                            key={image.public_id}
                            onClick={() => handleImageRemove(image.public_id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Avatar
                                key={image.public_id}
                                src={<Image src={image.url} />}
                                size={100}
                                shape="square"
                                className="ml-3"
                            />
                        </Badge>

                    ))}

            </div>

            <div className="row">

                <label className="btn btn-primary btn-raised">
                    Choose File

                    <input
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={fileUploadAndRezire}
                    />

                </label>
            </div>
        </>
    );
};


export default FileUplaod;