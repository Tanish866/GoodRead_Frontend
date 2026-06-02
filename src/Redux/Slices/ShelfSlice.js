import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from 'Configs/AxiosInstance';
import toast from 'react-hot-toast'; 


const initialState = {
    shelfList:[]
}

export const getAllBookShelves = createAsyncThunk("course/getAllBookShelves", async () => {

    try {
        const response = axiosInstance.get("bookshelves", {headers: {
            'x-access-token': localStorage.getItem("token")
        }});
        toast.promise(response, {
            loading: "Loading bookShelves data",
            success: "Successfully loaded all the bookShelves",
            error: "Something went wrong!!"
        });
        const result = await response;
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
});

export const addBookToShelf = createAsyncThunk("course/addBookToShelf", async (data) => {

    try {
        const response = axiosInstance.patch(
            `bookshelves/${data.shelfName}/add/${data.bookId}`,
            {}, 
        {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    }
);
        toast.promise(response, {
            loading: "Adding book to shelf data",
            success: "Successfully added book to shelf",
            error: "Something went wrong!!"
        });
        const result = await response;
        console.log(result);
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
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBookShelves.fulfilled, (state, action) => {
            if (action?.payload?.data?.data) {
                const shelves = action.payload.data.data;

                state.shelfList = shelves.map((shelf) => ({
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
                    shelf._id === updatedShelf._id ? {
                        ...updatedShelf,
                        books: updatedShelf.books.filter(
                            (book, index, self) =>
                                index === self.findIndex((b) => b._id === book._id)
                        )
                    } : shelf
                );
            }
        })
        
    }
});

export default shelfSlice.reducer;