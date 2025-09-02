import { db, auth } from "../lib/firebase";
import {
  addDoc, collection, doc, onSnapshot, orderBy, query,
  serverTimestamp, Unsubscribe, updateDoc, increment,
} from "firebase/firestore";

export type Comment = {
  id: string;
  authorId: string;
  authorName?: string | null;
  text: string;
  isDeleted: boolean;
  createdAt: any;
  createdAtClient: number;
};

export function subscribeComments(postId: string, cb: (rows: Comment[]) => void): Unsubscribe {
  const q = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAtClient", "asc")
  );
  return onSnapshot(q, snap => {
    cb(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Comment, "id">) })));
  });
}

export async function addComment(postId: string, text: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");
  const v = text.trim();
  if (!v) throw new Error("댓글 내용을 입력하세요.");

  const postRef = doc(db, "posts", postId);

  await addDoc(collection(postRef, "comments"), {
    authorId: user.uid,
    authorName: user.displayName || user.email,
    text: v,
    isDeleted: false,
    createdAt: serverTimestamp(),
    createdAtClient: Date.now(),
  });

  await updateDoc(postRef, {
    commentCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}

// 댓글 삭제(선택)
// export async function deleteComment(postId: string, commentId: string) {
//   const postRef = doc(db, "posts", postId);
//   const cRef = doc(db, "posts", postId, "comments", commentId);
//   await updateDoc(cRef, { isDeleted: true });

//   await updateDoc(postRef, {
//     commentCount: increment(-1),
//     updatedAt: serverTimestamp(),
//   });
// }
