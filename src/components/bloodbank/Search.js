import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../assets/css/Search.css";

const Search = () => {
  const [place, setplace] = useState("");
  const [blood, setblood] = useState("");
  const [searchList, setsearchList] = useState([]);  // 초기 상태를 빈 배열로 설정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (place || blood) {
      setLoading(true);  // 로딩 상태 설정
      Axios.post("/api/home/search", {
        place: place,
        blood: blood,
      })
        .then((response) => {
          setLoading(false);
          if (Array.isArray(response.data)) {
            setsearchList(response.data);  // 응답이 배열일 경우 설정
          } else {
            setsearchList([]);  // 배열이 아닌 경우 빈 배열로 설정
          }
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to fetch search data.");
          console.error("Error fetching search data:", error);
        });
    }
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
            {searchList.length > 0 ? (
              searchList.map((val, i) => (
                <tr key={i}>
                  <td>{val.userFName}</td>
                  <td>{val.userPhone}</td>
                  <td>{val.userPlace}</td>
                  <td>{val.userBloodGroup}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Search;

