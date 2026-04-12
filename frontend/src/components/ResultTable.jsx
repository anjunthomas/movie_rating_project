import '../styles/ResultTable.css';

export default function ResultTable({ columns, headers, data }) {
  if (!data || data.length === 0) {
    return <p className="no-results">No results found.</p>;
  }

  const displayHeaders = headers || columns.map(formatHeader);

  return (
    <div className="table-container">
      <table className="result-table">
        <thead>
          <tr>
            {displayHeaders.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col}>{row[col] ?? '—'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatHeader(text) {
  return text.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}