import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import { useGetAdminProductsQuery } from '../../actions/api/productsApi'
import AdminLayout from '../layout/AdminLayout'

const ListProducts = () => {

    const { data, isLoading, error } = useGetAdminProductsQuery()

    useEffect(() => {

        error && toast.error(error?.data?.message)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    if (isLoading) return <Loader />

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const setProducts = () => {
        const products = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',

                }
            ],
            rows: []
        };

        data?.products?.forEach(product => {
            products.rows.push({
                id: product?._id,
                name: `${product?.name?.substring(0, 30)}...`,
                stock: product?.stock,
                actions: (
                    <>
                        <Link to={`/admin/products/${product?._id}`} className='btn btn-outline-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        <Link to={`/admin/products/${product?._id}/upload_images`} className='btn btn-outline-success ms-2'>
                            <i className='fa fa-image'></i>
                        </Link>
                        <button className='btn btn-outline-danger ms-2'>
                            <i className='fa fa-trash'></i>
                        </button>
                    </>
                )
            })
        })

        return products
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <AdminLayout>
                <div>
                    <h1 className="my-5">{data?.products?.length} Products</h1>

                    <MDBDataTable
                        data={setProducts()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </div>
            </AdminLayout>
        </>
    )
}

export default ListProducts