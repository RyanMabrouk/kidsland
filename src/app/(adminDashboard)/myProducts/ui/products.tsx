import { productsQuery } from '@/hooks/data/products/productsQuery';
import useProducts from '@/hooks/data/products/useProducts';
import { Player } from '@lottiefiles/react-lottie-player';
import { Pagination } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Product from './Product';

export default function Products({ searchQuery }: { searchQuery: string }) {
    const [page, setPage] = useState(1); // State to track the current page
    const limit = 8; // Number of items per page
    const { data: products, isLoading } = useProducts({ page, limit, search : {column :"title" , value: searchQuery} }); // Fetching products
    const queryClient = useQueryClient();
  
    useEffect(() => {
      if (products?.meta.has_next_page) {
        queryClient.prefetchQuery(
          productsQuery({
            page: page + 1,
            limit,
          })
        );
      }
    }, [page, products?.meta.has_next_page, queryClient]);
    if (isLoading) {
        return     <div className=" mt-[10rem]">
        <Player
          className="m-auto"
          autoplay
          loop
          src="/AnimationLoading.json"
          style={{ height: "20rem", width: "20rem" }}
        />
      </div>;
      }
      // Ensure products are available before rendering the table
  if (!products?.data.length) {
    return <div>No products found</div>;
  }
  return (
    <div className="flex flex-col  gap-5 w-[60rem] m-auto">
     <div className="mx-auto grid w-fit grid-cols-4 gap-x-10 gap-y-10">
        {products?.data?.map((product, key) => (
          <Product key={key} {...product} />
        ))}
      </div>
      <Pagination
        className="flex w-full justify-center"
        count={products?.meta.total_pages}
        page={page}
        boundaryCount={3}
        siblingCount={3}
        onChange={(e, value) => setPage(value)}
      />
        
    </div>
  )
}
