import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BookCreate_types, BookEdit_types, BookState_types, ErrorPayload } from "../types";
import { api } from "../axios/axios";
import { isAxiosError } from "axios";

export const addBookthunk = createAsyncThunk<BookState_types,BookCreate_types,{rejectValue:ErrorPayload}>(
    'author/bookcreate',
    async (bookData, { rejectWithValue }) => {
      try {
        const response = await api.post(`/book`,bookData); 
        if (response.data) {
          return response.data.book;
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
  
export const getBooksByAuthorIdThunk = createAsyncThunk<BookState_types[],string,{rejectValue:ErrorPayload}>(
    'author/getbooksbyAuthor',
    async (authorId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/book/authorId/${authorId}`); 
        if (response.data) {
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
  

export const getAllBoooks = createAsyncThunk<BookState_types[],void,{rejectValue:ErrorPayload}>(
    'author/getallbooks',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`/book/all`); 
        if (response.data) {
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
  

export const getBookbyIdThunk = createAsyncThunk<BookState_types,string,{rejectValue:ErrorPayload}>(
    'author/getbookbyid',
    async (bookId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/book/${bookId}`); 
        if (response.data) {
          return response.data.book;
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
  

export const deleteBookThunk = createAsyncThunk<BookState_types,{bookId:string,isActive:boolean},{rejectValue:ErrorPayload}>(
    'author/deletebook',
    async ({bookId,isActive}, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/book/${bookId}/${isActive}`); 
        if (response.data) {
          return response.data.book;
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
  

export const updateBookThunk = createAsyncThunk<BookState_types,BookEdit_types,{rejectValue:ErrorPayload}>(
    'author/editbook',
    async (book, { rejectWithValue }) => {
      try {
        const response = await api.put(`/book/${book.id}`,book); 
        if (response.data) {
          return response.data.book;
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
  