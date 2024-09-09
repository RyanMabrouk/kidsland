/* import getInfiniteCart from "@/api/getInfiniteCart";
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export default function useInfiniteCart() {
  return useInfiniteQuery({
    queryKey: ["infiniteCart"],
    queryFn: ({ pageParam = 0 }) => getInfiniteCart({ PageParam: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.PageParam + 8;
    },
  });
}
 */
