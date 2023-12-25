import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme();

  // Show a loading state until data is available
  if (!data) {
    return <p className='flex justify-center items-center text-2xl '>Loading...</p>;
  }

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable columns={columns} data={data} title={title} actions={actions} />
    </ThemeProvider>
  );
};

export default DataTable;
