/**
 * Real Textura List component from @exp-textura/react.
 * Uses List.ofType<T>() factory + TanStack ColumnDef columns.
 * @see https://textura.nintex.com/components/list
 * Import: import { List } from "@exp-textura/react";
 */
export { List } from '@exp-textura/react';

const List = ({ data = [], columns = [], children, enableSorting = true }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!enableSorting || !sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig, enableSorting]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!enableSorting) return;
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="textura-list">
      <ListContext.Provider
        value={{
          data: paginatedData,
          columns,
          sortConfig,
          handleSort,
          searchTerm,
          setSearchTerm,
          pageSize,
          setPageSize,
          currentPage,
          setCurrentPage,
          totalPages,
        }}
      >
        {children}
      </ListContext.Provider>
    </div>
  );
};

const ListContext = React.createContext();

// List.Toolbar - Discovery row above the list
List.Toolbar = ({ children }) => (
  <div className="textura-list-toolbar">{children}</div>
);

// List.ToolbarTrailing — trailing actions region inside toolbar
List.ToolbarTrailing = ({ children }) => (
  <div className="textura-list-toolbar-trailing">{children}</div>
);

// List.Search - Global search input
List.Search = ({ placeholder = 'Search...' }) => {
  const { searchTerm, setSearchTerm } = React.useContext(ListContext);
  return (
    <input
      type="text"
      className="textura-list-search"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
    />
  );
};

// List.Header - Column header row
List.Header = () => {
  const { columns, handleSort, sortConfig } = React.useContext(ListContext);
  return (
    <div className="textura-list-headers">
      {columns.map((col) => (
        <div
          key={col.key}
          className="textura-list-header"
          onClick={() => handleSort(col.key)}
        >
          {col.label}
          {sortConfig.key === col.key && (
            <span className="textura-list-sort-icon">
              {sortConfig.direction === 'asc' ? ' \u25b2' : ' \u25bc'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// List.Body - Data rows
List.Body = () => {
  const { data, columns } = React.useContext(ListContext);
  return (
    <div className="textura-list-body">
      {data.length > 0 ? (
        data.map((row, idx) => (
          <div key={idx} className="textura-list-row">
            {columns.map((col) => (
              <div key={col.key} className="textura-list-cell">
                {row[col.key]}
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="textura-list-empty">No items found</div>
      )}
    </div>
  );
};

// List.Footer - Pagination controls
List.Footer = ({ children }) => (
  <div className="textura-list-footer">{children}</div>
);

// List.Pagination - Page navigation
List.Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = React.useContext(ListContext);
  return (
    <div className="textura-list-pagination">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="textura-list-pagination-btn"
      >
        Previous
      </button>
      <span className="textura-list-pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="textura-list-pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

// List.PageSizeSelect - Rows per page selector
List.PageSizeSelect = ({ options = [5, 10, 20] }) => {
  const { pageSize, setPageSize } = React.useContext(ListContext);
  return (
    <select
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
      className="textura-list-page-size"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt} per page
        </option>
      ))}
    </select>
  );
};

export default List;
