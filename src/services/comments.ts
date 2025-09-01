import { db, nowTs, auth } from "../lib/firebase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

export type Comment = {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  isDeleted: boolean;
  createdAt: any;
};

export function subscribeComments(postId: string, cb: (rows: Comment[]) => void) {
  const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "asc"));
  return onSnapshot(q, s => cb(s.docs.map(d => ({ id: d.id, ...d.data() } as Comment))));
}

export async function addComment(postId: string, text: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");
  if (!text.trim()) return;
  await addDoc(collection(db, "posts", postId, "comments"), {
    authorId: user.uid,
    authorName: user.displayName || user.email,
    text: text.trim(),
    isDeleted: false,
    createdAt: nowTs(),
  });
}
