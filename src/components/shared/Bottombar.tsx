import { bottomLink } from '@/constants';
import { INavLink } from '@/types';
import React from 'react'
import { Link, NavLink ,useLocation } from 'react-router-dom'

function Bottombar() {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
       {
                    bottomLink.map((link:INavLink)=>{
                        const isActive= pathname===link.route;
                        return(
                            
                                <Link to={link.route} key={link.label} className={`${isActive&&"bg-primary-500 rounded-full"} flex-center flex-col gap-2 p-2 transition`}>
                                    <img src={link.imgURL} alt={link.label}  className={`group-hover:invert-white${isActive&&" invert-white"}`} width={16} height={16}/>
                                    <p className='tiny-medium text-light-2'>{link.label}</p>
                                </Link>
                           
                        )
                    })
                }
    </section>
  )
}

export default Bottombar