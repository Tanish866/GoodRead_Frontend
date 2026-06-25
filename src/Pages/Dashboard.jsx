import BookCard from "Components/BookCard/BookCard";
import useSearchDebounce from "Hooks/useSearchDebounce";
import Layout from "Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSearch, getAllBooks, searchBooks } from "Redux/Slices/BookSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookState = useSelector((state) => state.book);
    const [searchQuery, setSearchQuery] = useState("");

    const onSearch = useCallback((query) => dispatch(searchBooks(query)), [dispatch]);
    const onClear = useCallback(() => dispatch(clearSearch()), [dispatch]);

    const { getSuggestions } = useSearchDebounce(searchQuery, onSearch, onClear, bookState.bookList);
    const suggestions = getSuggestions();
    const showSuggestions = suggestions.length > 0 && searchQuery.trim().length > 0;

    useEffect(() => {
        if (bookState.bookList.length === 0) {
            dispatch(getAllBooks());
        }
    }, []);

    function handleSuggestionClick(book) {
        setSearchQuery(book.title);
        navigate("/book/description", { state: { ...book } });
    }

    function handleClear() {
        setSearchQuery("");
        dispatch(clearSearch());
    }

    function highlightMatch(text, query) {
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return text;
        return (
            <>
                {text.substring(0, index)}
                <span className="text-emerald-400 font-semibold">
                    {text.substring(index, index + query.length)}
                </span>
                {text.substring(index + query.length)}
            </>
        );
    }

    const displayBooks = bookState.isSearching ? bookState.searchResults : bookState.bookList;

    return (
        <Layout>
            <div className="min-h-screen bg-[#181b24] px-4 py-8 sm:px-6 lg:px-10">

                <div className="relative mb-8">
                    <div className="flex items-center gap-3 rounded-xl bg-[#1f2433] px-4 py-3 shadow-md border border-white/10 focus-within:border-emerald-400 transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search books by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-white outline-none placeholder:text-white/40 text-lg"
                        />
                        {searchQuery && (
                            <button onClick={handleClear} className="text-white/50 hover:text-white text-xl transition">
                                ✕
                            </button>
                        )}
                    </div>

                    {showSuggestions && (
                        <ul className="absolute z-50 mt-2 w-full rounded-xl bg-[#1f2433] border border-white/10 shadow-2xl overflow-hidden">
                            {suggestions.map((book) => (
                                <li
                                    key={book._id}
                                    onClick={() => handleSuggestionClick(book)}
                                    className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/5 transition border-b border-white/5 last:border-none"
                                >
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="h-12 w-8 object-cover rounded"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/80x120/1f2433/ffffff?text=?`;
                                        }}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-white text-base">
                                            {highlightMatch(book.title, searchQuery)}
                                        </span>
                                        <span className="text-white/40 text-sm">
                                            {book.author?.name}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {searchQuery && (
                    <p className="mb-4 text-white/50 text-sm">
                        {displayBooks.length} result{displayBooks.length !== 1 ? "s" : ""} for{" "}
                        <span className="text-emerald-400">"{searchQuery}"</span>
                    </p>
                )}

                {displayBooks.length > 0 ? (
                    displayBooks.map((book) => (
                        <BookCard key={book._id} data={book} />
                    ))
                ) : (
                    <p className="text-center text-white/50 text-xl mt-20">
                        {bookState.isSearching ? `No books found for "${searchQuery}".` : "No books available."}
                    </p>
                )}
            </div>
        </Layout>
    );
}