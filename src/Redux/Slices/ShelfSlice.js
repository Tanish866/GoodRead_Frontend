import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from 'Configs/AxiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    shelfList: []
};

export const getAllBookShelves = createAsyncThunk("course/getAllBookShelves", async () => {
    try {
        const response = axiosInstance.get("bookshelves");
        toast.promise(response, {
            loading: "Loading bookShelves data",
            success: "Successfully loaded all the bookShelves",
            error: "Something went wrong!!"
        });
        const result = await response;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
});

export const addBookToShelf = createAsyncThunk("course/addBookToShelf", async (data) => {
    try {
        const response = axiosInstance.patch(`bookshelves/${data.shelfName}/add/${data.bookId}`, {});
        toast.promise(response, {
            loading: "Adding book to shelf",
            success: "Successfully added book to shelf",
            error: "Something went wrong!!"
        });
        const result = await response;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
});

export const removeBookFromShelf = createAsyncThunk("course/removeBookFromShelf", async (data) => {
    try {
        const response = axiosInstance.patch(`bookshelves/${data.shelfName}/remove/${data.bookId}`, {});
        toast.promise(response, {
            loading: "Removing book from shelf",
            success: "Successfully removed book from shelf",
            error: "Something went wrong!!"
        });
        const result = await response;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
});

export const createShelf = createAsyncThunk("shelf/createShelf", async (data) => {
    try {
        const response = axiosInstance.post("bookshelves", { name: data.name });
        toast.promise(response, {
            loading: "Creating shelf...",
            success: "Shelf created!",
            error: "Something went wrong!!"
        });
        const result = await response;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
});

const shelfSlice = createSlice({
    name: 'shelf',
    initialState,
    reducers: {
        clearShelf: (state) => {
            state.shelfList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookShelves.fulfilled, (state, action) => {
                if (action?.payload?.data?.data) {
                    state.shelfList = action.payload.data.data.map((shelf) => ({
                        ...shelf,
                        books: shelf.books.filter(
                            (book, index, self) =>
                                index === self.findIndex((b) => b._id === book._id)
                        ),
                    }));
                }
            })
            .addCase(addBookToShelf.fulfilled, (state, action) => {
                if (action?.payload?.data?.data) {
                    const updatedShelf = action.payload.data.data;
                    state.shelfList = state.shelfList.map((shelf) =>
                        shelf._id === updatedShelf._id
                            ? {
                                ...updatedShelf,
                                books: updatedShelf.books.filter(
                                    (book, index, self) =>
                                        index === self.findIndex((b) => b._id === book._id)
                                ),
                            }
                            : shelf
                    );
                }
            })
            .addCase(removeBookFromShelf.fulfilled, (state, action) => {
                if (action?.payload?.data?.data) {
                    const updatedShelf = action.payload.data.data;
                    state.shelfList = state.shelfList.map((shelf) =>
                        shelf._id === updatedShelf._id
                            ? {
                                ...updatedShelf,
                                books: updatedShelf.books.filter(
                                    (book, index, self) =>
                                        index === self.findIndex((b) => b._id === book._id)
                                ),
                            }
                            : shelf
                    );
                }
            })
            .addCase(createShelf.fulfilled, (state, action) => {
                if (action?.payload?.data?.data) {
                    state.shelfList.push(action.payload.data.data);
                }
            });
    }
});

export const { clearShelf } = shelfSlice.actions;
export default shelfSlice.reducer;