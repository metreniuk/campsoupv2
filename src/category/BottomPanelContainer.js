// @flow
import { compose, withState, withHandlers, lifecycle } from "recompose"
import { connect } from "react-redux"
import BottomPanel from "../components/BottomPanel"
import type { FilterType, CategoryType } from "../types"
// import { withFetch } from "../components/Fetch"
import {
  fetchCategory,
  fetchFavorites,
  deleteFavorite,
  postFavorite,
} from "./actions"
import { getCategoryItems } from "./reducer"

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

function handleFavoriteClick({ dispatch }) {
  return (id, isFavorite) =>
    isFavorite ? dispatch(deleteFavorite(id)) : dispatch(postFavorite(id))
}

function componentDidMount() {
  this.props.dispatch(fetchFavorites("5ad7a447856c0a679da9f4f8"))
  this.props.dispatch(fetchCategory("all"))
}

//TODO move all logic away from bottom panel to normalized redux + local state filter

const BottomPanelContainer = compose(
  connect(state => ({ tiles: getCategoryItems(state.category) })),
  withState("isOpen", "setOpen", true),
  withState("filter", "setFilter", ""),
  withState("displayType", "setDisplayType", "all"),
  withHandlers({ toggleOpen, handleHeaderItemClick, handleFavoriteClick }),
  lifecycle({ componentDidMount })
)(BottomPanel)

export default BottomPanelContainer
