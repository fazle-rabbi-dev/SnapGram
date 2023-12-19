import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthSuccess from "./_auth/Success";
import {
  Home,
  CreatePost,
  PostDetails,
  EditPost,
  AllUsers,
  UpdateProfile,
  Explore,
  LikedPosts,
  Profile,
  Saved,
  DeletePost
} from "./_root/pages";
import { ToastContainer } from "react-toastify";
import eruda from "eruda";

const App = () => {
  // Add eruda console for android device!
  /*useEffect(() => {
    eruda.init({
      container: document.getElementById("console"),
      tools: ["console", "network", "element"]
    });
  }, []);*/

  return (
    <main>
      <Routes>
        {/* Public Route */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Route>

        {/* Private Route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postid" element={<EditPost />} />
          <Route path="/delete-post/:postid" element={<DeletePost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/post/:postid" element={<PostDetails />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="console"></div>
    </main>
  );
};

export default App;
