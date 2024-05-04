import { Box, Button, Container, Textarea, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { create } from "lib/openai";

const Index = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSummarize = async () => {
    if (text.trim() === "") {
      setSummary("Please enter some text to summarize.");
      return;
    }

    const response = await create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
      instructions: "Provide a summary",
      temperature: 0.7,
      max_tokens: 150,
    });

    if (response.choices && response.choices.length > 0) {
      setSummary(response.choices[0].message.content);
    } else {
      setSummary("Failed to generate summary. Please try again.");
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Text Summarizer
        </Text>
        <Textarea placeholder="Enter your text here..." value={text} onChange={handleTextChange} size="lg" height="200px" />
        <Button colorScheme="blue" onClick={handleSummarize}>
          Summarize
        </Button>
        <Textarea placeholder="Summary will appear here..." value={summary} isReadOnly size="lg" height="200px" />
      </VStack>
    </Container>
  );
};

export default Index;
