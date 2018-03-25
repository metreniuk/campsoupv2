// @flow
import { compose, withState, withHandlers, lifecycle } from "recompose"
import { connect } from "react-redux"
import BottomPanel from "../components/BottomPanel"
import type { FilterType, CategoryType } from "../types"
// import { withFetch } from "../components/Fetch"
import { fetchCategory } from "./actions"

type Props = {
  isOpen: boolean,
  filter: string,
  displayType: CategoryType | "all",
  setOpen: (openState: boolean) => void,
  setFilter: (filter: FilterType) => void,
}

const toggleOpen = ({ isOpen, setOpen }: Props) => () => setOpen(!isOpen)

const handleHeaderItemClick = ({ setDisplayType, dispatch }) => type => {
  setDisplayType(type)
  dispatch(fetchCategory(type))
}

function componentDidMount() {
  this.props.dispatch(fetchCategory("all"))
}

// const fetchPropsMapper = ({ displayType }) => ({
//   url: `http://localhost:3030/entity/${
//     displayType !== "all" ? displayType : ""
//   }`,
//   refetchKey: displayType,
// })

//TODO move all logic away from bottom panel to normalized redux + local state filter

const BottomPanelContainer = compose(
  connect(),
  withState("isOpen", "setOpen", true),
  withState("filter", "setFilter", ""),
  withState("displayType", "setDisplayType", "all"),
  withHandlers({ toggleOpen, handleHeaderItemClick }),
  lifecycle({ componentDidMount })
)(BottomPanel)

export default BottomPanelContainer
