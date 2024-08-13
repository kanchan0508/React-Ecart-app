import React, { useContext, useEffect, useState } from 'react';
import { productContext } from '../utills/Context'; 
import { useNavigate, useParams } from 'react-router-dom'; 

function Edit() {
    const [products, setProducts] = useContext(productContext);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Find the product based on the ID from the URL
        const foundProduct = products.find(p => p.id.toString() === id);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            console.error(`Product not found with ID: ${id}`);
            alert(`Product not found with ID: ${id}`);
            navigate("/"); // Redirect to home if product is not found
        }
    }, [id, products, navigate]);

    const handleSaveChanges = (e) => {
        e.preventDefault();

        if (!product) {
            alert("No product found to update.");
            return;
        }

        // Update the products array with the edited product
        const updatedProducts = products.map(p =>
            p.id === product.id ? product : p
        );

        // Update the context with the new product array
        setProducts(updatedProducts);

        // Save the updated products array to localStorage
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        // Navigate back to the home page
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return product ? (
        <form onSubmit={handleSaveChanges} className='flex flex-col items-center p-[5%] w-screen h-screen'>
            <h1 className='mb-5 w-1/2 text-3xl'>Edit Product</h1>
            
            <input 
                type='url'
                name='image'
                placeholder='Image Link'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={handleChange}  
                value={product.image || ''}
                required
            />
            
            <input 
                type='text'
                name='title'
                placeholder='Title'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={handleChange}  
                value={product.title || ''}
                required
            />
            
            <div className='w-1/2 flex justify-between'>
                <input 
                    type='text'
                    name='category'
                    placeholder='Category'
                    className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                    onChange={handleChange} 
                    value={product.category || ''}
                    required
                />
                
                <input 
                    type='number'
                    name='price'
                    placeholder='Price'
                    className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                    onChange={handleChange} 
                    value={product.price || ''}
                    required
                />
            </div>
            
            <textarea
                rows="10" 
                name='description'
                placeholder='Enter product description here'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={handleChange}
                value={product.description || ''}
                required
            />

            <div className='w-1/2'>
                <button type='submit' className='ml-[-75%] py-3 px-5 border rounded border-blue-200 text-blue-300'>
                    Save Changes
                </button>
            </div>
        </form>
    ) : (
        <div>Loading...</div>
    );
}

export default Edit;
