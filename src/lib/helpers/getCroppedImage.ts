import { Crop } from "react-image-crop";

export default function getCroppedImage(image: HTMLImageElement, crop: Crop): Promise<Blob> {
  const canvas = document.createElement('canvas');

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width! * scaleX;
  canvas.height = crop.height! * scaleY;

  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    image,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob!);
    }, 'image/jpeg', 0.9);
  });
}