import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useGPTPostTagGenerator } from "./src/hooks/useGPTPostTagGenerator";
import { Container } from "./src/components/Container";
import { Title } from "./src/components/Title";
import { TextArea } from "./src/components/TextArea";
import { Button } from "./src/components/Button";
import { useEffect, useState } from "react";
import { Tag } from "./src/components/Tag";

export default function App() {
  const { tags, generate, ready } = useGPTPostTagGenerator();

  const [post, setPost] = useState("");

  return (
    <Container>
      <Title>Generate Post Tags</Title>
      <TextArea
        multiline={true}
        numberOfLines={5}
        style={{ textAlignVertical: "top" }}
        cursorColor="white"
        placeholder="Type your post here..."
        value={post}
        onChangeText={setPost}
      />
      <Button onPress={() => generate(post)}>
        <Text style={{ fontSize: 25, color: "black" }}>Generate</Text>
      </Button>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "80%",
          flexWrap: "wrap",
        }}
      >
        {ready ? (
          tags.map((tag) => {
            return (
              <>
                <Tag style={{ textAlignVertical: "center" }} key={tag}>
                  {tag}
                </Tag>
              </>
            );
          })
        ) : (
          <></>
        )}
      </View>
      <StatusBar style="auto" />
    </Container>
  );
}
