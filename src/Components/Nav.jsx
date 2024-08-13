import React, { useContext } from 'react';
import { productContext } from '../utills/Context';
import { Link } from 'react-router-dom';

function Nav() {
    const [products] = useContext(productContext);

    // Ensure products is an array
    const productList = Array.isArray(products) ? products : [];

    // Extract unique categories
    let diffCat = productList.reduce((acc, product) => {
        if (product.category && !acc.includes(product.category)) {
            acc.push(product.category);
        }
        return acc;
    }, []);

    const color = () => {
        return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()})`;
    };

    return (
        <nav className='w-[15%] h-full bg-zinc-50 items-center pt-5'>
            <a className='py-3 px-5 border rounded border-blue-200 text-blue-300' href='/create'>Add New Products</a>
            <hr className='my-3 w-[80%]' />
            <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>
            <div className='w-[80%]'>
                {diffCat.length > 0 ? (
                    diffCat.map((category, index) => (
                        <Link
                            key={index}
                            to={`/?category=${category}`}
                            className='flex items-center mb-3'
                        >
                            <span
                                style={{ backgroundColor: color() }}
                                className='rounded-full mr-2 w-[15px] h-[15px] inline-block'
                            ></span>
                            {category}
                        </Link>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>
        </nav>
    );
}

export default Nav;
