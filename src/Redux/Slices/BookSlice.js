import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from 'Configs/AxiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    bookList: [],
    searchResults: [],
    isSearching: false
};

export const getAllBooks = createAsyncThunk("course/getAllBooks", async () => {
    try {
        const response = axiosInstance.get("books");
        toast.promise(response, {
            loading: "Loading books data",
            success: "Successfully loaded all the books",
            error: "Something went wrong!!"
        });
        const result = await response;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
});

export const searchBooks = createAsyncThunk("course/searchBooks", async (query) => {
    try {
        const response = await axiosInstance.get(`books?search=${query}`);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
});

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchResults = [];
            state.isSearching = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            if (action?.payload?.data?.data) {
                state.bookList = action?.payload?.data?.data;
            }
        });
        builder.addCase(searchBooks.fulfilled, (state, action) => {
            if (action?.payload?.data?.data) {
                state.searchResults = action?.payload?.data?.data;
                state.isSearching = true;
            }
        });
    }
});

export const { clearSearch } = bookSlice.actions;
export default bookSlice.reducer;