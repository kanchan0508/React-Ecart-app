import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productContext } from '../utills/Context';
import Loading from './Loading';

function Details() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(productContext);
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (products) {
            console.log('Available products:', products); // Debugging: Check all products
            const foundProduct = products.find(p => p.id === id || p.id === Number(id));
            setProduct(foundProduct);
        }
    }, [products, id]);

    const productDeleteHandler = (id) => {
        const filterProducts = products.filter((p) => p.id !== id);
        setProducts(filterProducts);
        localStorage.setItem("products", JSON.stringify(filterProducts));
        navigate("/");
    };

    return product ? (
        <div className='w-[70%] flex h-full justify-center items-center m-auto p-[10%]'>
            <img className='object-contain h-[80%] w-[40%]' src={product.image} alt='img' />
            <div className='content w-[50%]'>
                <h1 className='text-4xl'>{product.title}</h1>
                <h3 className='text-zinc-400 my-5'>{product.category}</h3>
                <h2 className='text-red-300 mb-3'>{product.price}</h2>
                <p className='mb-[5%]'>{product.description}</p>
                <Link to={`/edit/${product.id}`} className='mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300'>
                    Edit
                </Link>
                <button onClick={() => productDeleteHandler(product.id)} className='mr-5 py-2 px-5 border rounded border-blue-200 text-red-300'>
                    Delete
                </button>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default Details;
