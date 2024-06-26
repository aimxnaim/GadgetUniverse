import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import MetaData from '../layout/MetaData'
import { useGetProductDetailsQuery, useUploadProductImagesMutation } from '../../actions/api/productsApi'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'


const UploadImages = () => {

    const fileInputRef = useRef(null)
    const params = useParams()
    const navigate = useNavigate()

    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])

    const { data } = useGetProductDetailsQuery(params?.id)
    const [uploadProductImages, { isLoading, error, isSuccess }] = useUploadProductImagesMutation()

    useEffect(() => {
        data?.product && setUploadedImages(data?.product?.images);

        if (data?.product) {
            setUploadedImages(data?.product?.images)
        }
        error && toast.error(error?.data?.message)
        if (isSuccess) {
            setImagesPreview([])
            toast.success('Image uploaded successfully')
            navigate('/admin/products')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isSuccess])

    const onChange = (e) => {
        const files = Array.from(e.target.files)

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result])
                    setImages((oldArray) => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        });
    };

    const handleImagePreviewDelete = (image) => {
        const filteredImages = imagesPreview.filter(img => img != image)

        setImagesPreview(filteredImages)
        setImages(filteredImages)
    };

    const handleFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    };

    const submitHandle = (e) => {
        e.preventDefault();

        uploadProductImages({
            body: { images },
            productId: params?.id
        })
    }

    return (
        <>
            <MetaData title={'Upload Images'} />

            <AdminLayout>
                <div className="row wrapper">
                    <div className="col-10 col-lg-8 mt-5 mt-lg-0">
                        <form
                            className="shadow rounded bg-body"
                            encType='multipart/form-data'
                            onSubmit={submitHandle}
                        >
                            <h2 className="mb-4">Upload Product Images</h2>

                            <div className="mb-3">
                                <label htmlFor="customFile" className="form-label">Choose Images</label>

                                <div className="custom-file">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="product_images"
                                        className="form-control"
                                        id="customFile"
                                        multiple
                                        onChange={onChange}
                                        onClick={handleFileInput}
                                    />
                                </div>

                                {imagesPreview?.length > 0 && (
                                    <div className="new-images my-4">
                                        <p className="text-warning">New Images:</p>
                                        <div className="row mt-4">
                                            {imagesPreview?.map((img, index) => (
                                                <div className="col-md-3 mt-2" key={index}>
                                                    <div className="card">
                                                        <img
                                                            src={img}
                                                            alt="Card"
                                                            className="card-img-top p-2"
                                                            style={{
                                                                width: '100%',
                                                                height: '80px'
                                                            }}
                                                        />
                                                        <button
                                                            style={{
                                                                backgroundColor: '#dc3545',
                                                                borderColor: '#dc3545'
                                                            }}
                                                            type="button"
                                                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                                                            onClick={() => handleImagePreviewDelete(img)}
                                                        >
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {uploadedImages?.length > 0 && (
                                    <div className="uploaded-images my-4">
                                        <p className="text-success">Product Uploaded Images:</p>
                                        <div className="row mt-1">

                                            {uploadedImages?.map((image, index) => (
                                                <div className="col-md-3 mt-2" key={image?._id}>
                                                    <div className="card">
                                                        <img
                                                            src={image?.url}
                                                            alt="Card"
                                                            className="card-img-top p-2"
                                                            style={{
                                                                width: '100%',
                                                                height: '80px'
                                                            }}
                                                        />
                                                        <button
                                                            style={{
                                                                backgroundColor: '#dc3545',
                                                                borderColor: '#dc3545'
                                                            }}
                                                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                                                            disabled="true"
                                                            type="button"
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                )}
                            </div>

                            <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                                {
                                    isLoading
                                        ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span className="px-3" role="status">Uploading</span>
                                            </>
                                        ) : ' Upload'}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default UploadImages