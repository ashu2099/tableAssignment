import { useAppStore } from "@/store";
import { useEffect } from "react";

const ProductList = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    nextPage,
    prevPage,
    goToPage,
    currentPage,
    total,
    limit,
  } = useAppStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const maxPages = Math.ceil(total / limit);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <h1>Product List</h1>

      <div className="relative flex flex-col flex-1 overflow-y-scroll">
        <div className="absolute w-full">
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {maxPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === maxPages}>
          Next
        </button>
        <div>
          Go to page:
          <input
            type="number"
            min="1"
            max={maxPages}
            value={currentPage}
            onChange={(e) => {
              const page = Number(e.target.value);
              goToPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
