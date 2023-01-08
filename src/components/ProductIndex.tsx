/* eslint-disable consistent-return */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useEffect } from 'react';

import Image from 'next/image';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const ProductIndex = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery('products', () =>
    fetch('https://api.imgflip.com/get_memes').then((res) => res.json())
  );
  const products = data?.data?.memes;
  const filterProducts = products?.slice(0, 8);

  if (products) {
    return (
      <div className="mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterProducts?.map((product) => (
            <div key={product.id} className="">
              <div className="relative w-full">
                <img
                  src={product.url}
                  alt={product.name}
                  className="w-full h-full max-h-[10rem] m-auto object-cover border-2 border-slate-800"
                  layout="responsive"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
};

export default ProductIndex;
