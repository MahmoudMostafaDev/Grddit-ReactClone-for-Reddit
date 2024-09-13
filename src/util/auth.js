export function saveToken(token, username) {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
}

export function getTokenExpiration() {
  const exp = new Date(localStorage.getItem("expiration"));
  const now = new Date();
  const remaning = exp.getTime() - now.getTime();
  return remaning;
}
export function getToken() {
  return localStorage.getItem("token");
}
export function getUsername() {
  return localStorage.getItem("username");
}

export function loadToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  if (getTokenExpiration() <= 0) {
    return "EXPIRED";
  }
  return token;
}

export function logoutAction() {
  localStorage.setItem("token", null);
  localStorage.setItem("expiration", null);
  localStorage.setItem("username", null);
  window.location.reload();
  return null;
}
