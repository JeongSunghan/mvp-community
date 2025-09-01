import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { subscribeComments, Comment } from "../../services/comments";
import CommentItem from "./CommentItem";
export default function CommentList({ postId }: { postId: string }) {
  const [rows, setRows] = useState<Comment[]>([]);
  useEffect(() => subscribeComments(postId, setRows), [postId]);
  return (
    <FlatList
      data={rows}
      keyExtractor={(it) => it.id}
      renderItem={({ item }) => (
        <CommentItem name={item.authorName} text={item.text} />
      )}
    />
  );
}
