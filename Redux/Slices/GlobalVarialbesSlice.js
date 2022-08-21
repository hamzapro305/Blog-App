const { createSlice } = require("@reduxjs/toolkit");

const GlobalVariableSlice = createSlice({
    name: "GlobalVariables",
    initialState: {
        header: true,
        footer: true
    },
    reducers: {
        setHeader: (state, { payload }) => {
            state.header = payload
        },
        setFooter: (state, { payload }) => {
            state.footer = payload
        }
    }

})

export const { setHeader, setFooter } = GlobalVariableSlice.actions
export default GlobalVariableSlice;