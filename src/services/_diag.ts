// //arraybuffer, blob error debugging
// import { storage } from "../lib/firebase";
// import { ref, uploadString, getDownloadURL } from "firebase/storage";

// export async function storagePing() {
//   const r = ref(storage, `__diag/ping_${Date.now()}.txt`);
//   await uploadString(r, "ping", "raw");
//   const url = await getDownloadURL(r);
//   console.log("[diag] storage ping OK:", url);
// }

// export async function tinyImageUpload() {
//   const b64 =
//     "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAoMBgJTm7okAAAAASUVORK5CYII=";
//   const r = ref(storage, `__diag/tiny_${Date.now()}.png`);
//   await uploadString(r, b64, "base64", { contentType: "image/png" });
//   const url = await getDownloadURL(r);
//   console.log("[diag] tiny image upload OK:", url);
// }
