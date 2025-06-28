import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BookState_types, ErrorPayload, PurchaseState, SalesHistory_Types, User_Tyeps } from "../types";
import { api } from "../axios/axios";
import { isAxiosError } from "axios";

export const  getallusers = createAsyncThunk<User_Tyeps[],void,{rejectValue:ErrorPayload}>(
    'getallusers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`/admin/users`); 
        if (response.data) {
          return response.data.users;
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

export const  deleteuserbyadmin = createAsyncThunk<void,{userId:string,isActive:boolean},{rejectValue:ErrorPayload}>(
    'deleteuserbyadmin',
    async ({isActive,userId}, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/admin/users/${userId}/${isActive}`); 
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
export const  getallorders = createAsyncThunk<PurchaseState[],void,{rejectValue:ErrorPayload}>(
    'getallordersbyadmin',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`/admin/orders`); 
        if (response.data) {
          return response.data.orders;
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
export const  getallBooksbyadmin = createAsyncThunk<BookState_types[],void,{rejectValue:ErrorPayload}>(
    'getallbooksbyadmin',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`/admin/books`); 
        if (response.data) {
            console.log(response.data.books);
            
          return response.data.books;
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


  
  
  export const fetchAllsalesHistory = createAsyncThunk<SalesHistory_Types[],void>(
    '/admin/fetchSaleshistory',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`/admin/sales-history`);
        if (response.data) {
          return response.data.sales
          
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
  