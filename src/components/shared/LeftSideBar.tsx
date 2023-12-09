import React, { useEffect, useState } from 'react'
import { Link ,NavLink,useNavigate,useLocation} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation'
import { UseUserContext } from '@/context/AuthContext'
import { sidebarLink } from '@/constants'
import { INavLink } from '@/types'
import { Loader } from 'lucide-react'

function LeftSideBar() {
    const navigate=useNavigate();
    const {pathname}=useLocation();
    const {user}=UseUserContext();
    const {mutate: signOut,isSuccess}=useSignOutAccount();

    
    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    },[isSuccess])

    

   
  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
        <Link to='/' className='flex items-center gap-3'>
                <img src='../../../public/assets/images/logo.svg' alt='logo' width={170} height={36}/>
            </Link>
            <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
            <img src={user.imageUrl||'../../../public/assets/images/profile.png'} 
                    alt='profile' className='h-12 w-12 rounded-full'/>
            <div className='flex flex-col'>
                <p className='body-bold'>
                    {user.name}
                </p>
                <p className='small-regular'>
                    @{user.username}
                </p>
                </div>        
            </Link>
            <ul className='flex flex-col gap-6'>
                {
                    sidebarLink.map((sideLink:INavLink)=>{
                        const isActive= pathname===sideLink.route;
                        return(
                            <li key={sideLink.label} className={`leftsidebar-link group ${isActive&&"bg-primary-500"}`}>
                                <NavLink to={sideLink.route} className='flex gap-4 items-center p-4'>
                                    <img src={sideLink.imgURL} alt={sideLink.label}  className={`group-hover:invert-white${isActive&&" invert-white"}`}/>
                                    <p className='body-bold'>{sideLink.label}</p>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <Button variant="ghost" className='shad-button-ghost'
                onClick={()=>signOut()}>
                    <img src='../../../public/assets/icons/logout.svg' alt='logout'/>
                    <p className='small-medium lg:base-medium'>Logout</p>
                </Button>
    </nav>
  )
}

export default LeftSideBar