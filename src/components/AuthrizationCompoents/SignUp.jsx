import Button from "./Button";
import Input from "./Input";
import usePost from "../../hooks/usePost";
import { useState, useRef } from "react";
import { signUp } from "../../util/http";
import { saveToken } from "../../util/auth";
import { redirect } from "react-router-dom";
import { popupActions } from "../../store";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import authContext from "../../store/authContext";
export default function SignUp({ setLogin }) {
  const [unMatch, setUnMatch] = useState(false);
  const imgPicker = useRef();
  const bannerPicker = useRef();
  const { res, error, isFetching, setSend, setBody, body } = usePost(signUp);
  const dispatch = useDispatch();
  const { setIsLogged } = useContext(authContext);
  const [img, setImage] = useState();
  const [banner, setBanner] = useState();
  function handleBanner(e) {
    setBanner(e.target.files[0]);
  }
  function handleImage(e) {
    setImage(e.target.files[0]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    data.append("image", img);
    data.append("banner", banner);
    if (password !== confirmPassword) {
      setUnMatch(true);
    } else {
      setUnMatch(false);
    }
    if (!unMatch && username && password && confirmPassword && img && banner) {
      setBody(data);
      setSend(true);
    }
  }

  if (res) {
    saveToken(res, body.get("username"));
    dispatch(popupActions.closeLogin());
    setIsLogged(true);
    redirect("/");
  }

  return (
    <div className="mx-auto w-10/12 p-3 sm:p-10 pt-20">
      <h1 className="text-3xl font-bold text-white">Sign Up</h1>
      <p className="text-slate-200 mt-2">
        Enter your email and password to sign up
      </p>
      <form onSubmit={handleSubmit}>
        <Input placeholder={"Username"} type={"text"} name={"username"} />
        <Input placeholder={"Password"} type={"password"} name={"password"} />
        <Input
          placeholder={"Confirm Password"}
          type={"password"}
          name={"confirmPassword"}
        />
        {unMatch && <p className="text-red-500">Passwords don't match</p>}
        <p className="text-slate-200 mt-2">
          By signing up, you agree to our terms and conditions
        </p>
        <input type="file" hidden ref={imgPicker} onChange={handleImage} />
        <input type="file" hidden ref={bannerPicker} onChange={handleBanner} />
        <div className="flex gap-4">
          <Button
            className="w-full mt-6 "
            success={img}
            onClick={() => imgPicker.current.click()}
          >
            Upload Profile Picture
          </Button>
          <Button
            className="w-full mt-6 "
            success={banner}
            onClick={() => bannerPicker.current.click()}
          >
            Upload Banner
          </Button>
        </div>

        <Button className="w-full mt-6 ">Sign Up</Button>
      </form>
      {!isFetching && error && <p className="text-red-500">{error.message}</p>}
      {isFetching && <p className="text-slate-200">Loading...</p>}
      <p className="text-slate-200 mt-2">
        Already have an account?{" "}
        <button className="text-blue-500" onClick={() => setLogin(true)}>
          Log In
        </button>
      </p>
    </div>
  );
}
