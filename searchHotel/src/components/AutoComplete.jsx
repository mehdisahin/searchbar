import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";

export default function SearchBar2({ onClick }) {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    const locationInput = e.target.value;
    setInput(() => locationInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.zarentravel.net/api/v1/zaren-travel/hotel/location";

      try {
        const result = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            culture: "tr-Tr",
            query: input,
            locationType: 2,
          }),
          headers: { "content-type": "application/json" },
        });

        const parsedResult = await result.json();
        setResults(parsedResult.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [input]);

  return (
    <Autocomplete
      disablePortal
      id="location-search-bar"
      options={results}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Location" onChange={handleChange} value={input} />
      )}
      slotProps={{
        popper: {
          onClick: onClick,
        },
      }}
    />
  );
}
