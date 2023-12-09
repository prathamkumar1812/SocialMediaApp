import React from 'react'
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
import { SigninValidation } from '@/lib/Validation'
import Loader from '@/components/shared/Loader'
import { Link,useNavigate } from 'react-router-dom'

import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutation'
import { UseUserContext } from '@/context/AuthContext'
import { Loader2Icon } from 'lucide-react'




function SigninForm() {

 
  const { toast } = useToast()
  const navigate=useNavigate();
  const {checkAuthUser,isLoading:isUserLoading}=UseUserContext();
 
 const {mutateAsync:signInAccount,isPending:isSigningIn}=useSignInAccount()
     // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
  
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
        <h2 className=' h3-bold md:h2-bold pt-5 sm:pt-12'>Login to your Account</h2>
        <p className='text-light-3 sm:small-medium md:base-regular mt-2'>Welcome back!  Enter your account details</p>
      
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-4 gap-5">
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
        {isUserLoading ? (<div className='flex-center gap-2'>
       <Loader2Icon/> Loading
        </div>) : "Sign in"}
      </Button>
      <p className='text-small-regular text-light-2 text-center mt-2'>
        Don't have an account? 
        <Link to={'/signup'} className='text-primary-500 ml-1 text-small-semibold'>Sign up</Link>
      </p>
    </form>
    </div>
  </Form>
  )
}

export default SigninForm;