'use client';

import 'react-image-crop/dist/ReactCrop.css';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SlPicture } from "react-icons/sl";
import Modal from "./Modal";
import { MdClose } from "react-icons/md";
import ReactCrop, { Crop } from 'react-image-crop';
import getCroppedImage from '@/lib/helpers/getCroppedImage';

export default function UploadFileForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [editPreviewImage, setEditPreviewImage] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>({
    x: 25,
    y: 25,
    unit: '%',
    width: 50,
    height: 50
  });

  function handleClick(e: FormEvent) {
    e.preventDefault();
    if (!inputRef.current) return;

    inputRef.current.click();
  }

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setEditPreviewImage(objectUrl);
    setOpenModal(true);
  }

  async function handleCrop() {
    if (!imgRef.current || !crop) return;

    const blob = await getCroppedImage(imgRef.current, crop);

    const file = new File([blob], 'banner.jpg', {
      type: 'image/jpeg',
      lastModified: Date.now()
    });

    if (inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);

      if (dt) {
        inputRef.current.files = dt.files;
      }
    }

    const blobUrl = URL.createObjectURL(blob);
    setPreviewImage(blobUrl);
    setOpenModal(false);
  }

  useEffect(() => {
    if (!openModal) setEditPreviewImage('');
  }, [openModal]);

  return (
    <form className="w-full rounded-md bg-black/30 items-center border border-dark-purple p-4 flex flex-col gap-y-6 md:gap-y-8">
      <p className="text-xl md:text-3xl font-semibold">Identity Card (KTM / KTP)</p>
      {previewImage.length > 0 ?
        <img src={previewImage} alt="ktm/ktp" /> :
        <SlPicture size={128} />
      }
      <button
        className="py-2 px-4 rounded-md cursor-pointer bg-white/10 hover:bg-white/20 w-fit duration-300"
        onClick={(e) => handleClick(e)}
      >Upload Image</button>
      <input
        ref={inputRef}
        type="file"
        name="image"
        id="image"
        hidden
        accept="image/*"
        onChange={(e) => handleChangeImage(e)}
      />
      {openModal && editPreviewImage.length > 0 && (
        <Modal>
          <div
            className="flex flex-col gap-y-4 p-4 rounded-md bg-white text-black items-center"
            style={{
              maxWidth: '70vw'
            }}
          >
            <div className="flex justify-between items-center w-full">
              <p className="text-xl md:text-2xl font-semibold">Edit Preview Image</p>
              <MdClose onClick={() => setOpenModal(false)} className="size-8 cursor-pointer" />
            </div>
            <ReactCrop crop={crop} aspect={16 / 9} onChange={(c) => setCrop(c)}>
              <img ref={imgRef} src={editPreviewImage} alt="preview" className="w-full aspect-video object-cover object-center" />
            </ReactCrop>
            <button
              className="py-2 px-4 rounded-md cursor-pointer w-fit duration-300 bg-dark-purple text-white"
              onClick={() => handleCrop()}
            >Save Image</button>
          </div>
        </Modal>
      )}
    </form>
  )
}