import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
export const RefreshPosts = createContext();

// Crear el proveedor del contexto
export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [refreshUser, setRefreshUser] = useState(false);

    // Agregamos la función para notificar el cambio
    const notifyRefreshChange = () => {
      setRefresh(prevRefresh => !prevRefresh);
    };

    const notifyRefreshUserChange = () => {
      setRefreshUser(prevRefreshUser => !prevRefreshUser);
    };

    useEffect(() => {
      // Limpiamos el estado de refresh después de un breve retraso
      const timeoutId = setTimeout(() => {
        setRefresh(false);
        setRefreshUser(false);
      }, 1000); // Ajusta el tiempo según sea necesario
  
      // Limpiamos el timeout cuando el componente se desmonta
      return () => clearTimeout(timeoutId);
    }, [refresh, refreshUser]);

  return (
    <RefreshPosts.Provider value={{ refresh, setRefresh, notifyRefreshChange, refreshUser, notifyRefreshUserChange }}>
      {children}
    </RefreshPosts.Provider>
  );
};

// Crear un hook personalizado para utilizar el contexto
export const useRefresh = () => {
  const context = useContext(RefreshPosts);

  if (!context) {
    throw new Error('useRefresh debe ser utilizado dentro de un RefreshProvider');
  }

  return context;
};
