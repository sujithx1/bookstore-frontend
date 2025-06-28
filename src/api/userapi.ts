import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Address_types, ErrorPayload, PurchaseCreate_types, PurchaseState, Response_Razorpay_types } from "../types";
import { api } from "../axios/axios";
import { isAxiosError } from "axios";





export const purchaseBookThunk = createAsyncThunk<PurchaseState,PurchaseCreate_types,{rejectValue:ErrorPayload}>(
    'author/purchase',
    async (purchaseData, { rejectWithValue }) => {
      try {
        const response = await api.post(`/checkout`,purchaseData); 
        if (response.data) {
          return response.data.checkout;
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


export const order_created_razorypay = createAsyncThunk<Response_Razorpay_types,number,{rejectValue:ErrorPayload}>(
    'author/razorpay-createorder',
    async (amount, { rejectWithValue }) => {
      try {
        const response = await api.post(`/checkout/order`,{amount}); 
        if (response.data) {
          return response.data.order;
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

export const  getordersByuserid = createAsyncThunk<PurchaseState[],string,{rejectValue:ErrorPayload}>(
    'usergetordersbyid',
    async (userid, { rejectWithValue }) => {
      try {
        const response = await api.get(`/user/orders/${userid}`); 
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


export const  getaddressbyId = createAsyncThunk<Address_types,{userId:string,addressId:string},{rejectValue:ErrorPayload}>(
    'usergetaddressesbyaddressid',
    async ({userId,addressId}, { rejectWithValue }) => {
      try {
        const response = await api.get(`/user/address/${userId}/${addressId}`); 
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


export const  getUseraddresbyuserId = createAsyncThunk<Address_types[],string,{rejectValue:ErrorPayload}>(
    'usergetaddressesbyuserId',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/user/address/${userId}`); 
        if (response.data) {
          return response.data.addresses;
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

export const  deleteaddressbyAddressId = createAsyncThunk<void,{userId:string,addressId:string},{rejectValue:ErrorPayload}>(
    'deleteaddressbyid',
    async ({userId,addressId}, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/user/address/${userId}/${addressId}`); 
        if (response.data) {
          return response.data;
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