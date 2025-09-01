import { db, auth } from "../lib/firebase";
import {
  addDoc, collection, doc, getDoc,
  onSnapshot, orderBy, query, serverTimestamp, Unsubscribe,
} from "firebase/firestore";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export type Post = {
  id: string;
  authorId: string;
  authorName?: string | null;
  title: string;
  content?: string | null;
  imagesBase64: string[];      
  commentCount: number;
  likeCount: number;
  isDeleted: boolean;
  createdAt: any;
  createdAtClient: number;
  updatedAt: any;
};

export function subscribePosts(cb: (rows: Post[]) => void): Unsubscribe {
  const q = query(collection(db, "posts"), orderBy("createdAtClient", "desc"));
  return onSnapshot(q, snap => {
    const rows: Post[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Post,"id">) }));
    cb(rows);
  });
}

export async function getPost(id: string): Promise<Post | null> {
  const s = await getDoc(doc(db, "posts", id));
  if (!s.exists()) return null;
  return { id: s.id, ...(s.data() as Omit<Post,"id">) };
}

// Storage 없이 Firestore에 바로 Base64 저장 - CHATGPT 도움
export async function createPost(title: string, content: string, localUris: string[] = []) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  const imagesBase64: string[] = [];

  for (const uri of localUris) {
    const m = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1024 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    if (!m.base64) throw new Error("이미지 인코딩 실패");
    imagesBase64.push(`data:image/jpeg;base64,${m.base64}`);
  }

  await addDoc(collection(db, "posts"), {
    authorId: user.uid,
    authorName: user.displayName || user.email,
    title: title.trim(),
    content: (content ?? "").trim(),
    imagesBase64,
    commentCount: 0,
    likeCount: 0,
    isDeleted: false,
    createdAt: serverTimestamp(),
    createdAtClient: Date.now(),
    updatedAt: serverTimestamp(),
  });
}
