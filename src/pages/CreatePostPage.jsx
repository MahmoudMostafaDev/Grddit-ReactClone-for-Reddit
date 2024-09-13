import { useParams } from "react-router-dom";
import Input from "../components/AuthrizationCompoents/Input";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import usePost from "../hooks/usePost";
import { createPost } from "../util/http";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const { isFetching, error, setSend, setBody, res } = usePost(createPost);
  const navigate = useNavigate();
  const params = useParams();
  const [img, setImage] = useState();
  const imgPicker = useRef();
  let textArea = useRef();
  function handleImage() {
    imgPicker.current.click();
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  function handleUpload() {
    const file = imgPicker.current.files[0];
    setImage(URL.createObjectURL(file));
  }
  function onSubmit(data) {
    if (data.title && data.content) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.content);
      formData.append("image", imgPicker.current.files[0]);
      formData.append("subId", params.subName);
      setBody(formData);
      setSend(true);
    }
  }
  if (res) {
    navigate("/g/" + params.subName);
  }

  return (
    <div className="p-10 md:p-20 w-full sm:w-10/12 mx-auto">
      <h2 className="text-2xl font-bold text-white">Create Post </h2>
      <p className="text-slate-400 ">g/{params.subName}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={"Title"}
          type={"text"}
          name={"title"}
          register={register}
          registerOptions={{ required: "please put title" }}
        />
        <p className="text-red-400 text-lg px-1 mt-2 block  font-semibold">
          {errors?.title?.message}
        </p>
        <label className="text-slate-300 text-lg px-1 mt-5 block  font-semibold">
          Post Content
        </label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactTextareaAutosize
              placeholder={""}
              {...field}
              name={"content"}
              className="w-full mt-2 p-3 border border-slate-700 rounded-lg bg-slate-800 text-white text-lg focus:outline-none focus:border-slate-600"
            />
          )}
        />

        <p className="text-red-400 text-lg px-1 mt-2 block  font-semibold">
          {errors?.content?.message}
        </p>
        <div className="flex flex-col items-start  ">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
            {" "}
            <button
              type="button"
              onClick={handleImage}
              className="text-white mt-5 w-full md:w-fit text-md font-semibold bg-blue-800 py-2 px-4 rounded-full hover:bg-blue-600"
            >
              Upload Image
            </button>{" "}
            <button className="text-white mt-5 w-full md:w-fit text-md font-semibold bg-blue-800 py-2 px-4 rounded-full hover:bg-blue-600">
              Create Post
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-lg px-1 mt-2 block  font-semibold">
              {error.message}
            </p>
          )}
          {isFetching && (
            <p className="text-gray-400 text-lg px-1 mt-2 block  font-semibold">
              loading
            </p>
          )}
          {res?.message == "sub not found" && (
            <p className="text-red-400 text-lg px-1 mt-2 block  font-semibold">
              sub not found
            </p>
          )}
          {img && (
            <img
              src={img}
              alt="img"
              className="w-1/3 mx-2 my-5 border-2 border-blue-800 "
            />
          )}
          <input
            type="file"
            onChange={handleUpload}
            placeholder=""
            className="hidden"
            ref={imgPicker}
          />
        </div>
      </form>
    </div>
  );
}
