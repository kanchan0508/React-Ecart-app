import React, { useContext, useState } from 'react';
import { productContext } from '../utills/Context'; // Import the productContext
import { nanoid } from 'nanoid'; // Import nanoid for unique IDs
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { toast } from 'react-toastify';

function Create() {
    // Access the products and setProducts from the productContext
    const [products, setProducts] = useContext(productContext);

    // Ensure products is always an array
    const productList = Array.isArray(products) ? products : [];

    // State variables for the form inputs
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // Initialize useNavigate for programmatic navigation
    const navigate = useNavigate();

    // Handler function to add a new product
    const AddProductHandler = (e) => {
        e.preventDefault();

        // Validate form inputs
        if (
            title.trim().length < 5 ||
            image.trim().length < 5 ||
            category.trim().length < 5 ||
            price.trim().length < 1 ||
            description.trim().length < 5
        ) {
            alert("Each field must contain at least 5 characters.");
            return;
        }

        // Create a new product object
        const product = {
            id: nanoid(),
            image,
            title,
            category,
            price,
            description,
        };

        // Update the products array with the new product
        const updatedProducts = [...productList, product];

        // Update the context with the new product array
        setProducts(updatedProducts);

        // Optionally save the updated products array to localStorage
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success("Product added successfully")
        // Navigate back to the home page
        navigate("/");
    };

    return (
        <form onSubmit={AddProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
            <h1 className='mb-5 w-1/2 text-3xl'>Add New Product</h1>
            
            <input 
                type='url'
                placeholder='Image Link'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={(e) => setImage(e.target.value)}  
                value={image}
                required
            />
            
            <input 
                type='text'
                placeholder='Title'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={(e) => setTitle(e.target.value)}  
                value={title}
                required
            />
            
            <div className='w-1/2 flex justify-between'>
                <input 
                    type='text'
                    placeholder='Category'
                    className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                    onChange={(e) => setCategory(e.target.value)} 
                    value={category}
                    required
                />
                
                <input 
                    type='number'
                    placeholder='Price'
                    className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                    onChange={(e) => setPrice(e.target.value)} 
                    value={price}
                    required
                />
            </div>
            
            <textarea
                rows="10" 
                placeholder='Enter product description here'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
            />

            <div className='w-1/2'>
                <button className='ml-[-75%] py-3 px-5 border rounded border-blue-200 text-blue-300'>
                    Add New Product
                </button>
            </div>
        </form>
    );
}

export default Create;
