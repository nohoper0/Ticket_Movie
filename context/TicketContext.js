import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TicketContext = createContext();

const TICKET_KEY = "ticket_movie_tickets";

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  // LOAD
  const loadTickets = async () => {
    try {
      const data = await AsyncStorage.getItem(TICKET_KEY);

      if (data) {
        setTickets(JSON.parse(data));
      }
    } catch (e) {
      console.warn("loadTickets error:", e);
    }

    setLoading(false);
  };

  // SAVE
  const saveTickets = async (newTickets) => {
    try {
      await AsyncStorage.setItem(
        TICKET_KEY,
        JSON.stringify(newTickets)
      );
    } catch (e) {
      console.warn("saveTickets error:", e);
    }
  };

  // ADD
  const addTicket = async (ticket) => {
    const updated = [...tickets, ticket];

    setTickets(updated);

    await saveTickets(updated);
  };

  // CLEAR
  const clearTickets = async () => {
    setTickets([]);

    await AsyncStorage.removeItem(TICKET_KEY);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        clearTickets,
        loading,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);