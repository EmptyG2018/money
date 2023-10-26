import storage from "store";
import { useEffect, useState } from "react";

const getSearcheStore = () => storage.get("searchHistory") || [];

const saveSearchStore = (history = []) => storage.set("searchHistory", history);

const useSearchHistory = (dep) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setSearchHistory(getSearcheStore());
  }, dep);

  return { searchHistory, setSearchHistory };
};

export default useSearchHistory;
export { getSearcheStore, saveSearchStore };
