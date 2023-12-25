import React from 'react';
import { DataTable } from '../component'
import { HiCurrencyRupee } from '../assets/icons'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productAction';
import { alertNull, alertSuccess } from '../context/actions/alertAction';




const DBItem = () => {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch();


  return (
    <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
      <DataTable title="Remote Data Preview" columns={[
        {
          title: 'Image',
          field: 'imageURL',
          render: rowData => (
            <img
              className='w-32 h-16 object-contain rounded-md'
              src={rowData.imageURL}
            />
          ),
        },
        {
          title: "Name",
          field: 'product_name',
        },

        {
          title: "Category",
          field: 'product_category',

        },

        {
          title: "Price",
          field: 'product_price',
          render: (rowData) => (
            <p className='text-2xl font-semibold text-textColo flex items-center justify-center'>
              <HiCurrencyRupee className='text-red-500 ' />
              {parseFloat(rowData.product_price).toFixed(2)}
            </p>
          )
        },

      ]}
        data={products}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit" + rowData.productId)
            }
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (window.confirm("Are you sure you want to delete")) {
                deleteProduct(rowData.productId).then(res => {
                  dispatch(alertSuccess("product deleted from the cloud"));
                  setInterval(() => {
                    dispatch(alertNull())
                  }, 2000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  })

                })

              }
            }
          }

        ]}
      />
    </div>

  )
}

export default DBItem