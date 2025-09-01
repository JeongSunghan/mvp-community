import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, ListRenderItem } from "react-native";
import PostCard from "./PostCard";
import { subscribePosts, Post } from "../../services/posts"; 

type Props = {
  onPress: (id: string) => void;
};

export default function PostList({ onPress }: Props) {
  const [rows, setRows] = useState<Post[]>([]);

  useEffect(() => {
    const unsub = subscribePosts(setRows);
    return () => unsub();
  }, []);

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item.id)}>
      <PostCard
        title={item.title ?? ""}
        content={item.content ?? ""}
        imageCount={Array.isArray(item.imageUrls) ? item.imageUrls.length : 0}
        commentCount={typeof item.commentCount === "number" ? item.commentCount : 0}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={rows}
      keyExtractor={(it) => it.id}
      renderItem={renderItem}
    />
  );
}
