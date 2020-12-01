// import React, { useState} from "react";

// const SearchColumns = (setObj) => {
//   const [obj,setObj] = useState([]);

//   return (
//     <>
//      if (obj.length !== 0) {
//     data = obj.map((val) => {
//       //idx는 유저의 id로 하자. notice 배열객체에 들어가있음.  외래키로.
//       return (
//         <Link to={`/notice/${val.notice_id}`} key={v4()}>
//           <div className="columns">
//             -<div className="column_title">{val.title}</div>
//             <div className="column_content">
//               <span className="text">{val.content}</span>
//               <br />
//               {/* <span className="user">{val.user}</span> */}
//               <br />
//               <span className="user">{val.update_date}</span>
//             </div>
//           </div>
//         </Link>
//       );
//     });
//     return data;
//   } else {
//     return <h2>Loading...</h2>;
//   }
//     </>
//   );
// };

// export default Search;
