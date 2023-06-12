import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";

export default function ResultTable({ searchQuery }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.zarentravel.net/api/v1/zaren-travel/hotel/search";

      try {
        const result = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            page: 1,
            pageSize: 10,
            query: searchQuery,
            arrivalLocationId: "23472",
            nationality: "TR",
            currency: "USD",
            culture: "tr-TR",
            night: 1,
            checkAllotment: true,
            checkStopSale: true,
            getOnlyDiscountedPrice: false,
            getOnlyBestOffers: true,
            checkIn: "2023-06-15T13:41:19.884Z",
            checkOut: "2023-06-16T13:41:19.884Z",
            sortBy: 1,
            occupants: [
              {
                adults: 1,
                children: [],
                infants: 0,
              },
            ],
          }),
          headers: { "content-type": "application/json" },
        });

        const jsonedResult = await result.json();

        // parse results here
        const otels = jsonedResult.data.items;

        const parsedResult = otels.map((otel) => ({
          name: otel.name,
          price: otel.minPrice || otel.maxPrice,
        }));

        setRows(() => parsedResult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hotel Name</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell> No results found</TableCell>
            </TableRow>
          ) : null}
          {rows.length > 0
            ? rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
