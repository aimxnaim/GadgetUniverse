import React from 'react'
import StarRatings from 'react-star-ratings';
import { useGetProductDetailsQuery } from '../../actions/api/productsApi';
import { Link, useParams } from 'react-router-dom';
import NewReview from './NewReview';
import { useSelector } from 'react-redux';
import { getAvatarUrl } from '../../constants/constants'

const ListReviews = ({ reviews }) => {
    const params = useParams();
    const { data } = useGetProductDetailsQuery(params?.id);
    const product = data?.product;

    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <>
            {reviews.map((review, index) => (
                <>
                    <div className="review-card">
                        <div className="review-profile d-flex gap-10 align-items-center" key={review?._id}>
                            <img
                                src={getAvatarUrl(review?.user?.avatar?.url)}
                                alt="User Name"
                                width="50"
                                height="50"
                                className="rounded-circle"
                            />
                            <div>
                                <p className="mb-0 px-1">{review?.user?.name}</p>

                                <StarRatings
                                    rating={review?.rating}
                                    starRatedColor="#ffb829"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension='20px'
                                    starSpacing='1px'
                                    className='m-0'
                                />
                            </div>
                        </div>
                        <p className="review_comment my-4">{review?.comment}</p>
                    </div>
                </>

            ))}
        </>

    )
}

export default ListReviews