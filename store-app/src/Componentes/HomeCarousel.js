import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { userTopSeller } from './User/actions/userActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function HomeCarousel() {

    const TopSeller = useSelector(state => state.TopSeller);
    const { users, loading, error } = TopSeller;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userTopSeller());
    }, [dispatch])

    return (
        <div>
            <h2>Top Sellers</h2>
            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                <>
                    { users.length === 0 && <MessageBox>NO Seller Found</MessageBox>}
                    <Carousel showArrows autoPlay showThumbs={false}>
                        {
                            users.map(item => {
                                return <div key={item._id}>
                                    <Link to={`/seller/${item._id}`}>
                                        <img src={`../${item.seller.logo}`} alt={item.seller.name} />
                                        <p className="legend">{item.seller.name}</p>
                                    </Link>
                                </div>
                            })
                        }
                    </Carousel>
                </>
            }
        </div>
    )
}
