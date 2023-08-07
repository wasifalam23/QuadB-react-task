import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { Modal } from 'flowbite-react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

const ShowSummary = () => {
  const [show, setShow] = useState<any>({});
  const [openModal, setOpenModal] = useState<string | undefined>();

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');

  const { name } = useParams();
  const navigate = useNavigate();

  const plainSumText = show.summary?.replace(/<\/?p>|<\/?b>/g, '');

  useEffect(() => {
    const fetchShow = async () => {
      const loadingToast = toast.loading('Loading...');
      try {
        const result = await axios.get(
          `https://api.tvmaze.com/singlesearch/shows?q=${name}`
        );

        setShow(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        toast.dismiss(loadingToast);
      }
    };

    fetchShow();
  }, [name]);

  const backHandler = () => {
    navigate(-1);
  };

  const bookTicketHandler = () => {
    setOpenModal('default');
  };

  const resetForm = () => {
    setUserName('');
    setUserEmail('');
    setUserPhone('');
  };

  const formSubmitHandler = () => {
    if (
      userName?.length === 0 ||
      userEmail?.length === 0 ||
      userPhone?.length === 0
    ) {
      return toast.error('All fields are required!');
    }

    if (!userEmail.includes('@')) return toast.error('Enter a valid email.');
    if (userPhone.length < 10)
      return toast.error('Enter a 10-digit phone number.');

    localStorage.setItem(
      'movieBooking',
      JSON.stringify({
        name: userName,
        email: userEmail,
        phone: userPhone,
      })
    );
    resetForm();
    toast.success('Ticket Booked');
    setOpenModal(undefined);
    console.log('form submitted');
  };

  const modalCloseHandler = () => {
    setOpenModal(undefined);
    toast.dismiss();
    resetForm();
  };

  return (
    <React.Fragment>
      <Modal show={openModal === 'default'} onClose={modalCloseHandler}>
        <Modal.Header>Book Your Ticket</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-gray-600 font-medium">
                  Book ticket for{' '}
                  <span className="text-teal-700">{show.name}</span>
                </h3>
                <p className="text-sm font-medium text-gray-600 flex gap-1">
                  <ClockIcon className="w-5 h-5 text-teal-700" />
                  <span className="font-normal">
                    {show.schedule?.days[0]}, {show.schedule?.time}
                  </span>
                </p>
              </div>

              <p className="text-sm font-medium text-gray-600 flex gap-1">
                Runtime:
                <span className="font-normal">{show.runtime} mins.</span>
              </p>
            </div>

            <form className="grid grid-cols-2 gap-4">
              <input
                required
                className="text-sm"
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                required
                className="text-sm"
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <input
                required
                className="text-sm"
                type="text"
                placeholder="Phone"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={formSubmitHandler}
            className="px-3 py-1.5 bg-teal-600 text-white rounded-md"
          >
            Book
          </button>
          <button
            onClick={modalCloseHandler}
            className="px-3 py-1.5 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <div className="mt-16 mb-10">
        <button
          onClick={backHandler}
          className="flex items-center gap-2 mb-8 px-2 py-1 shadow-lg hover:shadow-md transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-[30fr_70fr] gap-x-12">
          <div>
            <img className="w-full" src={show.image?.original} alt="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-teal-600 font-medium">{show.name}</h3>

            <div className="mt-5 grid grid-cols-2 gap-y-2">
              <p className="text-gray-700 font-medium">
                Language: <span className="font-normal">{show.language}</span>
              </p>
              <p className="text-gray-700 font-medium">
                Rating:
                <span className="font-normal">{show.rating?.average}</span>
              </p>
              <p className="text-gray-700 font-medium">
                Premiered:
                <span className="font-normal"> {show.premiered}</span>
              </p>
              <p className="text-gray-700 font-medium">
                Runtime:
                <span className="font-normal"> {show.runtime} minutes</span>
              </p>
              <p className="text-gray-700 font-medium">
                Genres:
                <span className="font-normal"> {show.genres?.join(', ')}</span>
              </p>
            </div>

            <div className="mt-6 text-gray-700 font-medium">
              <p className="text-gray-700 font-medium">
                Summary:
                <span className="font-normal"> {plainSumText}</span>
              </p>
            </div>

            <button
              onClick={bookTicketHandler}
              className="self-end mt-auto bg-orange-600 px-3 py-1 text-white font-medium"
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowSummary;
