import React, { useEffect, Fragment, useState } from 'react';
import Loader from '../../components/loader/Loader';
import CreateCategoryWidget from '../../components/createCategoryWidget/CreateCategoryWidget';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  deleteCategory,
  clearErrors,
} from '../../actions/categoryAction';
import {
  DELETE_CATEGORY_RESET,
  CREATE_CATEGORY_RESET,
} from '../../constants/categoryConstants';
import { IoTrashOutline, IoAddCircleOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import './CategoryList.scss';

const TABLE_HEADS = ['#ID', 'Category Name', ''];

const CategoryList = () => {
  const dispatch = useDispatch();

  const [showWidget, setShowWidget] = useState(false);

  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.category
  );

  const { success } = useSelector((state) => state.newCategory);

  const handleToggleWidget = () => {
    setShowWidget(!showWidget);
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (deleteError) {
      toast.error(deleteError);
      clearErrors();
    }

    if (isDeleted) {
      toast.success('Delete successfully');
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    if (success) {
      toast.success('Create successfully');
      dispatch({ type: CREATE_CATEGORY_RESET });
      setShowWidget(false);
    }

    dispatch(getCategories());
  }, [dispatch, error, deleteError, isDeleted, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="category-table__container">
            <div className="table__header d-flex align-items-center justify-content-between">
              <h4 className="header__title">All Category</h4>
              <button onClick={handleToggleWidget}>
                <IoAddCircleOutline size={25} />
                Create Category
              </button>
            </div>
            <div className="table__content">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADS?.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cate) => {
                    return (
                      <tr key={cate._id}>
                        <td>{cate._id}</td>
                        <td>{cate.name}</td>
                        <td>
                          <span onClick={() => deleteCategoryHandler(cate._id)}>
                            <IoTrashOutline size={25} color="#ef0606" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {showWidget && (
            <>
              <div className="overlay"></div>
              <CreateCategoryWidget handleCloseWidget={handleToggleWidget} />
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CategoryList;
