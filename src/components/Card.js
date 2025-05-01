import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './CartContext'
export default function Card({ foodItem }) {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef();
    const dispatch = useDispatchCart();
    const data = useCart();

    const options = foodItem.options ? foodItem.options[0] : {};
    const priceOptions = Object.keys(options);

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === foodItem._id && item.size === size) {
                food = item;
                break;
            }
        }

        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({
                    type: "UPDATE",
                    id: foodItem._id,
                    price: finalPrice,
                    qty: qty
                })
                return;
            }
        }

        await dispatch({
            type: "ADD",
            id: foodItem._id,
            name: foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: foodItem.img
        })
    }

    useEffect(() => {
        setSize(priceOptions[0]);
    }, [priceOptions]);

    const finalPrice = qty * parseInt(options[size] || 0);

    return (
        <div className="card h-100">
            <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{foodItem.name}</h5>
                <p className="card-text">{foodItem.description}</p>
                <div className="mt-auto">
                    <div className="d-flex gap-2 mb-2">
                        <select 
                            className="form-select" 
                            value={size} 
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select 
                            className="form-select" 
                            value={qty} 
                            onChange={(e) => setQty(e.target.value)}
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="fs-5">₹{finalPrice}/-</span>
                        <button 
                            className="btn btn-success"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}