import {useCallback,useState} from 'react'
import {FileWithPath,useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps={
    fieldChange:(file:File[])=>void;
    mediaUrl :string;
}

function FileUploader({fieldChange,mediaUrl}:FileUploaderProps) {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
        // Do something with the files
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [file])
      const {getRootProps, getInputProps} = useDropzone({onDrop,accept:{
        'image/*':['.png','.jpg','.jpeg','.svg']
      }})
  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl  cursor-pointer'>
      <input {...getInputProps()} className=' cursor-pointer' />
      {
        fileUrl?(
            <>
             <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
           <img src={fileUrl} alt="image"  className='file_uploader-img'/>
            </div>
            <p className='file_uploader-label'>Click or drag Photo to replace</p>
            </>
           
        )
        :
        (
        <div className='file_uploader-box'>
            <img src="../../../public/assets/icons/file-upload.svg" alt="file" width={96} height={77} />
            <h2 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h2>
            <p className='text-light-4 mb-6 small-regular'>SVG,PNG,JPG</p>
            <Button className='shad-button_dark_4'>
                Select from computer
            </Button>

        </div> )
      }
    </div>
  )
}

export default FileUploader