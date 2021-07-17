import {useCallback} from 'react'

import useToast from './useToast'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getToastContract,
  getXToastStakingContract
} from '../toast/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const toast = useToast()
  const lpContract = getToastContract(toast)
  const contract = getXToastStakingContract(toast)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
