import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getData")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from Neon Database</h1>
      {Object.keys(data).map((tableName) => (
        <div key={tableName}>
          <h2>Table: {tableName}</h2>
          <table border="1">
            <thead>
              <tr>
                {data[tableName].length > 0 &&
                  Object.keys(data[tableName][0]).map((column) => (
                    <th key={column}>{column}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data[tableName].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
