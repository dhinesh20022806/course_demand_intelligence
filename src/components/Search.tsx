type SearchProps = {
  text: string;
  handleText: (text: string) => void;
};

const Search = ({ text = "", handleText }: SearchProps) => {
  return (
    <div className="flex bg-gray-50 rounded-4xl px-4 py-4 w-6xl gap-2 focus-within:border-violet-700 border-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        onChange={(e) => handleText(e.currentTarget.value)}
        value={text}
        type="text"
        placeholder="Search for anything"
        className="outline-none text-2xl"
      />
    </div>
  );
};

// search component should loos complied with useDebounce for makeing api request (prevent multiple queries)
// search component display the ui return text higher componet
// props text and handletext

export default Search;
