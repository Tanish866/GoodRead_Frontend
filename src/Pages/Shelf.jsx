import Layout from "Layout/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "Redux/Slices/BookSlice";
import { addBookToShelf, createShelf, getAllBookShelves, removeBookFromShelf } from "Redux/Slices/ShelfSlice";

export default function Shelves() {
    const dispatch = useDispatch();
    const shelfList = useSelector((state) => state.shelf.shelfList);
    const bookList = useSelector((state) => state.book.bookList);

    const [selectedShelfId, setSelectedShelfId] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState("");
    const [showCreateShelf, setShowCreateShelf] = useState(false);
    const [newShelfName, setNewShelfName] = useState("");

    useEffect(() => {
        dispatch(getAllBookShelves());
        dispatch(getAllBooks());
    }, []);

    async function addBook(e, shelfName) {
        e.preventDefault();
        if (!selectedBookId) return;
        await dispatch(addBookToShelf({ shelfName, bookId: selectedBookId }));
        await dispatch(getAllBookShelves());
        setSelectedBookId("");
        setSelectedShelfId(null);
    }

    async function handleRemoveBook(shelfName, bookId) {
        await dispatch(removeBookFromShelf({ shelfName, bookId }));
        await dispatch(getAllBookShelves());
    }

    async function handleCreateShelf(e) {
        e.preventDefault();
        if (!newShelfName.trim()) return;
        await dispatch(createShelf({ name: newShelfName.trim() }));
        setNewShelfName("");
        setShowCreateShelf(false);
    }

    return (
        <Layout>
            <main className="min-h-full bg-[#181b24] px-6 py-10 text-white">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold">My Shelves</h1>
                    <button
                        onClick={() => setShowCreateShelf((prev) => !prev)}
                        className="btn btn-primary"
                    >
                        + New Shelf
                    </button>
                </div>

                {showCreateShelf && (
                    <form
                        onSubmit={handleCreateShelf}
                        className="mb-8 flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                        <input
                            type="text"
                            value={newShelfName}
                            onChange={(e) => setNewShelfName(e.target.value)}
                            placeholder="Shelf name (e.g. Favourites)"
                            className="input input-bordered flex-1"
                        />
                        <button type="submit" className="btn btn-success">Create</button>
                        <button
                            type="button"
                            onClick={() => { setShowCreateShelf(false); setNewShelfName(""); }}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                    </form>
                )}

                <div className="space-y-8">
                    {shelfList.map((shelf) => (
                        <section
                            key={shelf._id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold">{shelf.name}</h2>
                                    <p className="text-white/50">{shelf.books.length} books</p>
                                </div>
                                <button
                                    onClick={() =>
                                        setSelectedShelfId((prev) =>
                                            prev === shelf._id ? null : shelf._id
                                        )
                                    }
                                    className="btn btn-primary"
                                >
                                    {selectedShelfId === shelf._id ? "Cancel" : "Add Book"}
                                </button>
                            </div>

                            {selectedShelfId === shelf._id && (
                                <form
                                    onSubmit={(e) => addBook(e, shelf.name)}
                                    className="mb-6 flex gap-4 rounded-xl border border-white/10 bg-[#202637] p-4"
                                >
                                    <select
                                        value={selectedBookId}
                                        onChange={(e) => setSelectedBookId(e.target.value)}
                                        className="select select-bordered flex-1"
                                    >
                                        <option value="">Select a book</option>
                                        {bookList.map((book) => (
                                            <option key={book._id} value={book._id}>
                                                {book.title} — {book.author?.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button type="submit" className="btn btn-success">
                                        Save Book
                                    </button>
                                </form>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {shelf.books.length > 0 ? (
                                    shelf.books.map((book) => (
                                        <div
                                            key={book._id}
                                            className="group relative flex flex-col rounded-xl bg-[#202637] overflow-hidden h-72"
                                        >
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full object-cover flex-shrink-0"
                                                style={{ height: '160px' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://placehold.co/256x160/1f2433/ffffff?text=${encodeURIComponent(book.title)}`;
                                                }}
                                            />

                                            <button
                                                onClick={() => handleRemoveBook(shelf.name, book._id)}
                                                className="absolute top-2 right-2 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-lg"
                                                title="Remove from shelf"
                                            >
                                                ✕
                                            </button>

                                            <div className="p-3 flex flex-col gap-1 flex-1 min-h-0">
                                                <h3 className="text-base font-semibold leading-tight truncate">
                                                    {book.title || "Unknown Title"}
                                                </h3>
                                                <p className="text-sm text-white/50 truncate">
                                                    {book.author?.name || "Unknown Author"}
                                                </p>
                                                <p className="text-xs text-yellow-300">
                                                    ⭐ {book.rating?.toFixed(1) || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-full rounded-xl border border-dashed border-white/10 py-10 text-center text-white/50">
                                        No books added yet
                                    </p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </Layout>
    );
}