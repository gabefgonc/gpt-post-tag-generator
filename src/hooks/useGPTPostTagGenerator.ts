import { useState } from "react";
import { Alert } from "react-native";
import { OPENAI_KEY } from "../../openai-key";

export function useGPTPostTagGenerator() {
  const [tags, setTags] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const generate = (postBody: string) => {
    const prompt = `
      Generate 8 category tags for the post below. They should be related to the post content. Separate different tags with commas and replace spaces with dashes.
      
      ${postBody}
    `;
    setReady(false);
    fetch(
      "https://api.openai.com/v1/engines/text-davinci-003-playground/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.6,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.choices[0].text) {
          const commaAndSpace = data.choices[0].text.split(", ");
          if (commaAndSpace.length < 2) {
            setTags(data.choices[0].text.split(","));
          } else {
            setTags(commaAndSpace);
          }
        } else {
          return;
        }
      })
      .catch((e) => {
        Alert.alert("Error", "Couldn't generate tags");
      })
      .finally(() => setReady(true));
  };

  return { tags, generate, ready };
}
