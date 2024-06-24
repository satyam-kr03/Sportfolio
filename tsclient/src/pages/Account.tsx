import { getToken, isLoggedIn, logout, getUserData } from "@/UserContext";

export default function AccountPage() {
  if (isLoggedIn()) {
    const token = getToken();
    console.log("Token:", token);
    return (
      <div>
        <h1>Account</h1>
        <p>You are logged in.</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Account</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }
}
