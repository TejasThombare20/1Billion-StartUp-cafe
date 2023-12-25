import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../api';
import { setAllUserDetails } from '../context/actions/allUserAction';
import DataTable from './DataTable'
import { avatar } from '../assets'



const DBUsers =  () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
         dispatch(setAllUserDetails(data));
      })
    }
  }, [])

  if (!allUsers) {
    return <p className='flex justify-center items-center text-2xl '>Loading...</p>;
  }
  return (
    <div>
      <DataTable title="Remote Data Preview" columns={[
        {
          title: 'Image',
          field: 'photoURL',
          render: rowData => (
            <img
              src={rowData.photoURL ? rowData.photoURL : avatar}
              className='w-32 h-16 object-contain rounded-md'
            />
          ),
        },
        {
          title: "Name",
          field: 'displayName',
        },

        {
          title: "Email",
          field: 'email',

        },


        {
          title: "Verified",
          field: 'emailVerified',
          render: (rowData) => (
            <p className={`px-2 py-1 w-32 text-center text-primary rounded-md
              ${rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"}`}>
              {rowData.emailVerified ? "Verified" : "Not Verified"}
            </p>
          )

        },



      ]}
        data={allUsers}
        title="List of Users"
      
      />

    </div>
  )
}

export default DBUsers