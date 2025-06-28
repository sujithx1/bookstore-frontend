import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthorStats_Types, RecentSales_Types } from "../types";
import { api } from "../axios/axios";
import { isAxiosError } from "axios";


  export const fetchAuthorStats = createAsyncThunk<AuthorStats_Types,string>(
  "author/fetchStats",
  async (authorId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/author/summery/${authorId}`); 
        // console.log(response.data);
        if (response.data) {
          
          return response.data.authorstats;
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


export const fetchRecentSales = createAsyncThunk<RecentSales_Types[],string>(
  'author/fetchRecentSales',
  async (authorId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/author/${authorId}/recent-sales`);
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


export const fetchSalesHistoryThunk = createAsyncThunk<RecentSales_Types[],string>(
  'author/fetchSaleshistory',
  async (authorId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/author/${authorId}/sales-history`);
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
