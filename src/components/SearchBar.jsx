function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <form className="search-bar" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Cerca una ricetta vegetariana..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button type="submit">Cerca</button>
    </form>
  );
}

export default SearchBar;