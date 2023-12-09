import { UseUserContext } from '@/context/AuthContext'
import { formatDateString } from '@/lib/utils'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type PostCardProps = {
    post: Models.Document
    
}
function PostCard({post}:PostCardProps) {
    const {user}=UseUserContext();
    // console.log(post.$id)
    console.log(user.id)
    if(!post.creator) return ;
  return (
    <div className='post-card'>
        <div className=' flex-between'>
            <div className='flex items-end gap-3'>
                <Link to={`/profile/${post.creator.$id}`}>
                    <img src={post?.creator?.imageUrl||'../../../public/assets/images/profile.png'} alt="Creator" 
                    className='rounded-full w-12 lg:h-12'/>
                </Link>
                <div className='flex flex-col'>
                  <p className='base-medium lg:body-bold text-light-1'>{
                    post.creator.name}</p>
                    <div className='flex gap-2 text-light-3'>
                        <p className='subtle-semibold lg:small-regular'> {formatDateString(post.$createdAt) }</p>-
                        <p className='subtle-semibold lg:small-regular'>{post.location}</p>
                    </div>
                </div>
            </div>
            <Link to={`/update-post/${post.$id}`} className={`${user.id!=post.creator.$id && 'hidden'}`}>
                <img src="../../../public/assets/icons/edit.svg" alt="Edit" width={20} height={20} />
            </Link>
        </div>
        <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "../../../public/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>
      <PostStats post={post} userid={user.id}/>
    </div>
  )
}

export default PostCard