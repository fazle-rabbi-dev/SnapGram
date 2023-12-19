import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useCreateUserAccount,
  useSignInAccount,
  useSignInWithGithub
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";
import showToast from "@/lib/helpers/showToast";

const SigninForm = () => {
  const defaultFormState = {
    email: "",
    password: ""
  }
  const [formState, setFormState] = useState(defaultFormState);
  const { user, checkAuthUser, setUser, setIsAuthenticated, isLoading: isAuthLoading } = useUserContext();
  const navigate = useNavigate()
  
  // Queries
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();
  const { mutateAsync: signInWithGithub, isPending: isSigningInWithGithub } =
    useSignInWithGithub();
  

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
      !formState.email ||
      !formState.password
    ) {
      return showToast("Enter correct details", "error");
    }
    
    try {
      const session = await signInAccount({
        email: formState.email,
        password: formState.password
      });
      
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        setFormState(defaultFormState)
        navigate("/");
      } else {
        return showToast("Login failed.Please check your email or password.", "error");
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  
  const handleGithubSignin = () => {
    signInWithGithub();
  }

  return (
    <form
      id="form"
      onSubmit={handleSignup}
      className="h-screen w-full flex justify-center md:items-center mt-20"
    >
      <div className="mx-2">
        <div className="w-full flex flex-col justify-center items-center">
          <img className="" src="/assets/images/logo.svg" alt="Logo" />
          <h2 className="h3-bold md:h2-bold">
            Log in to your account
          </h2>
          <p className="text-light-3">
            Welcome back! Please enter your details.
          </p>
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

        <button disabled={isSigningInUser || isAuthLoading} className="submit_btn" type="submit">
          {isSigningInUser ? (
            <div className="w-full flex justify-center gap-2">
              <Loader />
              Signing in...
            </div>
          ) : (
            "Sign in"
          )}
        </button>
        
        
        
        <button disabled={isAuthLoading || isSigningInUser} onClick={handleGithubSignin} className="mt-4 submit_btn" type="button">
            Sign in with github
        </button>
        
        
        
        <p className="text-small-regular text-light-2 mt-2 text-center">
          Don't have an account?
          <Link
            to="/sign-up"
            className="text-small-semibold text-primary-500 ml-2"
          >
            Signup
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SigninForm;
