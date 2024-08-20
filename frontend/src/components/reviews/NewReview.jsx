import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import { useCanUserReviewQuery, useSubmitReviewMutation } from '../../actions/api/productsApi';
import toast from 'react-hot-toast';

const NewReview = ({ productId }) => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [validated, setValidated] = useState(false)

    const [submitReview, { error, isSuccess, isError }] = useSubmitReviewMutation()
    const { data } = useCanUserReviewQuery(productId)
    const canReview = data?.canReview

    const submitHandler = (e) => {
        e.preventDefault();

        if (rating === 0 || comment.trim() === '') {
            setValidated(true);
            toast.error('Please provide a rating and a review comment');
            return;
        }

        const reviewData = {
            rating,
            comment,
            productId
        }

        submitReview(reviewData)
    }

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }

        isSuccess && toast.success('Review posted successfully')
    }, [isError, error, isSuccess]);

    return (
        <div>
            {canReview && (
                <button
                    id="review_btn"
                    type="button"
                    className="text-dark text-decoration-underline"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                    style={{ border: 'none', background: 'none' }}
                >
                    Submit Your Review
                </button>
            )}

            <div className="row">
                <div className="rating w-50">
                    <div
                        className="modal fade"
                        id="ratingModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="ratingModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">
                                        Submit Review
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form className={validated ? 'was-validated' : ''} noValidate>
                                        <div className="mb-3">
                                            <StarRatings
                                                rating={rating}
                                                starRatedColor="#ffb829"
                                                numberOfStars={5}
                                                name='rating'
                                                changeRating={(e) => setRating(e)}
                                                starDimension='24px'
                                                starSpacing='1px'
                                                className={rating === 0 ? 'is-invalid' : ''}
                                            />
                                            <div className="invalid-feedback">
                                                Please select a star rating.
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                name="review"
                                                id="review"
                                                className={`form-control ${comment.trim() === '' && validated ? 'is-invalid' : ''}`}
                                                placeholder="Please enter your review here..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                required
                                            ></textarea>
                                            <div className="invalid-feedback">
                                                Please enter your review.
                                            </div>
                                        </div>

                                        <button
                                            id="new_review_btn"
                                            className="button"
                                            data-bs-dismiss={rating !== 0 && comment.trim() !== '' ? "modal" : ""}
                                            aria-label="Close"
                                            onClick={submitHandler}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewReview
