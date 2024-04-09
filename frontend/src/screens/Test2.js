import React from "react";
const data = {
  '2021b': {'Chenab': 3},
  '2020b': {'Chenab': 1, 'Beas': 1},
  '2019b': {'Beas': 5}
};

const RiverMatrixTable = () => {
  // Extract years and rivers from the data
  const years = Object.keys(data);
  const rivers = Array.from(new Set(years.flatMap(year => Object.keys(data[year]))));

  // Construct the matrix data
  const matrixData = years.map(year => {
    const rowData = rivers.map(river => data[year][river] || 0);
    return { year, rowData };
  });
  return (
    <div style={{ overflowX: 'auto', margin: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>Year</th>
            {rivers.map(river => (
              <th key={river} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>{river}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixData.map(({ year, rowData }) => (
            <tr key={year}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{year}</td>
              {rowData.map((value, index) => (
                <td key={index} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiverMatrixTable;
