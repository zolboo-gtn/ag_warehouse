import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface IDebouncedValue<T> {
  initialValue: T;
  delay?: number;
}
export const useDebouncedValue = <T>({
  initialValue,
  delay,
}: IDebouncedValue<T>) => {
  const [value, setValue] = useState(initialValue);
  const [temp, setTemp] = useState(initialValue);

  const debouncedValue = useDebounce(temp, delay || 250);
  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue]);

  return {
    value,
    temp,
    setTemp,
  };
};
