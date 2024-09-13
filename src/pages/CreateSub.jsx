import { useRef, useState } from "react";
import Input from "../components/AuthrizationCompoents/Input";
import { Controller, useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { createSub } from "../util/http";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/MainSubs/create-sub/buttons";

export default function CreateSub() {
  const {
    isFetching,
    error: ferror,
    res,
    setSend,
    setBody,
  } = usePost(createSub);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const bannerPicker = useRef();
  const imgPicker = useRef();
  const [banner, setBanner] = useState();
  const [image, setImage] = useState();
  const [error, setError] = useState({
    banner: false,
    image: false,
    error: false,
  });
  function handleBanner() {
    bannerPicker.current.click();
  }
  function handleImage() {
    imgPicker.current.click();
  }
  function uploadBanner() {
    setBanner(bannerPicker.current.files[0]);
  }
  function uploadImage() {
    setImage(imgPicker.current.files[0]);
  }

  function onSubmit(data) {
    if (banner === undefined) {
      setError((prev) => ({ ...prev, banner: true }));
      return;
    } else {
      setError((prev) => ({ ...prev, banner: false }));
    }
    if (image === undefined) {
      setError((prev) => ({ ...prev, image: true }));
      return;
    } else {
      setError((prev) => ({ ...prev, image: false }));
    }

    if (data.subid && data.Subname && data.description) {
      const formData = new FormData();
      formData.append("subId", data.subid.replace(/\s/g, ""));
      formData.append("mainTitle", data.Subname);
      formData.append("description", data.description);
      formData.append("banner", bannerPicker.current.files[0]);
      formData.append("img", imgPicker.current.files[0]);
      setBody(formData);
      setSend(true);
    }
  }

  if (res) {
    if (res.success) {
      navigate(`/g/${res.sub.subId}`, { replace: true });
    } else {
      setError((prev) => ({ ...prev, error: true }));
    }
  }

  return (
    <div className="  mt-10 xl:w-8/12 lg:w-8/12 2xl:w-5/12  md:w-10/12 mx-auto p-5 ">
      <h2 className="text-3xl font-bold text-white">Create Sub</h2>
      <p className="text-slate-400 mt-2">Get wierd people to help you </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={"Subname"}
          type={"text"}
          name={"Subname"}
          register={register}
          registerOptions={{ required: "Subname is required" }}
        />
        <Input
          placeholder={"Sub id"}
          type={"text"}
          name={"subid"}
          register={register}
          registerOptions={{ required: "SubId is required" }}
        />
        <p className="text-red-500">{errors.Subname?.message}</p>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <>
              <p className="text-slate-400 mt-2">Sub description </p>
              <ReactTextareaAutosize
                placeholder={""}
                {...field}
                name={"content"}
                className="w-full mt-2 p-3 border border-slate-700 rounded-lg bg-slate-800 text-white text-lg focus:outline-none focus:border-slate-600"
              />
            </>
          )}
        />
        <p className="text-red-500">{errors.description?.message}</p>

        <Buttons
          handleBanner={handleBanner}
          handleImage={handleImage}
          uploadBanner={uploadBanner}
          uploadImage={uploadImage}
          banner={banner}
          image={image}
          ref={{ imgPicker: imgPicker, bannerPicker: bannerPicker }}
        />
        {isFetching && <p className="text-slate-400">Uploading</p>}
        <p className="text-red-500">
          {error.banner ? "Banner is required" : ""}
        </p>
        <p className="text-red-500">{error.image ? "Image is required" : ""}</p>
        <p className="text-red-500">
          {error.error ? "Something went wrong sorry" : ""}
        </p>
      </form>
    </div>
  );
}
