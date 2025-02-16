import { create } from "zustand";

const QUERY_STORAGE_KEY = "QUERY_STORAGE_KEY";

const DUMMY_HISTORY = [
  "SELECT ProductName, Price FROM Products ORDER BY Price DESC;",
  "SELECT OrderID, CustomerName FROM Orders;",
  "SELECT Category, COUNT(*) FROM Products GROUP BY Category;",
];

export const useAppStore = create((set) => ({
  queryHistory:
    JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY)) || DUMMY_HISTORY,

  addQueryToHistory: (queryToAdd) =>
    set((state) => {
      let resultToWrite = [...state.queryHistory, queryToAdd];

      localStorage.setItem(QUERY_STORAGE_KEY, JSON.stringify(resultToWrite));

      return {
        queryHistory: resultToWrite,
      };
    }),

  replaceQueryHistory: (newHistory) =>
    set((state) => {
      localStorage.setItem(QUERY_STORAGE_KEY, JSON.stringify(newHistory));

      return { ...state, queryHistory: newHistory };
    }),

  queryInput: "",

  setQueryInput: (newQueryInput) =>
    set((state) => {
      return { ...state, queryInput: newQueryInput };
    }),

  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

window.stor = useAppStore;
