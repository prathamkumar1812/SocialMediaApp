
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupuValidation } from '@/lib/Validation'
import Loader from '@/components/shared/Loader'
import { Link,useNavigate } from 'react-router-dom'

import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutation'
import { UseUserContext } from '@/context/AuthContext'





function SignupForm() {

 
  const { toast } = useToast()
  const navigate=useNavigate();
  const {checkAuthUser,isLoading:isUserLoading}=UseUserContext();
 const {mutateAsync:createUserAccount,isPending:isCreatingAccount}=useCreateUserAccount();
 const {mutateAsync:signInAccount,isPending: isSigningInUser}=useSignInAccount()
     // 1. Define your form.
  const form = useForm<z.infer<typeof SignupuValidation>>({
    resolver: zodResolver(SignupuValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupuValidation>) {
   const user= await createUserAccount(values)
   if(!user){
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    })
  }
  const session= await signInAccount({email:values.email,password:values.password});
  if(!session){
    return  toast({
      title: "SignIn Failed",
      description: "Please try again",
    })
    

  }
  const isLoggedin=await checkAuthUser();
  if(isLoggedin){
    form.reset(); 
    navigate('/');
  }
  else{
    return  toast({
      title: "SignIn Failed",
      description: "Please try again",
    })
  
  }
}
  return (
     <Form {...form}>
      <div className='sm:w-420  flex-center flex-col'>
        <img src="" alt="" />
        <h2 className=' h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new Account</h2>
        <p className='text-light-3 sm:small-medium md:base-regular mt-2'>To use this Enter your account details</p>
      
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-4 gap-5">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text"  className='shad-input'{...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text"  className='shad-input'{...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email"  className='shad-input'{...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password"  className='shad-input'{...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className='shad-button_primary'>
      {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
      </Button>
      <p className='text-small-regular text-light-2 text-center mt-2'>
        Already have an account? 
        <Link to={'/signin'} className='text-primary-500 ml-1 text-small-semibold'> Log in</Link>
      </p>
    </form>
    </div>
  </Form>
  )
}

export default SignupForm;