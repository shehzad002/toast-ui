import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../toast/utils'
import useToast from './useToast'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const toast = useToast()
  const farms = getFarms(toast)
  const masterChefContract = getMasterChefContract(toast)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, toast])

  useEffect(() => {
    if (account && masterChefContract && toast) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, toast])

  return balances
}

export default useAllEarnings
