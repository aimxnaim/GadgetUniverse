import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import './Invoice.css'
import { useParams } from 'react-router-dom'
import { useOrderDetailsQuery } from '../../actions/api/orderApi'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'


const Invoice = () => {
    const params = useParams()
    const { data, isLoading, error } = useOrderDetailsQuery(params?.id)
    const order = data?.order || {}

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus
    } = order

    useEffect(() => {

        error && toast.error(error?.data?.message)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const handleDownload = () => {
        const input = document.getElementById('order_invoice')
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()
            const pdfWidth = pdf.internal.pageSize.getWidth()
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0)
            pdf.save(`invoice_${order?._id}.pdf`)
        })
    }

    if (isLoading) return <Loader />

    return (
        <>
            <MetaData title={'Order Invoice'} />

            <div className="order-invoice my-5">
                <div className="row d-flex justify-content-center mb-5">
                    <button className="btn btn-success col-md-5" onClick={handleDownload}>
                        <i className="fa fa-print"></i> Download Invoice
                    </button>
                </div>
                <div id="order_invoice" className="p-3 border border-secondary">
                    <header className="clearfix">
                        <div id="logo">
                            <img src="/images/invoice-logo.png" alt="Company Logo" />
                        </div>
                        <h1>INVOICE # {order?._id}</h1>
                        <div id="company" className="clearfix">
                            <div>Gadget Universe</div>
                            <div>
                                588 WANGSA MAJU,
                                <br />
                                KL 42200, MY
                            </div>
                            <div>(602) 519-0450</div>
                            <div>
                                <a href="mailto:info@gadgetuniverse.com">info@gadgetuniverse.com</a>
                            </div>
                        </div>
                        <div id="project">
                            <div><span>NAME</span> {user?.name}</div>
                            <div><span>EMAIL</span> {user?.email}</div>
                            <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
                            <div>
                                <span>ADDRESS</span> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode},  {shippingInfo?.country}
                            </div>
                            <div><span>DATE</span> {new Date(order?.createdAt).toLocaleString("en-US")}</div>
                            <div><span>STATUS</span> {capitalizeFirstLetter(paymentInfo?.status)}</div>
                        </div>
                    </header>
                    <main>
                        <table className="mt-5">
                            <thead>
                                <tr>
                                    <th className="service">ID</th>
                                    <th className="desc">NAME</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="service">{item?.product}</td>
                                        <td className="desc">{item?.name}</td>
                                        <td className="unit">RM{item?.price}</td>
                                        <td className="qty">{item?.quantity}</td>
                                        <td className="total">RM{item?.price * item?.quantity}</td>
                                    </tr>

                                ))}

                                <tr>
                                    <td colSpan="4">
                                        <b>SUBTOTAL</b>
                                    </td>
                                    <td className="total">RM{order?.itemsPrice}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4">
                                        <b>TAX GST 6%</b>
                                    </td>
                                    <td className="total">RM{order?.taxPrice}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4">
                                        <b>SHIPPING</b>
                                    </td>
                                    <td className="total">RM{order?.shippingPrice}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4" className="grand total">
                                        <b>GRAND TOTAL</b>
                                    </td>
                                    <td className="grand total">RM{order?.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="notices">
                            <div>NOTICE:</div>
                            <div className="notice">
                                A finance charge of 1.5% will be made on unpaid balances after 30
                                days.
                            </div>
                        </div>
                    </main>
                    <footer>
                        Invoice was created on a computer and is valid without the signature.
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Invoice