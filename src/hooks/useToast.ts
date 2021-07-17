import { useContext } from 'react'
import { Context } from '../contexts/ToastProvider'

const useToast = () => {
  const { toast } = useContext(Context)
  return toast
}

export default useToast
