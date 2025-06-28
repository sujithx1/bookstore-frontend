import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AddAdress_type, Address_types, ErrorPayload, User_create_types, User_Tyeps, UserLogin_types } from "../types";
import { api } from "../axios/axios";
import { isAxiosError } from "axios";


export const authLogin = createAsyncThunk<
  User_Tyeps,
  UserLogin_types,
  { rejectValue: ErrorPayload }
>("/api/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/login", userData);
    if(response.data){
        localStorage.setItem('token',response.data.token)
      return response.data.user
    }
        
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.error || "An error occurred",
        status: error.response?.status,
      });
    }

    return rejectWithValue({ message: "Something went wrong!" });
  }
});



export const authRegister = createAsyncThunk<
  User_Tyeps,
  User_create_types,
  { rejectValue: ErrorPayload }
>("/api/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/signup", userData);
        if(response.data)return response.data
        
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.error || "An error occurred",
        status: error.response?.status,
      });
    }

    return rejectWithValue({ message: "Something went wrong!" });
  }
});




 export const editUser = createAsyncThunk<
    User_Tyeps,
    {name:string,mobile:string,id:string,profile?:string},
    { rejectValue: ErrorPayload }
  >("/api/updateuser", async ( userData,{ rejectWithValue }) => {
    try {
      const response = await api.put(`/user/${userData.id}`,userData);
        return response.data.user;
      
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.error || "An error occurred",
          status: error.response?.status,
        });
      }

      return rejectWithValue({ message: "Something went wrong!" });
    }
  });




    export const deleteuser = createAsyncThunk<void,string,{rejectValue:ErrorPayload}>("/api/deleteuser", async ( id,{ rejectWithValue }) => {
    try {
      const response = await api.delete(`/user/${id}`);
        return response.data.user;
      
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.error || "An error occurred",
          status: error.response?.status,
        });
      }

      return rejectWithValue({ message: "Something went wrong!" });
    }
  });



  
export const logoutUser = createAsyncThunk<void,string,{rejectValue:ErrorPayload}>(
    'user/logout',
    async (id, { rejectWithValue }) => {
      try {
        console.log(id);
        console.log("logout user",id);
        
        
        const response = await api.post(`/logout/${id}`); 
        // console.log(response.data);
        
        return response.data;
        
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
  

  
export const addaddress = createAsyncThunk<Address_types,AddAdress_type,{rejectValue:ErrorPayload}>(
    'user/address',
    async (address, { rejectWithValue }) => {
      try {
        const response = await api.post(`/address/${address.userId}`,address.address); 
        // console.log(response.data);
        if (response.data) {
          
          return response.data.address;
        }
        
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
  
  
export const getuserbyIdThunk = createAsyncThunk<User_Tyeps,string,{rejectValue:ErrorPayload}>(
    'user/razorpay/create',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/user/${userId}`); 
        // console.log(response.data);
        if (response.data) {
          
          return response.data.user;
        }
        
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
  