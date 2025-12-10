/**
 * Editor Slice
 * Manages code editor state, files, and real-time collaboration
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
  currentFile: null,
  activeUsers: [],
  chatMessages: [],
  settings: {
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 2,
  },
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    updateFile: (state, action) => {
      const index = state.files.findIndex(f => f._id === action.payload._id);
      if (index !== -1) {
        state.files[index] = action.payload;
      }
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter(f => f._id !== action.payload);
    },
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
    updateFileContent: (state, action) => {
      if (state.currentFile && state.currentFile._id === action.payload.fileId) {
        state.currentFile.content = action.payload.content;
      }
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    clearChatMessages: (state) => {
      state.chatMessages = [];
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetEditor: (state) => {
      state.files = [];
      state.currentFile = null;
      state.activeUsers = [];
      state.chatMessages = [];
    },
  },
});

export const {
  setFiles,
  addFile,
  updateFile,
  deleteFile,
  setCurrentFile,
  updateFileContent,
  setActiveUsers,
  addChatMessage,
  clearChatMessages,
  updateSettings,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer;
