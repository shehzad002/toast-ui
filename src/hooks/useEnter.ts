import {useCallback} from 'react'

import useToast from './useToast'
import {useWallet} from 'use-wallet'

import {enter, getXToastStakingContract} from '../toast/utils'

const useEnter = () => {
  const {account} = useWallet()
  const toast = useToast()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXToastStakingContract(toast),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, toast],
  )

  return {onEnter: handle}
}

export default useEnter
