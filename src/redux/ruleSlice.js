import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  confidential: "",
  userId: localStorage.getItem('userId') || null,
  rules: [], // Array to hold individual rules
};

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setRulesText: (state, action) => {
      const { id, text } = action.payload;
      const ruleIndex = state.rules.findIndex(rule => rule.id === id);
      if (ruleIndex === -1) {
        state.rules.push({ id, text });
      } else {
        state.rules[ruleIndex].text = text;
      }
    },
    appendRulesText: (state, action) => {
      const { id, text } = action.payload;
      const ruleIndex = state.rules.findIndex(rule => rule.id === id);
      if (ruleIndex !== -1) {
        state.rules[ruleIndex].text += `\n${text}`;
      } else {
        state.rules.push({ id, text });
      }
    },
  },
});

export const { setRulesText, appendRulesText } = rulesSlice.actions;

export default rulesSlice.reducer;
