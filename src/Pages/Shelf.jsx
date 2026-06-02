import bookImage from "Assets/Images/images.jpg"
import Layout from "Layout/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookShelves, addBookToShelf } from "Redux/Slices/ShelfSlice";

export default function Shelves() {
  const dispatch = useDispatch();
  
  const shelfList = useSelector((state) => state.shelf.shelfList);

  const [selectedShelfId, setSelectedShelfId] = useState(null);
  const [bookDetails, setBookDetails] = useState({ title: "", author: "" });

  useEffect(() => {
    if (shelfList.length === 0) {
      dispatch(getAllBookShelves());
    }
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBookDetails((prev) => ({ ...prev, [name]: value }));
  }

  async function addBook(e) {
    e.preventDefault();
    if (!bookDetails.title || !bookDetails.author) return;

    await dispatch(addBookToShelf({
      shelfName: selectedShelfId, 
      bookId: bookDetails.title,
    }));

    setBookDetails({ title: "", author: "" });
    setSelectedShelfId(null);
  }

  return (
    <Layout>
      <main className="min-h-full bg-[#181b24] px-6 py-10 text-white">
        <h1 className="mb-8 text-4xl font-bold">My Shelves</h1>

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
                  onClick={() => setSelectedShelfId(shelf._id)}
                  className="btn btn-primary"
                >
                  Add Book
                </button>
              </div>

              {selectedShelfId === shelf._id && (
                <form
                  onSubmit={addBook}
                  className="mb-6 grid gap-4 rounded-xl border border-white/10 bg-[#202637] p-4 md:grid-cols-3"
                >
                  <input
                    type="text"
                    name="title"
                    value={bookDetails.title}
                    onChange={handleInputChange}
                    placeholder="Book title"
                    className="input input-bordered"
                  />
                  <input
                    type="text"
                    name="author"
                    value={bookDetails.author}
                    onChange={handleInputChange}
                    placeholder="Author name"
                    className="input input-bordered"
                  />
                  <button className="btn btn-success">Save Book</button>
                </form>
              )}

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {shelf.books.length > 0 ? (
                  shelf.books.map((book) => (
                    <div key={book._id} className="rounded-xl bg-[#202637] p-4">
                      <img
                        src={bookImage}
                        alt={book.title}
                        className="h-56 w-full rounded-lg object-cover"
                      />
                      <h3 className="mt-4 text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-white/50">{book.author?.name}</p>
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