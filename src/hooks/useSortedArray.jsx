import { useState } from "react";

export const useSortedArray = (initial, comparatorFn) => {
  const [items, setItems] = useState(initial);

  const pushAll = (newItems) => {
    setItems((prev) => {
      prev = [...items, ...newItems];
      prev.sort(comparatorFn);
      return prev;
    });
  };

  const push = (item) => {
    setItems((prev) => {
      prev = [...items, item];
      prev.sort(comparatorFn);
      return prev;
    });
  };

  const update = (selectorFn, payload) => {
    setItems((prev) => {
      prev = prev.map((a) => (selectorFn(a) ? { ...a, ...payload } : a));
      prev.sort(comparatorFn);
      return prev;
    });
  };

  const remove = (selectorFn) => {
    setItems((prev) => {
      prev = prev.filter((a) => !selectorFn(a));
      prev.sort(comparatorFn);
      return prev;
    });
  };

  return { items, push, pushAll, update, remove };
};
