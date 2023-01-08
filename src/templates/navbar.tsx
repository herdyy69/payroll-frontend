/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useState } from 'react';

import { FiLogOut, FiArrowRight } from 'react-icons/fi';
import { RxTextAlignJustify, RxCross2 } from 'react-icons/rx';

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedTransition, setClickedTransition] = useState(false);

  const buttonLog = user ? (
    <>
      <button
        class="flex flex-row items-center justify-center w-full h-12 px-4 py-2 mb-2 text-sm font-medium text-white bg-slate-800 rounded-md shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        onClick={(e) => {
          e.preventDefault();
          setClickedTransition(!clickedTransition);
          setTimeout(() => {
            setIsOpen(false);
          }, 700);
        }}
      >
        <span class="mr-2">BACK TO DASHBOARD</span>
        <FiArrowRight />
      </button>
      <button
        class="flex flex-row items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium text-white bg-red-800 rounded-md shadow-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={(e) => {
          e.preventDefault();
          setClickedTransition(!clickedTransition);
          setTimeout(() => {
            setIsOpen(false);
          }, 700);
        }}
      >
        <span class="mr-2">LOGOUT</span>
        <FiLogOut />
      </button>
    </>
  ) : (
    <button class="flex flex-row items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-md shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
      <span class="mr-2">LOGIN</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );

  const icons = isOpen ? (
    <RxCross2
      onClick={(e) => {
        e.preventDefault();
        setClickedTransition(!clickedTransition);
        setTimeout(() => {
          setIsOpen(false);
        }, 700);
      }}
      class="w-[2.5rem] h-[2.5rem] text-slate-800 border-2 border-slate-800 rounded-full fixed right-7 top-6"
    />
  ) : (
    <RxTextAlignJustify
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(true);
        setClickedTransition(!clickedTransition);
      }}
      class="w-[2.5rem] h-[2.5rem] text-white animate-pulse border-2 border-white rounded-full fixed right-7 top-6"
    />
  );

  const sideBar = isOpen ? (
    <div
      class={`fixed top-0 right-0 z-[999] flex flex-col items-center justify-between w-full max-w-md h-full px-4 py-5 bg-slate-100 ${
        clickedTransition
          ? `
        animate__animated animate__fadeInRight
        `
          : `
        animate__animated animate__fadeOutRight
          `
      }`}
    >
      <div class="flex flex-col items-start justify-start w-full h-full p-3 overflow-y-scroll">
        <span class="self-start text-lg font-semibold whitespace-nowrap text-slate-800 border-y-2 border-slate-800">
          PRIMA RASA ABADI
        </span>

        <img
          src="https://www.wallsicecream.com/content/dam/unilever/heart/united_kingdom/general_image/other_foods/frozen_foods/walls_c6_hero_short_history-1099451-jpg.jpg.ulenscale.1440x360.jpg"
          alt="logo"
          class="w-full h-32 mt-4 rounded-md shadow-md"
        />
        <h1 class="text-base font-bold text-slate-800 mt-4">
          SO, WHAT’S THE SCOOP? SEJARAH WALL'S
        </h1>
        <p class="text-sm text-slate-800 mt-4">
          Kembali pada tahun 1913, T Walls and Sons memiliki momen eureka untuk
          menyelamatkan pekerjaan karyawan penting mereka. Mereka tersadar bahwa
          sosis bukanlah snacks yang paling menyegarkan saat musim panas. Jadi,
          mereka memutuskan untuk bereksperimen dan mulai menyajikan scoop es
          krim yang lezat untuk membuat pelanggan mereka merasa lebih segar.
          Tapi, ide itu harus disajikan dengan es. Baru pada 1922 - setelah
          selesai Perang Dunia Pertama - es krim itu kembali muncul di menu.
          Saat itulah Wall's Ice Cream lahir dan es krim lezat kami segera
          menyenangkan hati orang-orang baik di London. Pada awalnya, mereka
          berjalan melalui jalan-jalan melalui kuda dan kereta, dan kemudian
          dengan becak 'Stop Me and Buy One' kami yang terkenal. Padahal, garasi
          yang digunakan untuk menyimpan becak ikonik masih digunakan. Dan Anda
          bahkan mungkin melihat sepeda roda tiga di kota selama musim panas,
          jika Anda tetap mata Anda dikupas. Seiring berjalannya waktu, Wall's
          Ice Cream menemukan ruang beku di hati orang-orang, rumah-rumah dan
          bioskop di seluruh kota. Es lollies Fruity Wall’s pun mulai muncul dan
          memulai serangkaian inovasi. Kami pun mulai sibuk dan memimpikan
          produk Wall's yang paling terkenal dan dicintai seperti Es Krim
          Twister, dan yang unik seperti Feast. Dan kami pun juga
          bersenang-senang! Kami bersyukur atas tahun-tahun kerja keras dan
          kecerdikan penyumbat pintar di Es Krim Wall's, sehingga kamu pun mampu
          menciptakan ikon yang dicintai di seluruh dunia. Dan ini memberikan
          kami sesuatu yang berharga setiap harinya. Jadi, Anda mungkin tidak
          akan pernah tahu kapan kita bisa menemukan resep es krim atau es lolly
          baru yang akan dicintai setiap orang. Dan itulah yang membuat kami
          bangun dari tempat tidur di setiap pagi. Yang berubah menjadi sebuah
          perjalanan tersendiri. Es krim Wall's sekarang dijual di lebih dari 50
          negara di seluruh dunia. Dan kami memiliki berbagai macam nama di
          masing-masing negara. Tapi, apapun yang ingin Anda sampaikan, Anda
          akan selalu bisa menemukan es krim Wall's. Kita patut berterima kasih
          pada logo hati legendaris kami. Selalu menjadi misi kami untuk membuat
          orang banyak bisa tersenyum. Kami sudah melakukannya hampir 100 tahun
          sekarang. Dan kami pun berharap untuk melakukannya lebih dari 100
          tahun lagi.
        </p>
        <div class="flex flex-col items-center justify-start w-full mt-4 border-y-2 border-slate-800 py-4">
          {buttonLog}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <nav
      class={`fixed top-0 z-50 flex items-center justify-between w-full px-4 py-5 bg-transparent shadow-sm `}
    >
      <div class="w-[90%] flex flex-wrap items-center justify-between mx-auto">
        <span
          class={`self-center text-lg font-semibold whitespace-nowrap text-white dark:text-gray-200  fixed left-7 top-8
          ${
            isOpen
              ? 'animate__animated animate__fadeOut'
              : 'animate__animated animate__fadeIn'
          }
        `}
        >
          PRIMA RASA ABADI
        </span>

        <div class="flex items-center md:order-2">
          <button class="flex items-center justify-center z-[1000] w-10 h-10 text-gray-500 rounded-md dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none focus:text-gray-700 dark:focus:text-gray-400">
            {icons}
          </button>
          {sideBar}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
