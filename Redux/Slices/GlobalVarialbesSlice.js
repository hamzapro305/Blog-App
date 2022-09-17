const { createSlice } = require("@reduxjs/toolkit");

const GlobalVariableSlice = createSlice({
    name: "GlobalVariables",
    initialState: {
        header: true,
        footer: true,
        modal: false,
    },
    reducers: {
        setHeader: (state, { payload }) => {
            state.header = payload
        },
        setFooter: (state, { payload }) => {
            state.footer = payload
        },
        setGlobalModal: (state, { payload }) => {
            state.modal = payload
        }
    }

})

export const { setGlobalModal, setHeader, setFooter } = GlobalVariableSlice.actions
export default GlobalVariableSlice;