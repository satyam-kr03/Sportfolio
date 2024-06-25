function getToken() {
  return localStorage.getItem("access_token");
}

// Function to check if the user is logged in
function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}

// Function to log out
function logout() {
  localStorage.removeItem("access_token");
  console.log("Logged out");
}

const fetchUserData = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.log("No token found");
    return;
  }
  try {
    const response = await fetch("http://127.0.0.1:8000/user", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    console.log(data.username);
    return data;
  } catch (err) {
    console.log("Error fetching user data");
  }
};

export { getToken, isLoggedIn, logout };
