// src/screens/CharacterList.tsx
import React from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { Character } from "../types/Character";
import { useCharactersQuery } from "../hooks/useCharactersQuery";

const columnHelper = createColumnHelper<Character>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("species", {
    header: "Species",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("origin.name", {
    header: "Origin",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location.name", {
    header: "Location",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="character"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    ),
  }),
  columnHelper.accessor("episode", {
    header: "Episodes",
    cell: (info) => info.getValue().length,
  }),
  columnHelper.accessor("url", {
    header: "URL",
    cell: (info) => (
      <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    ),
  }),
  columnHelper.accessor("created", {
    header: "Created",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

const containerStyle: React.CSSProperties = {
  width: "100%",
  margin: "0 auto",
  padding: "20px",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#f3f4f6",
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #e5e7eb",
};

const rowStyle: React.CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  transition: "background 0.2s",
};

const cellStyle: React.CSSProperties = {
  padding: "12px",
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#3b82f6",
  color: "white",
  cursor: "pointer",
  marginRight: "8px",
};

const disabledButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#9ca3af",
  cursor: "not-allowed",
};

const paginationStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  gap: "16px",
};

const CharacterList: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const page = Number(search.page ?? 1);

  const { data, isLoading, isError, refetch } = useCharactersQuery(page);

  const table = useReactTable({
    columns,
    data: data?.results || [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
    );
  if (isError)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
        Error fetching characters
      </div>
    );

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => refetch()}>
        Refresh
      </button>
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={headerStyle}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{ ...rowStyle, cursor: "pointer" }}
                onClick={() =>
                  navigate({
                    to: "/character/$id",
                    params: { id: row.original.id.toString() },
                  })
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={cellStyle}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={paginationStyle}>
        <button
          style={page <= 1 ? disabledButtonStyle : buttonStyle}
          onClick={() => navigate({ to: "/", search: { page: page - 1 } })}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          style={!data?.info?.next ? disabledButtonStyle : buttonStyle}
          onClick={() => navigate({ to: "/", search: { page: page + 1 } })}
          disabled={!data?.info?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
