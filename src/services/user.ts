import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential,
  signOut, deleteUser, } from "firebase/auth";
import { auth, db, nowTs } from "../lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export async function signUp(
  email: string,
  password: string,
  displayName?: string
) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const name = displayName || email.split("@")[0];
  await updateProfile(user, { displayName: name });
  await setDoc(doc(db, "users", user.uid), {
    displayName: name,
    photoURL: user.photoURL || null,
    createdAt: nowTs(),
    lastLoginAt: nowTs(),
  });
  return user;
}

export async function login(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  try {
    await updateDoc(doc(db, "users", cred.user.uid), { lastLoginAt: nowTs() });
  } catch {}
  return cred.user;
}

export async function logout() {
  await signOut(auth);
}

export async function updateDisplayName(newName: string) {
  if (!auth.currentUser) throw new Error("로그인 필요");
  await updateProfile(auth.currentUser, { displayName: newName });
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    displayName: newName,
  });
}

export async function reauthenticate(email: string, password: string) {
  if (!auth.currentUser) throw new Error("로그인 필요");
  const cred = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(auth.currentUser, cred);
}

export async function removeAccount() {
  if (!auth.currentUser) throw new Error("로그인 필요");
  await deleteUser(auth.currentUser);
}
