/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
import { useState, useEffect } from 'react';

import type { NextPage } from 'next';
import { CgDetailsMore } from 'react-icons/cg';
import { RiEditCircleLine } from 'react-icons/ri';
import useSWR from 'swr';

import { Meta } from '../../../layout/Meta';
import axios from '../../../lib/axios';
import { MainDashboard } from '../../../templates/mainDashboard';
import { AppConfig } from '../../../utils/AppConfig';

const Index: NextPage = () => {
  const [token, setToken] = useState();
  const [modal, setModal] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalImg, setModalImg] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [id, setId] = useState();

  const [nik, setNik] = useState();
  const [namaLengkap, setNamaLengkap] = useState();
  const [tempatLahir, setTempatLahir] = useState();
  const [tglLahir, setTglLahir] = useState();
  const [jenisKelamin, setJenisKelamin] = useState('Laki-laki');
  const [alamat, setAlamat] = useState();
  const [agama, setAgama] = useState('Islam');
  const [status, setStatus] = useState();
  const [noHp, setNoHp] = useState();
  const [email, setEmail] = useState();
  const [jabatanPegawai, setJabatanPegawai] = useState();
  const [statusPegawai, setStatusPegawai] = useState();

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: karyawan, error } = useSWR(`api/karyawan`, fetcher);
  const { data: dataStatus } = useSWR(`api/status`, fetcher);
  const { data: jabatan } = useSWR(`api/jabatan`, fetcher);
  const empy = karyawan?.data;
  const jbtn = jabatan?.data;
  const sts = dataStatus?.data;

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(empy);

  const formCreate = new FormData();
  formCreate.append('nik', nik);
  formCreate.append('nama_pegawai', namaLengkap);
  formCreate.append('tempat_lahir', tempatLahir);
  formCreate.append('tanggal_lahir', tglLahir);
  formCreate.append('jenis_kelamin', jenisKelamin);
  formCreate.append('alamat', alamat);
  formCreate.append('agama', agama);
  formCreate.append('status_hubungan', status);
  formCreate.append('no_telp', noHp);
  formCreate.append('email', email);
  formCreate.append('jabatanPegawai', jabatanPegawai);
  formCreate.append('statusPegawai', statusPegawai);

  const csrf = () =>
    axios.get('/sanctum/csrf-cookie').then((res) => {
      setToken(res);
    });

  useEffect(() => {
    csrf();
  }, []);

  const createEmployee = async () => {
    const csrfToken = await csrf();
    axios
      .post('api/karyawan', formCreate, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        setModalCreate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = empy?.filter((item) => {
      return item.nama.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(filtered);
  };

  const dataForm = new FormData();
  dataForm.append('namaLengkap', namaLengkap);
  dataForm.append('tempatLahir', tempatLahir);
  dataForm.append('tglLahir', tglLahir);
  dataForm.append('jenisKelamin', jenisKelamin);
  dataForm.append('alamat', alamat);
  dataForm.append('agama', agama);
  dataForm.append('status', status);
  dataForm.append('noHp', noHp);

  const modalElement = () => {
    const data = empy?.filter((item) => item.id === id);

    const modalUpdateImage = () => {
      return (
        <div class="fixed top-5 right-5 z-[51] w-full h-full max-w-sm max-h-[20rem] bg-white rounded-lg shadow-md">
          <div class="flex flex-col items-center justify-center w-full h-full space-y-4">
            <img
              src="/images/avatars/avatar-1.jpg"
              alt=""
              class="w-28 h-28 rounded-md bg-slate-800"
            />
            <div class="flex flex-col items-center justify-center">
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
              <div class="flex flex-row items-center justify-center space-x-2 mt-5">
                <button
                  onClick={() => setModalImg(false)}
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setModalImg(false)}
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded-md active:bg-gray-200 hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const modalUpdateProfile = () => {
      return (
        <div class="fixed top-5 right-5 z-[51] w-full h-auto max-w-xl bg-white rounded-lg shadow-md py-5">
          <div class="flex flex-col items-center justify-center w-full h-full space-y-4 overflow-y-scroll">
            <div class="flex flex-col items-center justify-center">
              <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="namaLengkap"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      id="namaLengkap"
                      type="text"
                      value={namaLengkap}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={namaLengkap}
                    />
                  </div>
                  <div>
                    <label
                      for="tempatLahir"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tempat Lahir
                    </label>
                    <input
                      onChange={(e) => setTempatLahir(e.target.value)}
                      id="tempatLahir"
                      type="text"
                      value={tempatLahir}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={tempatLahir}
                    />
                  </div>
                  <div>
                    <label
                      for="tanggalLahir"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tanggal Lahir
                    </label>

                    <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        onChange={(e) => setTglLahir(e.target.value)}
                        value={tglLahir}
                        id="tanggalLahir"
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={tglLahir}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="jenisKelamin"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      onChange={(e) => setJenisKelamin(e.target.value)}
                      value={jenisKelamin}
                      id="jenisKelamin"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="alamatLengkap"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Alamat Lengkap
                    </label>
                    <input
                      onChange={(e) => setAlamat(e.target.value)}
                      value={alamat}
                      type="text"
                      id="alamatLengkap"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={alamat}
                    />
                  </div>
                  <div>
                    <label
                      for="agama"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Agama
                    </label>
                    <select
                      onChange={(e) => setAgama(e.target.value)}
                      value={agama}
                      id="agama"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="statusPerkawinan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status Perkawinan
                    </label>
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      id="statusPerkawinan"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="Belum Kawin">Belum Kawin</option>
                      <option value="Kawin">Kawin</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="noHp"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      No HP
                    </label>
                    <input
                      onChange={(e) => setNoHp(e.target.value)}
                      value={noHp}
                      type="number"
                      id="noHp"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={noHp}
                    />
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    onClick={() => setModalProfile(false)}
                    type="submit"
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Perbarui Data
                  </button>
                  <button
                    onClick={() => setModalProfile(false)}
                    type="button"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <svg
                      class="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
    return (
      <>
        {modalImg && modalUpdateImage()}
        {modalProfile && modalUpdateProfile()}
        <div class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
          <div class="relative w-full h-full max-w-2xl md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Detail Karyawan
                </h3>
                <button
                  onClick={() => {
                    setId('');
                    setModal(false);
                  }}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="p-6 space-y-6">
                <div class="flex flex-col">
                  <div class="flex flex-row items-center justify-center space-x-2">
                    <RiEditCircleLine
                      onClick={() => {
                        if (modalProfile) setModalProfile(false);
                        else setModalProfile(true);
                        setTimeout(() => {
                          setModalImg(true);
                        }, 200);
                      }}
                      class="relative top-[1.5rem] left-[5.3rem] w-5 h-5 text-slate-800 bg-gray-200 cursor-pointer  rounded-full"
                    />
                    <img
                      src="/images/avatars/avatar-1.jpg"
                      alt=""
                      class="w-20 h-20 rounded-full bg-slate-800"
                    />
                    <div class="flex flex-col">
                      <h1 class="text-xl font-semibold text-gray-900 dark:text-white uppercase">
                        {data[0].nama}
                      </h1>
                      <span class="text-base font-medium text-gray-500 dark:text-gray-400">
                        {data[0].jabatan.jabatan_pegawai}
                      </span>
                    </div>
                  </div>
                  {/* full data */}
                  <div class="w-full mt-5 overflow-hidden rounded-lg shadow-xs">
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Nama Lengkap
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].nama}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Tempat/Tgl Lahir
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].tempat_lahir}, {data[0].tanggal_lahir}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Jenis Kelamin
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].jenis_kelamin}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Alamat
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].alamat}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Agama
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].agama}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Status
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].status_hubungan}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        No. HP
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].no_telp}
                      </span>
                    </div>
                    <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                      <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Status Pegawai
                      </span>
                      <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                        {data[0].status_pegawai}
                      </span>
                    </div>
                    <div class="border-2 bg-slate-800 m-3 rounded-md"></div>
                    {data[0].nama_bank === 'CASH' ? (
                      <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                        <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                          Jenis Pembayaran
                        </span>
                        <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                          {data[0].nama_bank}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                          <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                            Nama Bank
                          </span>
                          <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                            {data[0].nama_bank}
                          </span>
                        </div>
                        <div class="flex flex-row items-center justify-between max-w-xl space-y-2 mx-auto">
                          <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                            No Rekening
                          </span>
                          <span class="text-xs font-semibold text-white p-2 uppercase bg-gray-500 rounded-[7px]">
                            {data[0].no_rekening}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {/* end full data */}
                </div>
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    if (modalImg === true) {
                      setModalImg(false);
                    }
                    setTimeout(() => {
                      setModalProfile(true);
                    }, 200);
                  }}
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Data
                </button>
                <button
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >
                  Hapus Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const modalCreateData = () => {
    return (
      <div class="absolute top-36 md:top-28 right-5 z-[1] md:z-[51] w-full md:max-w-xl max-w-xs max-h-[30rem] bg-white rounded-lg shadow-md py-5 overflow-y-scroll">
        <div class="flex flex-col items-center justify-center w-full h-full space-y-4 overflow-y-scroll">
          <div class="flex flex-col items-center justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createEmployee();
              }}
            >
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="namaLengkap"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    id="namaLengkap"
                    type="text"
                    value={namaLengkap}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={namaLengkap}
                  />
                </div>
                <div>
                  <label
                    for="nik"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NIK KTP
                  </label>
                  <input
                    onChange={(e) => setNik(e.target.value)}
                    id="nik"
                    type="text"
                    value={nik}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={nik}
                  />
                </div>
                <div>
                  <label
                    for="tempatLahir"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tempat Lahir
                  </label>
                  <input
                    onChange={(e) => setTempatLahir(e.target.value)}
                    id="tempatLahir"
                    type="text"
                    value={tempatLahir}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={tempatLahir}
                  />
                </div>
                <div>
                  <label
                    for="tanggalLahir"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Lahir
                  </label>

                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      onChange={(e) => setTglLahir(e.target.value)}
                      value={tglLahir}
                      id="tanggalLahir"
                      type="date"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={tglLahir}
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="jenisKelamin"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    value={jenisKelamin}
                    id="jenisKelamin"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label
                    for="alamatLengkap"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Alamat Lengkap
                  </label>
                  <input
                    onChange={(e) => setAlamat(e.target.value)}
                    value={alamat}
                    type="text"
                    id="alamatLengkap"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={alamat}
                  />
                </div>
                <div>
                  <label
                    for="agama"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Agama
                  </label>
                  <select
                    onChange={(e) => setAgama(e.target.value)}
                    value={agama}
                    id="agama"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Budha">Budha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div>
                  <label
                    for="statusPerkawinan"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status Perkawinan
                  </label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    id="statusPerkawinan"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Kawin">Kawin</option>
                  </select>
                </div>
                <div>
                  <label
                    for="noHp"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    No HP
                  </label>
                  <input
                    onChange={(e) => setNoHp(e.target.value)}
                    value={noHp}
                    type="number"
                    id="noHp"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={noHp}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={email}
                  />
                </div>
                <div>
                  <label
                    for="jabatan"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jabatan
                  </label>
                  <select
                    onChange={(e) => setJabatanPegawai(e.target.value)}
                    value={jabatanPegawai}
                    id="jabatan"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {jbtn &&
                      jbtn.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.jabatan_pegawai}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    for="status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status Pegawai
                  </label>
                  <select
                    onChange={(e) => setStatusPegawai(e.target.value)}
                    value={statusPegawai}
                    id="status"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {sts &&
                      sts.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.status_pegawai}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <button
                  type="submit"
                  class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Tambah Data
                </button>
                <button
                  onClick={() => setModalCreate(false)}
                  type="button"
                  class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <svg
                    class="mr-1 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainDashboard>
      <Meta
        title={`${AppConfig.title} | Dashboard Employee`}
        description={AppConfig.description}
      />
      <div
        style={{
          height: '13.5vh',
          width: '98vw',
        }}
        class="w-full mx-auto mt-2 rounded-md border-2 border-slate-800 bg-slate-100"
      ></div>

      {modal ? modalElement() : null}
      {modalCreate ? modalCreateData() : null}

      <div
        id="section-1"
        class="min-h-screen bg-white m-3 rounded-lg border-2 border-slate-800"
      >
        <div class="p-8 flex flex-col">
          <h1 class="text-2xl mb-2 font-bold text-center text-gray-800 border-2 border-slate-800 max-w-[20rem] rounded-md">
            DATA KARYAWAN
          </h1>

          {/* table */}

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
            <div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span class="sr-only">Action button</span>
                  Action
                  <svg
                    class="w-3 h-3 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdownAction"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <span
                        onClick={() => {
                          setTimeout(() => {
                            setModalCreate(true);
                          }, 200);
                        }}
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Tambah Data
                      </span>
                    </li>
                  </ul>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Hapus Semua Data
                    </a>
                  </div>
                </div>
              </div>
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  onChange={handleSearch}
                  type="text"
                  id="table-search-users"
                  class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                />
              </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Lama Kerja
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {search
                  ? filter?.map((emp) => (
                      <tr
                        key={emp.id}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            class="w-10 h-10 rounded-full bg-slate-900"
                            src="/docs/images/people/profile-picture-1.jpg"
                            alt=""
                          />
                          <div class="pl-3">
                            <div class="text-base font-semibold">
                              {emp?.nama}
                            </div>
                            <div class="font-normal text-gray-500">
                              {emp?.jabatan.jabatan_pegawai}
                            </div>
                          </div>
                        </th>
                        <td class="px-6 py-4">{emp?.lama_kerja}</td>
                        <td class="px-6 py-4">
                          {emp?.status_pegawai === 'Aktif' ? (
                            <div class="flex items-center">
                              <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{' '}
                              {emp?.status_pegawai}
                            </div>
                          ) : (
                            <div class="flex items-center">
                              <div class="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>{' '}
                              {emp?.status_pegawai}
                            </div>
                          )}
                        </td>
                        <td class="px-6 py-4">
                          <button
                            onClick={() => {
                              setId(emp?.id);
                              setTimeout(() => {
                                setModal(true);
                              }, 200);
                            }}
                            type="button"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline flex flex-row items-center cursor-pointer gap-1"
                          >
                            <CgDetailsMore class="text-lg" /> Details
                          </button>
                        </td>
                      </tr>
                    ))
                  : empy?.map((emp) => (
                      <tr
                        key={emp.id}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            class="w-10 h-10 rounded-full bg-slate-900"
                            src="/docs/images/people/profile-picture-1.jpg"
                            alt=""
                          />
                          <div class="pl-3">
                            <div class="text-base font-semibold">
                              {emp?.nama}
                            </div>
                            <div class="font-normal text-gray-500">
                              {emp?.jabatan.jabatan_pegawai}
                            </div>
                          </div>
                        </th>
                        <td class="px-6 py-4">{emp?.lama_kerja}</td>
                        <td class="px-6 py-4">
                          {emp?.status_pegawai === 'Aktif' ? (
                            <div class="flex items-center">
                              <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{' '}
                              {emp?.status_pegawai}
                            </div>
                          ) : (
                            <div class="flex items-center">
                              <div class="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>{' '}
                              {emp?.status_pegawai}
                            </div>
                          )}
                        </td>
                        <td class="px-6 py-4">
                          <button
                            onClick={() => {
                              setId(emp?.id);
                              setModal(true);
                            }}
                            type="button"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline flex flex-row items-center cursor-pointer gap-1"
                          >
                            <CgDetailsMore class="text-lg" /> Details
                          </button>
                        </td>
                      </tr>
                    ))}

                {search && filter?.length === 0 && (
                  <tr>
                    <td colSpan="4" class="text-center py-4">
                      <div class="flex flex-col items-center">
                        <p class="text-gray-500">Data tidak ditemukan</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* end table */}
        </div>
      </div>
    </MainDashboard>
  );
};

export default Index;
