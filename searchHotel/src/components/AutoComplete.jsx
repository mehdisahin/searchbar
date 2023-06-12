import * as React from "react";
import CountrySelect from "./CountrySelect";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Container, Stack, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import PublicIcon from "@mui/icons-material/Public";

export default function SearchBar2({ onClick }) {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [value, setValue] = React.useState("One accommodations");

  const handleAccommodations = (event) => {
    setValue(event.target.value);
  };
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
    <Stack>
      <Container maxWidth="100">
        <Box
          absolute={true}
          pb={5}
          pt={5}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>
            <HotelIcon /> Hotel
          </Typography>

          <Typography>
            <FlightIcon /> Flight
          </Typography>

          <Typography>
            <PublicIcon /> Tour
          </Typography>
          <Typography>
            <DirectionsCarIcon /> Cabs
          </Typography>
        </Box>
        <Stack direction={"row"} spacing={60}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleAccommodations}
            >
              <FormControlLabel
                value="One accommodations"
                control={<Radio />}
                label="One accommodations"
              />
              <FormControlLabel
                value="Multi accommodations"
                control={<Radio />}
                label="Multi accommodations"
              />
            </RadioGroup>
          </FormControl>
          <CountrySelect />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Autocomplete
            disablePortal
            id="location-search-bar"
            options={results}
            getOptionLabel={(option) => option.title}
            sx={{ width: 800 }}
            renderInput={(params) => (
              <TextField {...params} label="Location" onChange={handleChange} value={input} />
            )}
            slotProps={{
              popper: {
                onClick: onClick,
              },
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button variant="contained">Search</Button>
      </Container>
    </Stack>
  );
}
