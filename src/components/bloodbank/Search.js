// import React, { useState, useEffect } from "react";
// import Axios from "axios";

// //css
// import "../../assets/css/Search.css";

// const Search = () => {
//   //variables
//   var [place, setplace] = useState("");
//   var [blood, setblood] = useState("");
//   const [searchList, setsearchList] = useState([]);

//   //search for blood
//   useEffect(() => {
//     Axios.post("/api/home/search", {
//       place: place,
//       blood: blood,
//     }).then((response) => {
//       if (response.data.message) {
//         //alert(response.data.message);
//       } else {
//         setsearchList(response.data);
//       }
//     });
//   },[blood, place]);

//   //returning
//   return (
//     <div className="search">
//       {" "}
//       <form>
//         <input
//           type="text"
//           placeholder="PLACE"
//           name="place"
//           onChange={(e) => {
//             setplace(e.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="BLOOD GROUP"
//           name="bloodGroup"
//           onChange={(e) => {
//             setblood(e.target.value);
//           }}
//         />
//         {/* <button onClick={()=>useEffect}><i className="fa fa-search"/></button> */}
//       </form>
//       <table className="blood-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Phone </th>
//             <th>Place</th>
//             <th>BloodGroup</th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchList.map((val,i) => {
//             return (
//               <tr key={i}>
//                 <td>{val.userFName}</td>
//                 <td>{val.userPhone}</td>
//                 <td>{val.userPlace}</td>
//                 <td>{val.userBloodGroup}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Search;


import React, { useState, useEffect } from "react";
import Axios from "axios";

//css
import "../../assets/css/Search.css";

const Search = () => {
  const [place, setplace] = useState("");
  const [blood, setblood] = useState("");
  const [searchList, setsearchList] = useState([]);

  useEffect(() => {
    Axios.post("/api/home/search", {
      place: place,
      blood: blood,
    }).then((response) => {
      setsearchList(response.data);
    }).catch((error) => {
      console.error("Error fetching search data:", error);
    });
  }, [blood, place]);

  return (
    <div className="search">
      <form>
        <input
          type="text"
          placeholder="PLACE"
          name="place"
          onChange={(e) => setplace(e.target.value)}
        />
        <input
          type="text"
          placeholder="BLOOD GROUP"
          name="bloodGroup"
          onChange={(e) => setblood(e.target.value)}
        />
      </form>
      <table className="blood-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Place</th>
            <th>BloodGroup</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map((val, i) => (
            <tr key={i}>
              <td>{val.userFName}</td>
              <td>{val.userPhone}</td>
              <td>{val.userPlace}</td>
              <td>{val.userBloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
