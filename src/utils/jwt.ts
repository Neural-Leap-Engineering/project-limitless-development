import jwtDecode from "jwt-decode";

export const decodedToken = (token: string | undefined) => {
  if (!token) {
    console.error("Token is undefined or null");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
