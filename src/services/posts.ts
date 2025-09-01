import { db, storage, auth } from "../lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import * as FileSystem from "expo-file-system";

export type Post = {
  id: string;
  authorId: string;
  authorName?: string | null;
  title: string;
  content?: string | null;
  imageUrls: string[];
  commentCount: number;
  likeCount: number;
  isDeleted: boolean;
  createdAt: any;          
  createdAtClient: number; 
  updatedAt: any;          
};

export function subscribePosts(cb: (rows: Post[]) => void): Unsubscribe {
  const q = query(collection(db, "posts"), orderBy("createdAtClient", "desc"));
  return onSnapshot(q, (snap) => {
    const rows: Post[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Post, "id">),
    }));
    cb(rows);
  });
}

export async function getPost(id: string): Promise<Post | null> {
  const s = await getDoc(doc(db, "posts", id));
  if (!s.exists()) return null;
  return { id: s.id, ...(s.data() as Omit<Post, "id">) };
}

/** 글 생성 (이미지: Base64 업로드 → URL 저장) - chatGpt 사용(ArrayBuffer 해결중..) */
export async function createPost(
  title: string,
  content: string,
  localUris: string[] = []
): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  const imageUrls: string[] = [];

  for (const uri of localUris) {
    // 파일 존재 확인 후 Base64 읽기
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) throw new Error(`파일 없음: ${uri}`);

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Storage 업로드 (Blob/ArrayBuffer 사용 안 함)
    const key = `postImages/${user.uid}/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.jpg`;
    const storageRef = ref(storage, key);

    await uploadString(storageRef, base64, "base64", {
      contentType: "image/jpeg",
    });

    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }

  const docRef = await addDoc(collection(db, "posts"), {
    authorId: user.uid,
    authorName: user.displayName || user.email,
    title: title.trim(),
    content: (content ?? "").trim(),
    imageUrls,
    commentCount: 0,
    likeCount: 0,
    isDeleted: false,
    createdAt: serverTimestamp(),
    createdAtClient: Date.now(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}
