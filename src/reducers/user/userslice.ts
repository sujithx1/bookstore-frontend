import { createSlice } from "@reduxjs/toolkit";
import type { InitialState_types, User_Tyeps } from "../../types";
import { getStoredUser, getStoredUsers } from "../../config/userstore";
import { addaddress, editUser } from "../../api/authapi";

const initialState:InitialState_types={ 
    user:getStoredUser()||null,
    users:getStoredUsers()||[],
    isSuccess:false,
    loading:false,
    isAuthenticated: !!getStoredUser(),
    error:null
}

const userslice=createSlice({
    name:'auth',
    initialState,
    reducers:{

        setusers:(state,action)=>{
            
            const newuser:User_Tyeps=action.payload
            state.users=[...state.users,newuser]
            // state.users.push(action.payload)
        },
         loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
          },
          logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user'); 
            localStorage.removeItem("token")
          },

    },
    extraReducers(builder) {
        builder
        .addCase(editUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            localStorage.setItem('user', JSON.stringify(state.user));

            
        })

        .addCase(addaddress.pending,(state)=>{
            state.loading=true

        })

        .addCase(addaddress.fulfilled,(state,action)=>{
            state.loading=false
            state.isSuccess=true
         if (state.user) {
  if (!state.user.Address) {
    state.user.Address = [action.payload];
    localStorage.setItem('user', JSON.stringify(state.user));

  } else {
    state.user.Address.push(action.payload);
    localStorage.setItem('user', JSON.stringify(state.user));

  }
}

        })
    },

    


})



export const {setusers,loginSuccess,logout}=userslice.actions

export default userslice.reducer