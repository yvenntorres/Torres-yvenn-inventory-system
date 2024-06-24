import{ getProducts } from "../api/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/products";

const Inventory = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    const HandleAddProd = async () => {
        navigate("/add-product");
    }

    const delProds = async (productId) => {
        await deleteProduct(productId);
        getAllProducts(); // Refresh the product list after deletion
    };

    const editProds = (productId) => {
        navigate(`/update-by-id/${productId}`);
    };

    return (
        <>
        <div className="bg-rose-300 w-screen h-fit">
            <div className="justify-center text-5xl font-bold font-mono align-middle text-center">TECHNOEVY</div>
            <div className="justify-center text-lg font-bold font-sans align-middle text-center">Inventory Management System</div>

            <div className="flex justify-center align-middle m-5">
                <button onClick={HandleAddProd} className="p-2 rounded-lg shadow-2xl shadow-pink-500 bg-white text-pink-800 m-2 w-[150px] hover:bg-black hover:text-white hover:shadow-white hover:cursor-pointer">Add Products</button>
            </div>

            <div className="flex justify-center items-center">
                <div className="border border-solid scroll-my-12 mb-6 border-black bg-white p-5 rounded-lg content-center self-center">
                    <table className="table table-auto text-center font-bold w-[900px] h-[100px]">
                        <thead>
                            <tr>
                                <th className="p-3">Product ID</th>
                                <th className="p-8">Product Name</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-9">Unit</th>
                                <th className="p-10">Price</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map((element, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{element.product_id}</td>
                                            <td>{element.product_name}</td>
                                            <td>{element.quantity}</td>
                                            <td>{element.unit}</td>
                                            <td>{element.price}</td>
                                            <td className="flex gap-2">
                                            <button onClick={() => editProds(element.product_id)} className="border border-pink-950 px-4 py-2 rounded-lg shadow-2xl shadow-pink-500 bg-white text-pink-800 p-2 m-2 w-[100px] hover:bg-black hover:text-white hover:shadow-white hover:cursor-pointer">Edit</button>
                                            <button onClick={() => delProds(element.product_id)} className="border border-pink-950 px-4 rounded-lg shadow-2xl shadow-pink-500 bg-white text-pink-800 p-2 m-2 w-[100px] hover:bg-black hover:text-white hover:shadow-white hover:cursor-pointer">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Inventory;