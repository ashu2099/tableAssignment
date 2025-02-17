import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

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
    tableHeaders,
  } = useAppStore();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setJumpInput(currentPage);
  }, [currentPage]);

  const [jumpInput, setJumpInput] = useState();

  const maxPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="animate-spin rounded-full border-t-2 border-blue-500 w-32 h-32 border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="relative flex flex-col flex-1 border border-gray-400 rounded-sm overflow-auto">
        <table className="absolute">
          <thead>
            <tr className="flex">
              {tableHeaders.map((header, idx) => (
                <th
                  className={cn(
                    "border-b border-r bg-gray-200 p-1 border-gray-400 ",
                    "flex items-center justify-center",
                    {
                      "min-w-16": idx === 0,
                      "min-w-32 w-32": idx > 0,
                    }
                  )}
                  key={idx}
                >
                  {header?.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="">
            {products.map((product) => (
              <tr className="flex border-y" key={product.id}>
                {tableHeaders.map((header, idx) => (
                  <td
                    className={cn(
                      "border-r border-gray-400 p-1 h-16  overflow-hidden",
                      {
                        "min-w-16": idx === 0,
                        "min-w-32 w-32": idx > 0,
                      }
                    )}
                    key={header?.value}
                  >
                    {product[header?.value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center mx-2 text-sm text-muted-foreground">
          <div className="whitespace-nowrap mr-2">Page:</div>
          <Input
            className="w-24"
            type="number"
            min="1"
            max={maxPages}
            value={jumpInput}
            onChange={(e) => {
              setJumpInput(e.target.value);
            }}
          />

          <div className="whitespace-nowrap mx-2"> of {maxPages}</div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              goToPage(jumpInput);
            }}
          >
            Jump
          </Button>

          <div className="mx-2">| Total {total} Records</div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === maxPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
