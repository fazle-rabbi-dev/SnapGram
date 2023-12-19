import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useCreateUserAccount,
  useSignInAccount
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";
import showToast from "@/lib/helpers/showToast";

const SignupForm = () => {
  const defaultFormState = {
    name: "",
    username: "",
    email: "",
    password: ""
  }
  const [formState, setFormState] = useState(defaultFormState);
  const { user, checkAuthUser, isLoading: isAuthLoading } = useUserContext();
  const navigate = useNavigate()
  
  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccount();

  // Handler
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSignup = async e => {
    e.preventDefault();
    if (
      !formState.name ||
      !formState.username ||
      !formState.email ||
      !formState.password
    ) {
      return showToast("Enter correct details", "error");
    }
    try {
      const newUser = await createUserAccount({
        username: formState.username,
        name: formState.name,
        email: formState.email,
        password: formState.password
      });

      if (!newUser) {
        return showToast("Sign up failed.Please try again", "error");
      }

      showToast("Sign up successful");

      const session = await signInAccount({
        email: formState.email,
        password: formState.password
      });

      if (!session) {
        return showToast("Login failed", "error");
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        setFormState(defaultFormState)
        navigate("/");
      } else {
        showToast("Login failed. Please try again.", "error");
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  
  return (
    <form
      id="form"
      onSubmit={handleSignup}
      className="h-screen w-full flex justify-center md:items-center mt-20"
    >
      <div className="mx-2">
        <div className="w-full flex flex-col justify-center items-center">
          <img className="" src="/assets/images/logo.svg" alt="Logo" />
          <h2 className="h3-bold md:h2-bold">Create a new account</h2>
          <p className="text-light-3">
            To use snapgram, please enter your details
          </p>
        </div>

        <div className="my-2 w-full flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="shad-input"
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className="my-2 w-full flex flex-col">
          <label htmlFor="username">Useranme</label>
          <input
            id="username"
            className="shad-input"
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="my-2 w-full flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="shad-input"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="my-2 w-full flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="shad-input"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>

        <button className="submit_btn" type="submit">
          {isCreatingAccount ? (
            <div className="flex-center gap-2">
              <Loader />
              Loading...
            </div>
          ) : (
            "Sign up"
          )}
        </button>
        <p className="text-small-regular text-light-2 mt-2 text-center">
          Already have an account?
          <Link
            to="/sign-in"
            className="text-small-semibold text-primary-500 ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
