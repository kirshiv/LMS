import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { toast } from 'sonner';

const BuyCourseButton = ({ courseId }) => {
    console.log(courseId);
    
    const [createCheckoutSession, { isLoading,data,isSuccess,error,isError}] = useCreateCheckoutSessionMutation();
    const handleBuyClick = async () => {
        await createCheckoutSession(courseId);
    };
    useEffect(() => {
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data.url;
            }
            else {
                toast.error("Invalid Response from server")
            }
        }
        if (isError) {
            toast.error(error?.data.message || "Failed to fetch data")
        }
    },[isSuccess,error,data,isError])
  return (
      <Button onClick={handleBuyClick}>
          Buy Course
    </Button>
    
  )
}

export default BuyCourseButton
