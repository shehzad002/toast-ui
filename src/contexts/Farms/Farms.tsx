import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useToast from '../../hooks/useToast'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../toast/utils'
import { getFarms } from '../../toast/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const toast = useToast()
  const { account } = useWallet()

  const farms = getFarms(toast)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
