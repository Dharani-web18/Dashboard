import { createSlice } from '@reduxjs/toolkit';

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState: {
    categories: {
      "CSPM Executive Dashboard": { widgets: [] },
      "CWPP Dashboard": { widgets: [] },
      "Registry Scan": { widgets: [] }
    },
    allWidgets: []
  },
  reducers: {
    addWidget(state, action) {
      const { category, widget } = action.payload;
      state.categories[category].widgets.push(widget);
      state.allWidgets.push(widget);
    },
    removeWidget(state, action) {
      const { category, widgetId } = action.payload;
      state.categories[category].widgets = state.categories[category].widgets.filter(widget => widget.id !== widgetId);
      state.allWidgets = state.allWidgets.filter(widget => widget.id !== widgetId);
    }
  }
});

export const { addWidget, removeWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
