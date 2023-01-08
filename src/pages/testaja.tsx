/* eslint-disable unused-imports/no-unused-vars */
import type { NextPage } from 'next';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/main';
import { AppConfig } from '../utils/AppConfig';

const Index: NextPage = () => {
  const linkImage =
    'https://i.ibb.co/RT9qt2K/p-headline-nidji-ajak-makan-es-krim-di-walls-ice-c-6e3667.jpg';

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} - Home`}
        description={AppConfig.description}
      />
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-800">
        {/* icon love */}
        <div className="flex flex-row justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            // on mouse enter
            onMouseEnter={() => {
              document.querySelector('svg').classList.remove('text-gray-500');
              document.querySelector('svg').classList.add('text-red-500');
              document.querySelector('#title').classList.remove('hidden');
              document.querySelector('#title').classList.add('block');
            }}
            onMouseLeave={() => {
              document.querySelector('svg').classList.remove('text-red-500');
              document.querySelector('svg').classList.add('text-gray-500');
              document.querySelector('#title').classList.remove('block');
              document.querySelector('#title').classList.add('hidden');
            }}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
              clipRule="evenodd"
            />
          </svg>
          <h1 id="title" className="text-4xl text-gray-500 font-bold">
            Hello World
          </h1>
        </div>
      </div>
    </Main>
  );
};

export default Index;
