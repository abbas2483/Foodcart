import React from 'react';
import { useCart, useDispatchCart } from '../components/CartContext';

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    const totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
            <table className="table table-hover">
                <thead className="text-success fs-4">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                                <button type="button" className="btn p-0">
                                    <span className="badge bg-danger" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>X</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="fs-2">Total Price: ₹{totalPrice}/-</div>
            <div>
                <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    )
}