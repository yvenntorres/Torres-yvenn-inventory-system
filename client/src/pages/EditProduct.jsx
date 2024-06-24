import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editProducts, getProductsById } from "../api/products";

const EditProducts = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductsById(productId);
        setProductName(product.product_name || '');
        setQuantity(product.quantity || '');
        setUnit(product.unit || '');
        setPrice(product.price || '');
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleApp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await editProducts(productId, productName, quantity, unit, price);
      setSuccess('Product updated');
      navigate('/inventory');
    } catch (error) {
      setError('Failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-rose-300 p-52 flex justify-center items-center">
        <div className="border-4 p-2 border-x-rose-600 border-y-rose-800 rounded-3xl m-5 border-solid bg-rose-100 border-pink-300 w-[500px] h-[420px]">
          <div className="text-5xl p-5 text-black text-center font-bold">Update Product</div>

          <form onSubmit={handleApp}>
            <div className="flex gap-5 m-5 justify-center">
              <div className="text-lg text-md font-mono text-black font-semibold">Product ID:</div>
              <input value={productId} readOnly className="rounded border font-bold border-pink-300" type="text" />
            </div>

            <div className="flex gap-5 m-5 justify-center">
              <div className="text-lg text-md font-mono text-black font-semibold">Product Name:</div>
              <input value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border font-bold border-pink-300" type="text" />
            </div>

            <div className="flex gap-5 m-5 justify-center">
              <div className="text-lg text-md font-mono text-black font-semibold">Quantity:</div>
              <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border font-bold border-pink-300" type="text" />
            </div>

            <div className="flex gap-5 m-5 justify-center">
              <div className="text-lg text-md font-mono text-black font-semibold">Unit:</div>
              <input value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border font-bold border-pink-300" type="text" />
            </div>

            <div className="flex gap-5 m-5 justify-center">
              <div className="text-lg text-md font-mono text-black font-semibold">Price:</div>
              <input value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border font-bold border-pink-300" type="text" />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="rounded-lg w-[90px] shadow-2xl shadow-pink-500 bg-white text-pink-800 p-2 hover:bg-black hover:text-white hover:shadow-white hover:cursor-pointer">
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProducts;
