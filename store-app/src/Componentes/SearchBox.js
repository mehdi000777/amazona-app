import React, { useState } from 'react'

export default function SearchBox(props) {

    const [name, setName] = useState('all');

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/category/all/name/${name}/min/0/max/0/rating/0/order/newest/pageNumber/1`);
    }

    return (
        <div>
            <form className="search" onSubmit={submitHandler}>
                <div className="row">
                    <input type="text" id="q" name="q" onChange={(e) => setName(e.target.value)} />
                    <button type="submit" className="primary">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
