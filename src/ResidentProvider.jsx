// context/ResidentContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const ResidentContext = createContext();

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export function ResidentProvider({ children }) {
  const [residentsCache, setResidentsCache] = useState(null);

  const uploadImage = async (file) => {
    const filePath = `resident_images/${file.name}`;
    const { error } = await supabase.storage
      .from("Profiles")
      .upload(filePath, file);
    if (error) throw error;
    return filePath;
  };

  const createResident = async (data) => {
    if (data.image) {
      const filePath = await uploadImage(data.image);
      data.image_url = filePath;
      delete data.image;
    }

    const { data: newResident, error } = await supabase
      .from("residents")
      .insert([data], { returning: "minimal" });

    if (error) throw error;
    return newResident;
  };

  const getResidentById = async (id) => {
    const { data, error } = await supabase
      .from("residents")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  };

  const getResidentByName = async (name) => {
    const { data, error } = await supabase
      .from("residents")
      .select("*")
      .eq("name", name)
      .single();
    if (error) throw error;
    return data;
  };

  const getAllResidents = async () => {
    // Check if cache exists
    if (residentsCache) {
      return residentsCache;
    }

    const { data, error } = await supabase.from("residents").select("*");
    if (error) throw error;

    // Update cache
    setResidentsCache(data);

    return data;
  };

  // Effect to fetch residents initially and fill cache
  useEffect(() => {
    (async () => {
      if (!residentsCache) {
        await getAllResidents();
      }
    })();
  }, []);

  const updateResident = async (id, data, password) => {
    const { data: resident, error: fetchError } = await supabase
      .from("residents")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;
    if (resident.password !== password) throw new Error("Incorrect password.");

    const { error: updateError } = await supabase
      .from("residents")
      .update(data)
      .eq("id", id);
    if (updateError) throw updateError;
  };

  return (
    <ResidentContext.Provider
      value={{
        createResident,
        getResidentById,
        getAllResidents,
        updateResident,
        getResidentByName,
      }}
    >
      {children}
    </ResidentContext.Provider>
  );
}

export function useResident() {
  const context = useContext(ResidentContext);
  if (!context)
    throw new Error("useResident must be used within ResidentProvider");
  return context;
}
