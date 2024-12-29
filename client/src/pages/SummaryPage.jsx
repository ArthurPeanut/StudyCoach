import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../util";
import { useUser } from "../context/UserContext";

const SummaryPage = () => {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [summary, setSummary] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { user } = useUser(); // Access the current user from UserContext

  const uploadDocument = async (title, content) => {
    try {
        if (!user) {
            console.error("User is not logged in");
            return;
        } else {
            console.log(user)
        }

        const response = await fetch(
            `${API_BASE_URL}/summaries/upload/${user._id}`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                documentTitle: title,
                documentContent: content,
                }),
            }
        );
        const data = await response.json();
        if (!response.ok) {
        throw new Error(data.message || "Failed to upload document");
        }
        return data;
    } catch (error) {
      console.error("Error uploading document:", error);
      return { status: "error", message: error.message };
    }
  };

  const searchSummaries = async (query) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/summaries/search/${user._id}?q=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to search summaries");
      }
      return data;
    } catch (error) {
      console.error("Error searching summaries:", error);
      return { status: "error", message: error.message };
    }
  };

  const handleUpload = async () => {
    if (!documentTitle || !documentContent) {
      alert("Title and content are required");
      return;
    }
    const response = await uploadDocument(documentTitle, documentContent);
    if (response.status === "success") {
      setSummary(response.summary);
    } else {
      alert("Failed to generate summary");
    }
  };

  const handleSearch = async () => {
    if (!query) {
      alert("Search query is required");
      return;
    }
    const response = await searchSummaries(query);
    if (response.status === "success") {
      setResults(response.results);
    } else {
      alert("No results found");
    }
  };

  return (
    <VStack spacing={8} align="stretch" p={8}>
      <Heading size="lg">Upload and Search Summaries</Heading>

      <Box borderWidth={1} borderRadius="md" p={4}>
        <Heading size="md">Upload Document</Heading>
        <Input
          placeholder="Document Title"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          mt={2}
        />
        <Textarea
          placeholder="Document Content"
          value={documentContent}
          onChange={(e) => setDocumentContent(e.target.value)}
          mt={2}
        />
        <Button onClick={handleUpload} colorScheme="blue" mt={2}>
          Generate Summary
        </Button>
        {summary && (
          <Box mt={4} p={4} borderWidth={1} borderRadius="md">
            <Heading size="sm">Generated Summary</Heading>
            <Text mt={2}>{summary}</Text>
          </Box>
        )}
      </Box>

      <Box borderWidth={1} borderRadius="md" p={4}>
        <Heading size="md">Search Summaries</Heading>
        <Input
          placeholder="Search Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          mt={2}
        />
        <Button onClick={handleSearch} colorScheme="green" mt={2}>
          Search
        </Button>
        {results.length > 0 && (
          <Box mt={4}>
            <Heading size="sm">Search Results</Heading>
            {results.map((result, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" mt={2}>
                <Heading size="sm">{result.title}</Heading>
                <Text mt={2}>{result.summary}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default SummaryPage;
