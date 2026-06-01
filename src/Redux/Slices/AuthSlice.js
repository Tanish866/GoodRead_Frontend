import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from 'Configs/AxiosInstance';
import toast from 'react-hot-toast'; // ✅ changed import

export const signup = createAsyncThunk("auth/signup", async (data) => {
    try {
        const response = axiosInstance.post("signup", data);
        toast.promise(response, {
            loading: "Submitting form",
            success: "Successfully Signed up!!",
            error: "Something went wrong!!"
        });
        const result = await response;
        return result.data;
    } catch (error) {
        console.log(error);
    }
});

export const signin = createAsyncThunk("auth/signin", async (data) => {
    try {
        const response = axiosInstance.post("signin", data);
        toast.promise(response, {
            loading: "Submitting form",
            success: "Successfully Signed in!!",
            error: "Invalid email or password!!"
        });
        const result = await response;
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
});

const initialState = {
    isLoggedin: localStorage.getItem('isLoggedin') || false,
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            state.isLoggedin = (action?.payload?.data != undefined);
            state.username = action?.payload?.data?.username;
            state.token = action?.payload?.data?.token;

            localStorage.setItem("isLoggedin", (action?.payload?.data != undefined));
            localStorage.setItem("username", action?.payload?.data?.username);
            localStorage.setItem("token", action?.payload?.data?.token);
        })
    }
});

export default authSlice.reducer;