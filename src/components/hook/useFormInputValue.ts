import { useState, ChangeEvent } from 'react';

interface FormState {
  email: string;
  password: string;
}

export const useFormInputValue = <T extends FormState>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    state,
    setState,
    handleChange,
  };
};
