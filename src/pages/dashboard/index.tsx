/* eslint-disable unused-imports/no-unused-vars */
import type { NextPage } from 'next';

import { Meta } from '../../layout/Meta';
import { MainDashboard } from '../../templates/mainDashboard';
import { AppConfig } from '../../utils/AppConfig';

const Index: NextPage = () => {
  const linkImage =
    'https://i.ibb.co/RT9qt2K/p-headline-nidji-ajak-makan-es-krim-di-walls-ice-c-6e3667.jpg';

  return (
    <MainDashboard>
      <Meta
        title={`${AppConfig.title} | Dashboard Overview`}
        description={AppConfig.description}
      />
      <div
        style={{
          backgroundImage: `url(${linkImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          width: '98vw',
        }}
        class="w-full mx-auto mt-2 transition-all duration-300 blur-[1px] hover:blur-none rounded-md border-2 border-slate-800"
      >
        <div class="flex flex-col justify-center items-start h-full px-10 text-white">
          <h1
            class="text-4xl font-bold text-white"
            style={{ textShadow: '2px 2px 4px #000000' }}
          >
            SEMUA JADI HAPPY BERSAMA WALLS
          </h1>
          <div class="flex flex-col md:flex-row">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span
                style={{ textShadow: '2px 2px 4px #000000' }}
                class="button-text"
              >
                Selengkapnya
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        id="section-1"
        class="bg-[#ED1A23] m-3 rounded-lg border-2 border-slate-800"
      >
        <div class="py-8"></div>
      </div>
    </MainDashboard>
  );
};

export default Index;
