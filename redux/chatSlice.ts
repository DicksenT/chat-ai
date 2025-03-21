import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageStructure, chatState, chatStructure, responseStructure } from "../app/interfaces";



const initialState: chatState ={
    activeChat: '',
    chats:{},
    messages:{}
}


const chatSlice= createSlice({
    name:'chats',
    initialState,
    reducers:{
        setActiveChat: (state, action: PayloadAction<string>)=>{
            state.activeChat = action.payload
        },
        addNewChat:(state, action: PayloadAction<chatStructure>)=>{
            state.chats[action.payload.id] = action.payload
        },
        deleteChat:(state, action: PayloadAction<string>)=>{
            const chatId = action.payload
            
            const {[chatId] : _, ...newChat} = state.chats
            state.chats = newChat

            const filteredMessage = Object.entries(state.messages).filter(([_, msg]) => msg.chatId !== chatId)
            state.messages = Object.fromEntries(filteredMessage)
        },
        renameChat:(state, action: PayloadAction<{id: number, newName: string}>)=>{
            state.chats[action.payload.id].name = action.payload.newName
        },
        addMessages:(state, action: PayloadAction<messageStructure>)=>{
            state.chats[action.payload.chatId].chatListsId.push(action.payload.id)
            state.messages[action.payload.id] = action.payload
        },
        addMessagesResponse:(state, action: PayloadAction<{msgId: string, response: responseStructure}>)=>{
            state.messages[action.payload.msgId].response = action.payload.response
        }
    }
})

export const{setActiveChat, addNewChat, deleteChat, renameChat, addMessages, addMessagesResponse} = chatSlice.actions
export default chatSlice.reducer