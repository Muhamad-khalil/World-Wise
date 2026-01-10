import { createContext, useContext, useEffect, useReducer } from "react";
import { citiesReducer, initialState } from "../reducer/citiesReducer";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    citiesReducer,
    initialState
  );

  useEffect(
    function () {
      async function fetchCities() {
        dispatch({
          type: "loading",
        });
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          dispatch({
            type: "cities/loaded",
            payload: data,
          });
        } catch {
          dispatch({
            type: "rejected",
            payload: "there is an error Loading data...",
          });
        }
      }
      fetchCities();
    },
    [dispatch]
  );

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({
        type: "city/loaded",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there is an error created data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      if (!res.ok) throw new Error("Failed to create city");
      const data = await res.json();
      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error Deleting City...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
