import Layout from "Layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addBookToShelf, getAllBookShelves } from "Redux/Slices/ShelfSlice";

export default function BookDescription() {
    const { state } = useLocation();
    const shelfState = useSelector((state) => state.shelf);
    const dispatch = useDispatch();

    useEffect(() => {
        if (shelfState.shelfList.length === 0) {
            dispatch(getAllBookShelves());
        }
    }, []);

    async function handleAddToShelf(shelfName) {
        await dispatch(addBookToShelf({ shelfName, bookId: state._id }));
        dispatch(getAllBookShelves());
    }

    return (
        <Layout>
            {state?._id && (
                <div className="flex h-full items-center justify-center overflow-visible bg-[#181b24] px-4 py-8 text-white sm:px-6 lg:px-10">
                    <div className="flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-20">
                        
                        <div className="shrink-0">
                            <img
                                src={state.image}
                                alt={state.title}
                                className="h-[360px] w-[230px] object-cover shadow-2xl sm:h-[440px] sm:w-[280px] lg:h-[520px] lg:w-[330px]"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/330x520/1f2433/ffffff?text=${encodeURIComponent(state.title)}`;
                                }}
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                                {state.title}
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:mx-0 lg:mt-10 lg:text-2xl">
                                {state.description}
                            </p>

                            <p className="mt-6 text-2xl cursor-pointer font-semibold text-yellow-300 lg:mt-10 lg:text-3xl">
                                {state.author?.name}
                            </p>

                            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start lg:mt-10">
                                {state.genres?.map((genre) => (
                                    <span
                                        key={genre._id}
                                        className="rounded-lg cursor-pointer bg-purple-700 px-4 py-2 text-base sm:text-lg lg:text-xl"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 space-y-4 text-lg sm:text-xl lg:mt-12 lg:space-y-8 lg:text-2xl">
                                <p className="text-white/70">
                                    Pages:{" "}
                                    <span className="text-yellow-300">{state.pages}</span>
                                </p>

                                <p className="text-white/70">
                                    Publish Date:{" "}
                                    <span className="text-yellow-300">{state.publishDate}</span>
                                </p>

                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn m-1">
                                        Add to Shelf
                                    </div>
                                    <ul
                                        tabIndex="-1"
                                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                                    >
                                        {shelfState.shelfList.length > 0 ? (
                                            shelfState.shelfList.map((shelf) => (
                                                <li
                                                    key={shelf._id}
                                                    onClick={() => handleAddToShelf(shelf.name)}
                                                >
                                                    <a>{shelf.name}</a>
                                                </li>
                                            ))
                                        ) : (
                                            <li>
                                                <a className="text-white/50">No shelves found</a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
