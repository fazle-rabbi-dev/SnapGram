import {
  useState, useEffect
} from 'react';
import { useNavigate } from "react-router-dom"
import { useSaveUserForGithubAuth } from "@/lib/react-query/queries"
import { useUserContext } from "@/context/AuthContext"

const Success = () => {
  const navigate = useNavigate()
  const { user, setUser, checkAuthUser, isLoading: isAuthLoading } = useUserContext();
  const { mutateAsync: saveUser, isPending: isSavingUser } = useSaveUserForGithubAuth()
  

  useEffect(() => {
    const saveUserToDb = async () => {
      const user = await saveUser();
      setUser(user)
      navigate("/");
    }
    
    if(!isAuthLoading && !user){
      console.log("saveUserToDb")
      saveUserToDb();
    }
    
    if(!isAuthLoading && user){
      navigate("/");
    }
    
  },[isAuthLoading]);
  
  
  if(isAuthLoading || isSavingUser){
    return "Redirecting..."
  }
  
  return (
    <div className="w-full">
      <h2 className="h2-bold">Success</h2>
      
    </div>
  )
}

export default Success
