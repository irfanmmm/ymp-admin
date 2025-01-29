import { createContext, useEffect, useState } from "react";
export const ProductContext = createContext(null);
const ContextApi = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default ContextApi;
