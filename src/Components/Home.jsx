import React, { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import { productContext } from '../utills/Context';
import Loading from './Loading';
import axios from '../utills/Axios';

function Home() {
    const [response] = useContext(productContext);
    const products = Array.isArray(response) ? response : []; // Ensure products is an array

    const { search } = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);

    const [filterdCategory, setFilterdCategory] = useState(products); // Default to products

    const getproductCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`);
            setFilterdCategory(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (category && category !== "undefined") {
             setFilterdCategory(products.filter((p)=> p.category == category))
            // getproductCategory();
        } else {
            setFilterdCategory(products);
        }
    }, [category, products]);

    if (!Array.isArray(filterdCategory)) {
        console.error("Expected an array but got:", filterdCategory);
        return <Loading />;
    }

    return (
        <>
            <Nav />
            <div className='h-full w-[85%] flex flex-wrap overflow-x-hidden overflow-y-auto'>
                {filterdCategory.length > 0 ? (
                    filterdCategory.map((p, i) => (
                        <Link
                            to={`/details/${p.id}`}
                            key={i}
                            className='mt-3 ml-5 mb-3 card p-3 border shadow rounded w-[16%] h-[30vh] flex-col flex justify-center items-center'
                        >
                            <div
                                className='hover:scale-110 mb-3  w-full h-[80%] bg-contain bg-no-repeat'
                                style={{ backgroundImage: `url(${p.image})` }}
                            />
                            <h1 className='hover:text-blue-300'>{p.title}</h1>
                        </Link>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </>
    );
}

export default Home;
