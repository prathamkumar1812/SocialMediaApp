import  { useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation'
import { UseUserContext } from '@/context/AuthContext'

function Topbar() {
    const navigate=useNavigate();
    const {user}=UseUserContext();
    const {mutate: signOut,isSuccess}=useSignOutAccount();
    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess])
  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to='/' className='flex items-center gap-3'>
                <img src='../../../public/assets/images/logo.svg' alt='logo' width={130} height={325}/>
            </Link>
            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button-ghost'
                onClick={()=>signOut()}>
                    <img src='../../../public/assets/icons/logout.svg' alt='logout'/>
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img src={user.imageUrl||'../../../public/assets/images/profile.png'} 
                    alt='profile' className='h-8 w-8 rounded-full'/>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar