import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/types';
import { useNavigate } from 'react-router-dom';
import {createContext,useContext,useEffect,useState} from 'react'

export const INITIAL_USER={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:'',
};
export const INITIAL_STATE={
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async()=>false as boolean,
};
type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  };
const AuthContext=createContext<IContextType>(INITIAL_STATE);

 export function AuthProvider({children}:{children:React.ReactNode}) {
    const [user,setUser]=useState<IUser>(INITIAL_USER);
    const navigate = useNavigate();
    const[isLoading,setIsLoading]=useState(false);
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const checkAuthUser=async()=>{
        setIsLoading(true);
        try{
            // const user=await Auth.currentAuthenticatedUser();
            // setUser(user);
           const currentAccount=await getCurrentUser();
           if (currentAccount) {
            setUser({
              id: currentAccount.$id,
              name: currentAccount.name,
              username: currentAccount.username,
              email: currentAccount.email,
              imageUrl: currentAccount.imageUrl,
              bio: currentAccount.bio,
            });
            setIsAuthenticated(true);
    
            return true;
          }
            return false;
        }catch(error){
            console.log(error);
            return false;
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" 
        ) {
          navigate("/signin");
        }
    
        checkAuthUser();
      }, []);
    const value={
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }
  return (
   <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
  )
}

export const UseUserContext=()=> useContext(AuthContext);