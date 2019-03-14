/* eslint-disable */
import React from 'react';
import {Link} from 'react-router-dom';

function BreadCrumb({history = [], text = ''}) {
  return (
    <React.Fragment />
    // <div className="bg-tint border-bottom">
    //   <div className="container">
    //     <nav className="py-3">
    //       <ol className="breadcrumb text-white">
    //         {history.map(item => (
    //           <li className="breadcrumb-item" key={item.text}>
    //             <Link to={item.link}>{item.text}</Link>
    //           </li>
    //         ))}
    //         <li className="breadcrumb-item active" key={text}>
    //           {text}
    //         </li>
    //       </ol>
    //     </nav>
    //   </div>
    // </div>
  );
}

export default BreadCrumb;
