import { UUID } from "crypto";

function getItem(key: string) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
}
function setItem(key: string, value: string) {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, value);
  }
}

export function getLSToken() {
  return getItem("token");
}
export function saveLSToken(token: string) {
  setItem("token", token);
}

export function removeLSToken() {
  localStorage.removeItem("token");
}

export function getLSSubRole() {
  return getItem("subRole");
}
export function saveLSSubRole(subRole: string) {
  setItem("subRole", subRole);
}

export function removeLSSubRole() {
  localStorage.removeItem("subRole");
}

export function getLSBranchId() {
  return getItem("BranchId") as UUID;
}
export function saveLSBranchId(BranchId: UUID) {
  setItem("BranchId", BranchId);
}

export function removeLSBranchId() {
  localStorage.removeItem("BranchId");
}

export function getLSNewMessage() {
  return getItem("newMessage") === "true";
}
export function saveLSNewMessage(newMessage: boolean) {
  setItem("newMessage", newMessage.toString());
}

export function removeLSNewMessage() {
  localStorage.removeItem("newMessage");
}
