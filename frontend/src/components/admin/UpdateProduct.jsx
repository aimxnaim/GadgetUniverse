import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import Loader from '../layout/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_CATEGORIES } from '../../constants/constants'
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../actions/api/productsApi'
import toast from 'react-hot-toast'

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams()

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        seller: ''
    });

    const { data } = useGetProductDetailsQuery(params?.id)
    const [updateProduct, { isLoading, error, isSuccess }] = useUpdateProductMutation()

    useEffect(() => {

        if (data) {
            setProduct({
                name: data?.product?.name,
                price: data?.product?.price,
                description: data?.product?.description,
                category: data?.product?.category,
                stock: data?.product?.stock,
                seller: data?.product?.seller
            })
        }
        error && toast.error(error?.data?.message)
        if (isSuccess) {
            toast.success('Product updated')
            navigate('/admin/products')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isSuccess, data])

    const {
        name,
        price,
        description,
        category,
        stock,
        seller
    } = product

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateProduct({ body: product, productId: params?.id })
    }

    if (isLoading) return <Loader />

    return (
        <>
            <MetaData title={'Update Product'} />
            <AdminLayout>
                <div className="row wrapper">
                    <div className="col-10 col-lg-10 mt-5 mt-lg-0">
                        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                            <h2 className="mb-4">Update Product</h2>
                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label"> Name </label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description_field" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="8"
                                    name="description"
                                    value={description}
                                    onChange={onChange}
                                ></textarea>
                            </div>

                            <div className="row">
                                <div className="mb-3 col">
                                    <label htmlFor="price_field" className="form-label"> Price </label>
                                    <input
                                        type="number"
                                        id="price_field"
                                        className="form-control"
                                        name="price"
                                        value={price}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="mb-3 col">
                                    <label htmlFor="stock_field" className="form-label"> Stock </label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        name="stock"
                                        value={stock}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col">
                                    <label htmlFor="category_field" className="form-label"> Category </label>
                                    <select
                                        className="form-select"
                                        id="category_field"
                                        name="category"
                                        value={category}
                                        onChange={onChange}
                                    >
                                        {PRODUCT_CATEGORIES?.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>

                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col">
                                    <label htmlFor="seller_field" className="form-label"> Seller Name </label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        name="seller"
                                        value={seller}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn w-100 py-2" disabled={isLoading}>
                                {
                                    isLoading
                                        ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span className="px-3" role="status">Updating...</span>
                                            </>
                                        ) : ' UPDATE'}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default UpdateProduct