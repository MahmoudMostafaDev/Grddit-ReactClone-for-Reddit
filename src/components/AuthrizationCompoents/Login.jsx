import Button from "./Button";
import Input from "./Input";
import usePost from "../../hooks/usePost";
import { LoginFn } from "../../util/http";
import { saveToken } from "../../util/auth";
import { popupActions } from "../../store";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import authContext from "../../store/authContext";
import { redirect } from "react-router-dom";
export default function Login({ setLogin }) {
  const { res, error, isFetching, setSend, setBody, body } = usePost(LoginFn);
  const dispatch = useDispatch();
  const { setIsLogged } = useContext(authContext);
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");
    if (username && password) {
      setBody({ username, password });
      setSend(true);
    }
  }
  if (res) {
    saveToken(res, body.username);
    dispatch(popupActions.closeLogin());
    setIsLogged(true);
    redirect("/");
  }

  return (
    <div className="mx-auto w-10/12 p-3 sm:p-10 pt-16">
      <h1 className="text-3xl font-bold text-white">Log in</h1>
      <p className="text-slate-200 mt-2">
        Enter your email and password to Login
      </p>
      <form onSubmit={handleSubmit}>
        <Input placeholder={"username"} type={"text"} name={"username"} />
        <Input placeholder={"Password"} type={"password"} name={"password"} />
        <Button className="w-full mt-6 ">login</Button>
      </form>
      {isFetching && <p className="text-slate-300">Loading...</p>}
      {!isFetching && error && <p className="text-red-500">{error.message}</p>}
      <p className="text-slate-200 mt-2">
        Dont have an account?{" "}
        <button className="text-blue-500" onClick={() => setLogin(false)}>
          SignUp
        </button>
      </p>
    </div>
  );
}
