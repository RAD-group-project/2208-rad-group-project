import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
];

const Dashboard = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [




      {
        accessorKey: 'name',
        header: 'Name',
        size: 150
      },
      {
        accessorKey: 'author',
        header: 'Author',
        size: 150
      },
      {
        accessorKey: 'isbn',
        header: 'ISBN',
        size: 150
      },
      {
        accessorKey: 'copies',
        header: 'No.of Copies',
        size: 150
      },
      {
        accessorKey: 'registered',
        header: 'Registered Date',
        size: 150
      },
      // {
      //   accessorKey: 'name.firstName', //access nested data with dot notation
      //   header: 'First Name',
      //   size: 150,
      // },
      // {
      //   accessorKey: 'name.lastName',
      //   header: 'Last Name',
      //   size: 150,
      // },
      // {
      //   accessorKey: 'address', //normal accessorKey
      //   header: 'Address',
      //   size: 200,
      // },
      // {
      //   accessorKey: 'city',
      //   header: 'City',
      //   size: 150,
      // },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      //   size: 150,
      // },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Dashboard;
