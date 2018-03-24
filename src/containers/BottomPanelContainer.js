// @flow
import { compose, withState, withHandlers } from "recompose"
import BottomPanel from "../components/BottomPanel"
import type { FilterType, CategoryType } from "../types"

type Props = {
  isOpen: boolean,
  filter: string,
  displayType: CategoryType | "all",
  setOpen: (openState: boolean) => void,
  setFilter: (filter: FilterType) => void,
}

const toggleOpen = ({ isOpen, setOpen }: Props) => () => setOpen(!isOpen)

const BottomPanelContainer = compose(
  withState("isOpen", "setOpen", true),
  withState("filter", "setFilter", ""),
  withState("displayType", "setDisplayType", "all"),
  withHandlers({ toggleOpen })
)(BottomPanel)

export default BottomPanelContainer
