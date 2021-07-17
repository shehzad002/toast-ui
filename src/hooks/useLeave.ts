import {useCallback} from 'react'

import useToast from './useToast'
import {useWallet} from 'use-wallet'

import {leave, getXToastStakingContract} from '../toast/utils'

const useLeave = () => {
  const {account} = useWallet()
  const toast = useToast()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXToastStakingContract(toast),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, toast],
  )

  return {onLeave: handle}
}

export default useLeave
