import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commissionProof } from '../Stores/Slices/commissionSlice';
import { Button, TextField } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';


import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CommissionProof = () => {
    const [amount,setAmount] = useState("");
    const [proof,setProof] = useState("");
    const [comment, setComment] = useState("");
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();
    const {isAuthenticated,loading} = useSelector(state=>state.commission);
    const navigateTo = useNavigate()

    const handleCommission=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("amount",amount),
        formData.append("proof",proof),
        formData.append("comment",comment)
        dispatch(commissionProof(formData))
    }
    const paymentProof = (e)=>{
       const file = e.target.files[0];
       setProof(file);
       if (file) {
       setProof(file);
       setPreview(URL.createObjectURL(file)); 
  }
    }
    useEffect(() => {
      if(isAuthenticated){
        navigateTo('/')
      }
    return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  return (
    <section className="min-h-screen">
      <div className="flex  justify-center items-center  py-8">
        <form
          onSubmit={handleCommission}
          className="w-full max-w-4xl p-8 rounded-xl flex flex-col gap-6 bg-white shadow-md"
        >
          <h1 className="text-3xl font-bold text-center">Payment Proof Methods😊</h1>
          <div className="flex  gap-4">
         <TextField type='number' fullWidth color="error" label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          
          <div className="flex items-center gap-4">
             {/* Show preview image if available */}
          { preview && (
           <img
                 src={preview}
                 alt="Preview"
                 className="w-20 h-20 object-cover rounded-full border"
               />
             )}
              <Button
                component="label"
                role={undefined}
                color="error"
                variant="outlined"
                tabIndex={-1}
                startIcon={<FaCloudUploadAlt />}
              >
                Upload ScreenShot
                <VisuallyHiddenInput
                  type="file"
                  onChange={paymentProof}
                />
              </Button>
              </div>

              <div className="flex  gap-4">
            <TextField
            value={comment} onChange={(e) => setComment(e.target.value)}
            color="error"
            fullWidth
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            defaultValue="Default Value"
           />
          </div>
         

          <Button type="submit" variant="contained" color="error">
            {loading && 'Commission Proofed...'}
            {!loading && "Commission Proofed"}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default CommissionProof;