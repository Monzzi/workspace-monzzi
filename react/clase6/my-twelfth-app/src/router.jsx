// DIAPO 4 CLASE 6
// // OPTION 1
// import { createBrowserRouter } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>Home</h1>,
//   },
// ]);

// // OPTION 2
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
// } from 'react-router-dom';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<h1>Hello World!</h1>} />
//   )
// );

// // DIAPO 5 CLASE 6
// import { createBrowserRouter } from 'react-router-dom';
// import PublicLayout from './routes/publicLayout';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <root />,
//     errorElement: <errorPage />,
//     loader: rootLoader,
//     action: rootAction,
//     children: [
//       {
//         errorElement: <errorPage />,
//         children: [
//           { index: true, element: <Index /> },
//           {
//             path: 'contacts/contactId',
//             element: <Contact />,
//             loader: contactLoader,
//             action: contactAction,
//           },
//           {
//             path: 'contacts/:contactId/edit',
//             element: <EditContact />,
//             loader: contactLoader,
//             action: EditAction,
//           },
//           {
//             path: 'contacts/:contactId/destroy',
//             action: destroyAction,
//             errorElement: <div>Oops! There was an error.</div>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// Código final DIAPO 7.
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from './routes/PublicLayout';
import Clock from './routes/Clock'; // Este se trae de my-eighth-functional
import TableUsers from './routes/TableUsers'; // Se renombra desde my-seventh-app

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: 'clock', element: <Clock /> },
      { path: 'people', element: <TableUsers /> },
    ],
  },
]);

export default router;
