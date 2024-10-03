import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetails,
  updateProduct,
  clearErrors,
} from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant';
import { getCategories } from '../../actions/categoryAction';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.productDetails);

  const { categories } = useSelector((state) => state.categories);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUploadProductImage = async (e) => {
    const formData = new FormData();

    formData.append('image', e.target.files[0]);

    try {
      const { data } = await axios.post(`/api/v1/upload`, formData);

      toast.success(data.message);
      setImage(data.image);
      setImageUrl(data.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.set('name', name);
    productData.set('price', price);
    productData.set('image', image);
    productData.set('category', category);
    productData.set('description', description);
    productData.set('stock', stock);

    dispatch(updateProduct(id, productData));
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setImage(product.image);
      setImageUrl(product.image);
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Update Successfully');
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate('/products');
    }

    dispatch(getCategories());
  }, [dispatch, product, id, updateError, isUpdated, navigate]);

  return (
    <div className="createProduct__container">
      <div className="text-center">
        <h4 className="text-uppercase fw-bold fs-3">Update Product</h4>
      </div>

      <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
        {imageUrl && (
          <div className="mb-4 text-center">
            <img src={imageUrl} alt="" />
          </div>
        )}
        <div className="mb-4">
          <label className="mb-2">{image ? image.name : 'Upload Image'}</label>
          <input
            type="file"
            name="image"
            accept="images/*"
            onChange={handleUploadProductImage}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2">Category</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cate) => (
              <option value={cate._id} key={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2">Description</label>
          <textarea
            cols="30"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <input type="submit" value="Submit" className="submit__btn" />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
