// Simulate API requests for sign-up and sign-in (replace with actual API calls)
const mockApi = {
  signUp: async (email, password) => {
    // Simulate a successful sign-up (replace with real API logic)
    return {
      username: email.split("@")[0],
      avatar: "https://example.com/avatar.png",
    };
  },
  signIn: async (email, password) => {
    // Simulate a successful sign-in (replace with real API logic)
    return {
      username: email.split("@")[0],
      avatar: "https://example.com/avatar.png",
    };
  },
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (email, password) => {
    setIsLoading(true);
    try {
      const userData = await mockApi.signUp(email, password);
      setUser(userData);
    } catch (err) {
      console.error("Sign Up Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const userData = await mockApi.signIn(email, password);
      setUser(userData);
    } catch (err) {
      console.error("Sign In Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return { user, signUp, signIn, signOut, isLoading };
};
