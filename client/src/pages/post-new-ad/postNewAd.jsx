import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SelectField, TextField } from '../../components/common';
import { categories } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import TextAreaField from '../../components/common/form/textAreaField';
import { GoodsContext, ModalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

function PostNewAd() {
  const { register, handleSubmit } = useForm();
  const { goods, add } = useContext(GoodsContext);
  const { show, hide } = useContext(ModalContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    add({ ...data, id: Date.now() });
    show({
      content: <p>Announcement published!</p>,
      footerButtons: [
        {
          text: 'Confirm',
          type: 'button',
          handler: () => {
            hide();
            navigate('/', { replace: true });
          },
        },
      ],
    });
  };

  useEffect(() => {
    localStorage.setItem('goods', JSON.stringify(goods));
  }, [goods]);

  return (
    <div className="container mx-auto mb-10">
      <h1 className="my-6 text-4xl font-medium dark:text-white">Post new ad</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-slate-100 px-6 py-6 mb-6 rounded">
          <div className="w-full max-w-2xl">
            <TextField id="name" register={register} label="Goods name" options={{ required: true }} />
            <SelectField
              register={register}
              defaultOption="Choose category"
              id="category"
              options={categories}
              label="Categories"
              validatorConfig={{ required: true }}
            />
          </div>
        </div>
        <div className="bg-slate-100 px-6 py-10 mb-6 rounded">
          <div className="w-full max-w-2xl">
            <h2 className="dark:text-white">Photo</h2>
            <div className="grid grid-cols-4">
              {new Array(16).fill(null).map((box, index) => (
                <div key={index} className="w-40 h-32 m-2 flex items-center justify-center bg-gray-400">
                  <FontAwesomeIcon icon={faImage} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-slate-100 px-6 py-10 mb-6 rounded">
          <div className="w-full max-w-2xl">
            <TextAreaField register={register} id="description" label="Description" />
          </div>
        </div>
        <div className="bg-slate-100 px-6 py-10 mb-6 rounded">
          <div className="w-full max-w-2xl">
            <TextField id="price" register={register} label="Price" />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
             focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600
              dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostNewAd;
