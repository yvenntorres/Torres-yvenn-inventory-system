import { useState } from "react";
import { addProducts } from "../api/products";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {

    const navigate = useNavigate();

    const [productId, setProductId] = useState ('');
    const [productName, setProductName] = useState ('');
    const [quantity, setQuantity] = useState ('');
    const [unit, setUnit] = useState ('');
    const [price, setPrice] = useState ('');

    const handleApp = async () => {
        const response = await addProducts(productId, productName, quantity, unit, price);
        console.log(response)

        navigate("/inventory")
    }

    return (
        <>
        <div className="w-screen h-screen bg-rose-300 p-52 flex justify-center items-center">
            <div className="border-4 p-2 border-x-rose-600 border-y-rose-800 rounded-3xl m-5 border-solid  bg-rose-100  w-[500px] h-[420px]">
                <div className="text-5xl p-5 text-black text-center font-bold">Add Product</div>

        
                <div className="flex gap-5 m-4 px-12"> 
                <div className="text-lg text-md font-mono text-black font-semibold">Product ID:</div>
                <input value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border font-semibold mx-2 border-pink-300" type="text" />
                </div>

                <div className="flex gap-5 m-5 px-12"> 
                <div className="text-lg text-md font-mono text-black font-semibold">Product Name:</div>
                <input value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border mx-1 border-pink-300" type="text" />
                </div>

                <div className="flex gap-5 m-5 px-12"> 
                <div className="text-lg text-md font-mono text-black font-semibold">Quantity:</div>
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded px-2 border mx-9 border-pink-300" type="text" />
                </div>

                <div className="flex gap-5 m-5 px-12"> 
                <div className="text-lg text-md font-mono text-black font-semibold">Unit:</div>
                <input value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded px-2 border mx-16 border-pink-300" type="text" />
                </div>

                <div className="flex gap-5 m-5 px-12"> 
                <div className="text-lg text-md font-mono text-black font-semibold">Price:</div>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className="rounded px-2 border mx-14 border-pink-300" type="text" />
                </div>

                <div className="flex justify-center">
                <button onClick={handleApp} className="rounded-lg w-[150px] shadow-2xl shadow-pink-500 bg-white text-pink-800 p-2  hover:bg-black hover:text-white hover:shadow-white hover:cursor-pointer">ADD</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddProducts;