import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from 'Configs/AxiosInstance';
import toast from 'react-hot-toast'; 


const initialState = {
    bookList:[]
}

export const getAllBooks = createAsyncThunk("course/getAllBooks", async () => {

    try {
        const response = axiosInstance.get("books");
        toast.promise(response, {
            loading: "Loading books data",
            success: "Successfully loaded all the books",
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


const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (state, action) =>{
            if(action?.payload?.data?.data){
                state.bookList = action?.payload?.data?.data;
            }
        })
        
    }
});

export default bookSlice.reducer;