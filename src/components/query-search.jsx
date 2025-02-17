import { useState } from "react";
import { Button } from "./ui/button";
import ComboBox from "./combo-box";
import { useAppStore } from "@/store";

export const QuerySearch = () => {
  const [showError, setShowError] = useState(false);

  const {
    queryInput,
    setQueryInput,
    queryHistory,
    addQueryToHistory,
    switchApiForNewQuery,
  } = useAppStore();

  const handleSubmit = () => {
    if (!queryInput) {
      setShowError(true);
    } else {
      setShowError(false);

      if (!queryHistory.includes(queryInput)) {
        addQueryToHistory(queryInput);
      }

      switchApiForNewQuery();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex flex-col flex-1">
          <ComboBox
            options={queryHistory}
            labelKey="name"
            valueKey="code"
            placeholder="Type or Select a query"
            onChange={setQueryInput}
            value={queryInput}
          />
          {showError && (
            <p className="text-red-500 mt-1">Please Type or Select a Query.</p>
          )}
        </div>

        <Button onClick={handleSubmit} className="">
          Submit
        </Button>
      </div>
    </div>
  );
};
