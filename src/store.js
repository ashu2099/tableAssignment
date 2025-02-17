import { create } from "zustand";
import axios from "axios";
import { getKeysAsTitleCase } from "./lib/utils";

const QUERY_STORAGE_KEY = "QUERY_STORAGE_KEY";

const DUMMY_HISTORY = [
  "SELECT ProductName, Price FROM Products ORDER BY Price DESC;",
  "SELECT OrderID, CustomerName FROM Orders;",
  "SELECT Category, COUNT(*) FROM Products GROUP BY Category;",
];

export const useAppStore = create((set, get) => ({
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

  products: [],
  tableHeaders: [],
  loading: false,
  error: null,
  limit: 25, // Items per page
  skip: 0, // Items to skip (for pagination)
  total: 0, // Total number of products from API
  currentPage: 1,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    const { limit, skip } = get();

    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      set({
        products: response.data.products,
        total: response.data.total, // Important: Store the total count
        loading: false,
        tableHeaders: getKeysAsTitleCase(response?.data?.products?.[0]),
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  nextPage: () => {
    const { limit, total, currentPage, fetchProducts } = get();
    const maxPages = Math.ceil(total / limit);
    if (currentPage < maxPages) {
      set({ currentPage: currentPage + 1, skip: currentPage * limit });

      fetchProducts();
    }
  },

  prevPage: () => {
    const { limit, currentPage, fetchProducts } = get();

    if (currentPage > 1) {
      set({ currentPage: currentPage - 1, skip: (currentPage - 2) * limit });

      fetchProducts();
    }
  },

  goToPage: (page) => {
    const { limit, total, fetchProducts } = get();
    const maxPages = Math.ceil(total / limit);
    if (page >= 1 && page <= maxPages) {
      set({ currentPage: page, skip: (page - 1) * limit });

      fetchProducts();
    }
  },

  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

window.stor = useAppStore;
