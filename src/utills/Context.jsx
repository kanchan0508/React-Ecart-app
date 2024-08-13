import React, { createContext, useState, useEffect } from 'react';
import axios from './Axios';

export const productContext = createContext();

function Context(props) {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products") || "[]"));

    // const getProduct = async () => {
    //     try {
    //         const { data } = await axios("/products");
    //         setProducts(data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     getProduct();
    // }, []);

    return (
        <productContext.Provider value={[products, setProducts]}>
            {props.children}
        </productContext.Provider>
    );
}

export default Context;
