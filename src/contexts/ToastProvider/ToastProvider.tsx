import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Toast } from '../../toast'

export interface ToastContext {
  toast?: typeof Toast
}

export const Context = createContext<ToastContext>({
  toast: undefined,
})

declare global {
  interface Window {
    toastsauce: any
  }
}

const ToastProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [toast, setToast] = useState<any>()

  // @ts-ignore
  window.toast = toast
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const toastLib = new Toast(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setToast(toastLib)
      window.toastsauce = toastLib
    }
  }, [ethereum])

  return <Context.Provider value={{ toast }}>{children}</Context.Provider>
}

export default ToastProvider
