import { createSlice } from '@reduxjs/toolkit'

export const NPISlice = createSlice({
  name: 'npi-slice',
  initialState: {
    value: []
  },
  reducers: {
    add: (state, action) => {
      const npiRecord = action.payload;
      let maxCount = 0;
      state.value.forEach(record => {
        if (record.counter > maxCount) {
          maxCount = record.counter;
        }
      });
      const foundRecord = state.value.find(record => record.number === npiRecord.number);
      if (foundRecord) {
        foundRecord.counter = maxCount + 1;
        foundRecord.result = npiRecord.result;
      }
      else {
        state.value.unshift({...npiRecord, counter: maxCount + 1 });
      }
    },
    sort: (state) => {
      state.value.sort((v1, v2) => v1.counter < v2.counter ? 1 : -1);
    },
    clear: (state) => {
      state.value = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, sort, clear } = NPISlice.actions

export default NPISlice.reducer