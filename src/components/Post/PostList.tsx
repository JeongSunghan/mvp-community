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
        commentCount={item.commentCount ?? 0}
        imageBase64={item.imagesBase64?.[0]} 
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
