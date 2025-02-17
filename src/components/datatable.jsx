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
          <thead className="sticky top-0">
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
            {products.map((product, idx) => (
              <tr
                className={cn("flex border-y hover:bg-gray-100", {
                  "bg-gray-50": idx % 2 != 0,
                })}
                key={product.id}
              >
                {tableHeaders.map((header, idx) => (
                  <td
                    className={cn(
                      "border-r border-gray-400 p-2 h-12 text-sm overflow-hidden",
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

      <div className="flex flex-col md:flex-row flex-wrap gap-2 items-center justify-center md:justify-between space-x-2 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="mr-2">Page:</div>
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

          <div className="whitespace-nowrap"> of {maxPages}</div>

          <Button
            size="sm"
            className="ml-2"
            onClick={() => {
              goToPage(jumpInput);
            }}
          >
            Jump
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          Total {total} Records
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>

          <Button
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
