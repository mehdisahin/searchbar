import { useState } from "react";
import "./App.css";

import SearchBar2 from "./components/AutoComplete";
import ResultTable from "./components/ResultTable";
import { Box, Container, Stack } from "@mui/material";

function App() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCLick = (e) => {
    const clickedItem = e.target.textContent;

    setSearchQuery(() => clickedItem);
  };

  return (
    <Container>
      <Stack
        sx={{
          pt: 20,
        }}
      >
        <Stack direction="column" mb={10} spacing={4}>
          <Stack alignItems="center" justifyContent="center">
            <SearchBar2 onClick={handleCLick} />
          </Stack>
          <Stack>
            <ResultTable searchQuery={searchQuery} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
