import React, { createContext, useState } from "react";
import api from "../services/api.js";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [stats, setStats] = useState({
    total: 0,
    avgBudget: 0,
    smoking: [],
    gender: [],
  });

  const [loading, setLoading] = useState(false);


  const getPreferencesStats = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/preferences/stats"); // ✅ الصحيح

      setStats(res.data.data);
    } catch (err) {
      console.log("Preferences Stats Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        stats,
        loading,
        getPreferencesStats,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};