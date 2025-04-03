import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
  token: string | null;
  favorites: number[];
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
};

interface UserType {
  email: string;
  id: number;
  lastname: string;
  firstname: string;
  description: string;
  age: string;
  is_admin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  token: null,
  favorites: [],
  fetchFavorites: async () => {},
  toggleFavorite: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded: { userId: string } = jwtDecode(token);
        getUser(decoded.userId);
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
      }
    }
  }, [token]);

  const getUser = async (userId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);

        localStorage.setItem("currentUser", JSON.stringify(userData.id));
        fetchFavorites();
      } else {
        console.error("Échec de la récupération de l'utilisateur");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavorites = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorite/${user.id}`,
      );
      const data = await res.json();
      const favoriteIds = data.map(
        (fav: { product_id: number }) => fav.product_id,
      );
      setFavorites(favoriteIds);
    } catch (err) {
      console.error("Erreur du chargement des favoris :", err);
    }
  }, [user?.id]);

  const toggleFavorite = useCallback(
    async (id: number) => {
      if (!user?.id) return;

      const isFav = favorites.includes(id);
      const method = isFav ? "DELETE" : "POST";

      if (method === "POST" && isFav) return;

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorite?productId=${id}&userId=${user.id}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body:
            method === "POST" ? JSON.stringify({ product_id: id }) : undefined,
        },
      );

      setFavorites((prev) =>
        isFav ? prev.filter((fav) => fav !== id) : [...prev, id],
      );

      await fetchFavorites();
    },
    [user?.id, favorites, fetchFavorites],
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        favorites,
        fetchFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
