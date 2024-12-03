import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../utils/constants";

const initialState = {
    isAuthenticated: false,
    authStatus: 'idle',
    error: null
}

export const signUp = createAsyncThunk("auth/signup",async({name,email,password}, {rejectWithValue})=>{
    try{
        const response = await axios.post(`${baseUrl}/api/auth/signup`, {name,email,password})
        return response.data;
    }catch(error){
       return rejectWithValue(error.response.data.error); 
    }
})


export const login = createAsyncThunk("auth/login",async({email,password}, {rejectWithValue})=>{
    try{
        const response = await axios.post(`${baseUrl}/api/auth/login`, {email,password})
        
        return response.data;
    }catch(error){
       return rejectWithValue(error.response.data.message); 
    }
})


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        resetAuthStatus: (state)=>{
            state.authStatus = 'idle'
        },
        rehydrate:(state,action)=> {
            state.isAuthenticated = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signUp.pending,(state)=>{
            state.authStatus = 'loading.....'
        })
        .addCase(signUp.fulfilled, (state,action)=>{
            state.authStatus = "success";
            toast.success(action.payload.message);
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.authStatus = "rejected";
            state.error = action.payload
            toast.error(action.payload);
        })

        builder
        .addCase(login.pending,(state)=>{
            state.authStatus = 'loading.....'
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.authStatus = "success";
            state.isAuthenticated = true;
            localStorage.setItem('auth-token',`${action.payload}`)
            toast.success('login success');
        })
        .addCase(login.rejected,(state,action)=>{
            state.authStatus = "rejected";
            state.error = action.payload
            toast.error(action.payload);
        })
    }
})

export const {resetAuthStatus,rehydrate} = authSlice.actions;
export default authSlice.reducer;