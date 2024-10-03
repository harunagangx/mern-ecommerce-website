import React, { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, clearErrors } from '../../actions/categoryAction';
import { toast } from 'sonner';
import './CreateCategoryWidget.scss';

const CreateCategoryWidget = ({ handleCloseWidget }) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.newCategory);

  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', categoryName);

    dispatch(createCategory(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className="widget__container p-3">
      <div className="widget__header d-flex align-items-center justify-content-between mb-2">
        <h4>Create Category</h4>
        <span onClick={handleCloseWidget}>
          <IoMdCloseCircleOutline size={22} />
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input__container d-flex flex-column gap-2 p-2 mb-1">
          <label>Category Name</label>
          <input
            type="text"
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="p-2">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryWidget;
