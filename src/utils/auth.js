const API_URL = "http://localhost:3001";

export const validateToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to validate token");
    }
    return await response.json();
  } catch (error) {
    console.error("Token Validation Error:", error);
    throw error;
  }
};

export const signUp = async (name, avatar, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return await response.json();
  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`$API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }
    return await response.json();
  } catch (error) {
    console.error("Sign In Error:", error);
    throw error;
  }
};
