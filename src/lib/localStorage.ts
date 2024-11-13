function getItem(key: string) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
}

export function getLSToken() {
  return getItem("token");
}
export function saveLSToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeLSToken() {
  localStorage.removeItem("token");
}

export function getLSRole() {
  return getItem("role");
}
export function saveLSRole(role: string) {
  localStorage.setItem("role", role);
}

export function removeLSRole() {
  localStorage.removeItem("role");
}
