"use client"

import { useToast } from "@/hooks/use-toast"

const useCustomToast = () => {
  const { toast } = useToast()

  const showSuccessToast = (message: string) => {
    toast({
      title: message,
      variant: "default",
    })
  }

  const showErrorToast = (message: string) => {
    toast({
      title: message,
      variant: "destructive",
    })
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast
