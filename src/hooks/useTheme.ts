import { useContext } from "react";
import { AlbumContext, AlbumContextType } from "@/contexts/AlbumContext";

export function useTheme(): AlbumContextType {
  const context = useContext(AlbumContext);
  
  if (!context) {
    throw new Error("useTheme must be used within an AlbumProvider");
  }
  
  return context;
}

