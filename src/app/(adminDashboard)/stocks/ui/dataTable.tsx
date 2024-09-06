"use client";
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import useProducts from "@/hooks/data/products/useProducts";
import productsIncome from "@/api/products/prodcutsIncome";

const DataTable = ({
  data,
}: {
  data: Array<{ product: string; stock: number; wholesale_price: number; price: number; income: number }>;
}) => {
  const [totalIncome, setTotalIncome] = useState<number | null>(null); // State for storing total income
  const [sortField, setSortField] = useState<keyof typeof data[0]>("product");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch total income using the server-side function
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const income = await productsIncome();
        setTotalIncome(income);
      } catch (error) {
        console.error("Failed to fetch total income:", error);
      }
    };

    fetchIncome();
  }, []);

  // Filtered data based on search query

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: keyof typeof data[0]) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      {/* Table */}
      <Table className="min-w-full table-auto">
        <TableHead className="px-0 bg-gray-100 text-base font-semibold">
          <TableRow className="grid grid-cols-5">
            <TableCell onClick={() => toggleSort("product")}>Product</TableCell>
            <TableCell onClick={() => toggleSort("stock")}>Stock</TableCell>
            <TableCell onClick={() => toggleSort("wholesale_price")}>Wholesale Price(dt)</TableCell>
            <TableCell onClick={() => toggleSort("price")}>Price(dt)</TableCell>
            <TableCell onClick={() => toggleSort("income")}>Income(dt)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Total Income Row */}
          <TableRow className="grid grid-cols-5 font-bold text-base">
            <TableCell>All Products</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell className="">{totalIncome !== null ? totalIncome : "Loading..."}</TableCell>
          </TableRow>

          {/* Filtered and Sorted Data */}
          {sortedData.map((row) => (
            <TableRow key={row.product} className="grid grid-cols-5">
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.wholesale_price}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.income}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
