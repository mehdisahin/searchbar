import { useState } from "react";
import "./App.css";

import SearchBar2 from "./components/AutoComplete";
import ResultTable from "./components/ResultTable";
import { Box, Container, Stack, Icon } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCLick = (e) => {
    const clickedItem = e.target.textContent;

    setSearchQuery(() => clickedItem);
  };

  return (
    <Container maxWidth="100%" padding-top="40px">
      <Stack
        sx={{
          pt: 15,
        }}
      >
        <Stack direction="column" mb={10} spacing={4}>
          <Stack
            alignItems="space-between"
            justifyContent="center"
            border={1}
            borderRadius={5}
            borderColor={"#BBBBBB"}
          >
            {/* <Navbar /> */}

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
