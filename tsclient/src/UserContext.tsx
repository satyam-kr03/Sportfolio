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

export { getToken, isLoggedIn, logout };
