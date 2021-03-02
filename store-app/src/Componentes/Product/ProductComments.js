import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, addCommentReset } from './actions/productActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import Rating from './Rating';

export default function ProductComments({ product }) {

    const [comment, setComment] = useState();
    const [rating, setRating] = useState(0);

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const AddComment = useSelector(state => state.AddComment);
    const { loading, error, success } = AddComment;

    useEffect(() => {
        if (success) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch(addCommentReset());
        }
    }, [success])

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(addComment({ name: userInfo.name, comment, rating }, product._id))
        }
        else {
            alert("Please enter comment and rating")
        }
    }

    return (
        <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 &&
                <MessageBox>
                    There is no review
                </MessageBox>
            }
            <ul>
                {
                    product.reviews.map(item => {
                        return <li key={item._id}>
                            <strong>{item.name}</strong>
                            <Rating caption=" " product={item} />
                            <p>{item.createdAt.substring(0, 10)}</p>
                            <p>{item.comment}</p>
                        </li>
                    })
                }
                <li>
                    {userInfo ?
                        <form className="form" onSubmit={submitHandler}>
                            <div>
                                <h2>Write a customer review</h2>
                            </div>
                            <div>
                                <lable htmlFor="rating">Rating</lable>
                                <select value={rating} id="rating" onChange={(e) => setRating(e.target.value)}>
                                    <option value="">...select</option>
                                    <option value="1">1- Poor</option>
                                    <option value="2">2- Fair</option>
                                    <option value="3">3- Good</option>
                                    <option value="4">4- Very good</option>
                                    <option value="5">5- Excelent</option>
                                </select>
                            </div>
                            <div>
                                <lable htmlFor="comment">Comment</lable>
                                <textarea type="text" id="comment" placeholder="Please Enter Comment" required
                                    onChange={(e) => setComment(e.target.value)} />
                            </div>
                            <div>
                                <button type="submit" className="primary" >
                                    Add Comment
                                </button>
                            </div>
                            {loading && <LoadingBox />}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </form>
                        :
                        <MessageBox>
                            Please <Link to="/signin">Sign In</Link> to write a review
                        </MessageBox>
                    }
                </li>
            </ul>
        </div>
    )
}
