import React, {useState, useRef, FC} from 'react';
import './upload.css'
import { useHttp } from '../hooks/http.hook';
import { IItem, IUploadedFile } from '../Interfaces/IInputProps';
import CustomNumberInput from './CustomNumberInput';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {BsFillCloudArrowUpFill} from 'react-icons/bs'
import { useCreateItemMutation } from '../api/apiSlice';
import Spinner from './Spinner';

interface Event<T = EventTarget> {
    target: T
}

interface IListItemForPost{
  name: string;
  place: string;
  number: number;
  quantity: number;
  fileQueries: IUploadedFile
}
interface IFormData{
  name: string;
  place: string;
}

const Upload = () => {
  const preloadImage = useRef<HTMLImageElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState<number>(0)
  // const [number, setNumber] = useState<number>(0);
  const {request} = useHttp();
  const [createItem, {error, isLoading}] = useCreateItemMutation();

  const handleChange = (event: any): void => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if(preloadImage.current) {
      preloadImage.current.title = file.name;
    }
    reader.onload = function(event) {
      if(preloadImage.current) {
        preloadImage.current.src = event.target?.result as string;
      }
    };
    reader.readAsDataURL(file);
    setSelectedFile(file)
  }

  const handleSubmit = async (values :IFormData, resetForm: ()=>any) => {
    if(!selectedFile) {
        alert("Please select a file")
        return;
    };
    const formData = new FormData();
    formData.append('file', selectedFile);  
    const file:IUploadedFile = await request('http://localhost:5000/upload', 'POST', formData, undefined)
    const postObj = {
      name: values.name,
      place: values.place,
      quantity,
      // number,
      fileInfo: file
    };
    await createItem(postObj as any as IItem)
    setQuantity(0)
    // setNumber(0)
    setSelectedFile(null)
    if(inputRef.current?.value){
      inputRef.current.value=null as any as string
    }
    resetForm()
  }
  console.log(isLoading)
  return (
    <div className='upload-form-bg'>
      {isLoading && (
        <div className='loader'><Spinner/></div>
      )}
      <Formik initialValues={{
          name: '',
          place: '',
        }} 
        onSubmit={(values, {resetForm})=>handleSubmit(values, resetForm)}
        validationSchema={Yup.object({
          name: Yup.string().min(2, 'Min 2 characters').required('Required field'),
          place: Yup.string().min(3, 'Min 3 characters').required('Required field'),
      })}>
        <Form className='form'>
              <label htmlFor="name">Name</label>
              <Field type="text" placeholder='Enter your name' id='name' name='name'/>
              <ErrorMessage className='error' name="name">{(msg)=><div className='error'>{msg}</div>}</ErrorMessage>
              <label htmlFor="place">Place</label>
              <Field type="text" placeholder='Enter your place' id='place' name='place'/>
              <ErrorMessage className='error' name="place">{(msg)=><div className='error'>{msg}</div>}</ErrorMessage>
              <div className='upload-numbers'>
                {/* <CustomNumberInput label="Number" name="number" type="number" id="number" value={number} setNumber={setNumber}/> */}
                <CustomNumberInput label="Quantity" name="quantity" type="number" id="quantity" value={quantity} setNumber={setQuantity}/>
              </div>
              <div className='upload-file'>
                <input ref={inputRef} type="file" 
                  onChange={handleChange}
                  className='hidden file__input'
                  id='file'
                  name='file'
                  accept='image/*,.png,.jpg,.gif,.web'
                  />
                <label htmlFor="file" className='file__label'><BsFillCloudArrowUpFill color='white' fontSize="50"/></label>
              </div>
            {selectedFile ? (
              <div className='upload-img-container'>  
                <img src="" alt="" ref={preloadImage}/>
              </div>
            ) : null}
            <div className='footer'>
              <button type='submit'>Submit</button>
            </div>
        </Form>
      </Formik>
      <div className='bg'></div>
    </div>
  )
}

export default Upload