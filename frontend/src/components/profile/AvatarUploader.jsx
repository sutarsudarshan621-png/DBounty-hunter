import { useRef, useState } from "react";
import { uploadImage } from "../../api/cloudinary";

const AvatarUploader = ({
  currentAvatar,
  onUploadComplete,
}) => {
  const inputRef = useRef(null);

  const [preview, setPreview] =
    useState(currentAvatar);

  const [uploading, setUploading] =
    useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(
      URL.createObjectURL(file)
    );

    try {
      setUploading(true);

      const imageUrl =
        await uploadImage(file);

      setPreview(imageUrl);

      onUploadComplete(imageUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">

      <div
        onClick={handleClick}
        className="
        relative
        w-40
        h-40
        rounded-full
        overflow-hidden
        border-4
        border-yellow-400
        cursor-pointer
        group
        "
      >
        <img
          src={
            preview ||
            "https://placehold.co/400x400"
          }
          className="
          w-full
          h-full
          object-cover
          "
        />

        <div
          className="
          absolute
          inset-0
          bg-black/60
          opacity-0
          group-hover:opacity-100
          transition
          flex
          items-center
          justify-center
          text-white
          font-bold
          "
        >
          Change Photo
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImage}
      />

      {uploading && (
        <div className="text-sm">
          Uploading...
        </div>
      )}

    </div>
  );
};

export default AvatarUploader;