import { createContext } from "react"
import { IAssetList } from "types/dashboard"

interface DashboardContextProps {
  assetsList: IAssetList[]
  setAssetsList: (value: IAssetList[]) => void
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined)

export default DashboardContext
