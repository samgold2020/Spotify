import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Colors } from "../../colors";
import ContentCard from "../../components/Card";
import { useTable } from "react-table";

function TopArtists() {
  const [token, setToken] = useState();
  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("Access_Token")) {
      setToken(localStorage.getItem("Access_Token"));
      if (token) {
        axios
          .get(`https://api.spotify.com/v1/me/top/artists`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setArtistData(response?.data.items);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log("THIS IS THE ERROR", e);
            //TODO: Clear local storage if there is no token
            //localStorage.clear();
          });
      }
    } else {
      console.log("This will eventually be the logout");
    }
  }, []);

  //TODO Learn more about useMemo
  //UseMemo memoizes the data and only rerenders if the data changes
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  //useTable needs to be provided an object containing the memoized columns and data
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <Container>
          <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                            background: "papayawhip",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <Row className="justify-content-md-center">
              {data?.map((item, index) => (
                <ContentCard
                  key={index}
                  title={item?.name}
                  body={item.popularity}
                  //   footerText={`Popularity: ${item.popularity}`}
                  onClick={() => console.log("Clicked")}
                />
              ))}
            </Row> */}
        </Container>
      </div>
    </>
  );
}

export default TopArtists;
