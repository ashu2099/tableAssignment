import { create } from "zustand";
import axios from "axios";
import { getKeysAsTitleCase } from "./lib/utils";

const QUERY_STORAGE_KEY = "QUERY_STORAGE_KEY";

const DEFAULT_RECORDS_PER_PAGE = 30;

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
  currentApiUrlIndex: 0,
  apiUrls: ["https://dummyjson.com/products", "https://dummyjson.com/recipes"],
  loading: false,
  error: null,
  limit: DEFAULT_RECORDS_PER_PAGE, // Items per page
  skip: 0, // Items to skip (for pagination)
  total: 0, // Total number of products from API
  currentPage: 1,

  setNewRecordPerPage: (newLimit) => {
    const { fetchProducts } = get();

    set({
      limit: newLimit,
    });

    fetchProducts();
  },

  switchApiForNewQuery: () => {
    const { currentApiUrlIndex, fetchProducts } = get();

    set({
      loading: true,
      currentApiUrlIndex: currentApiUrlIndex == 1 ? 0 : 1,
      skip: 0,
      total: 0,
      currentPage: 1,
    });

    setTimeout(() => {
      fetchProducts();
    }, 1000);
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });

    const { apiUrls, currentApiUrlIndex, limit, skip } = get();

    try {
      const response = await axios.get(
        `${apiUrls[currentApiUrlIndex]}?limit=${limit}&skip=${skip}`
      );

      let records = response.data.products || response.data.recipes;

      set({
        products: records,
        total: response.data.total, // Important: Store the total count
        loading: false,
        tableHeaders: getKeysAsTitleCase(records?.[0]),
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
