import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import DatePicker from "react-datepicker";
import SalesChart from '../charts/SalesChart'

import "react-datepicker/dist/react-datepicker.css";
import { useLazyGetDashboardSalesQuery } from '../../actions/api/orderApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date().setDate(1));
    const [endDate, setEndDate] = useState(new Date());

    const [getDashboardSales, { error, isLoading, data }] = useLazyGetDashboardSalesQuery();

    useEffect(() => {

        error && toast.error(error?.data?.message)

        if (startDate && endDate && !data) {
            getDashboardSales({
                startDate: new Date(startDate).toISOString(),
                endDate: endDate.toISOString()
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const submitHandler = () => {

        getDashboardSales({
            startDate: new Date(startDate).toISOString(),
            endDate: endDate.toISOString()
        })
    }

    if (isLoading) return <Loader />
    return (
        <>
            <MetaData title={'Admin Dashboard'} />
            <AdminLayout>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="mb-3 me-4">
                        <label className="form-label d-block">Start Date</label>
                        <DatePicker
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label d-block">End Date</label>
                        <DatePicker
                            selected={endDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            maxDate={new Date()}
                            className="form-control"
                        />
                    </div>
                    <button className="btn fetch-btn ms-4 mt-3 px-5" onClick={submitHandler}>Fetch</button>
                </div>

                <div className="row pr-4 my-5">
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">
                                    Sales
                                    <br />
                                    <b>RM{data?.totalSales?.toFixed(2)}</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-sm-12 mb-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">
                                    Orders
                                    <br />
                                    <b>{data?.totalNumOrders}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SalesChart salesData={data?.sales} />
                <div className="mb-5"></div>
            </AdminLayout>
        </>
    )
}

export default Dashboard