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
  console.log("fetch favs", this.props.account)
  this.props.dispatch(fetchFavorites())
  this.props.dispatch(fetchCategory("all"))
}

//TODO move all logic away from bottom panel to normalized redux + local state filter

const BottomPanelContainer = compose(
  connect(state => ({
    tiles: getCategoryItems(state.category),
    account: state.account,
  })),
  withState("isOpen", "setOpen", true),
  withState("filter", "setFilter", ""),
  withState("displayType", "setDisplayType", "all"),
  withHandlers({ toggleOpen, handleHeaderItemClick, handleFavoriteClick }),
  lifecycle({ componentDidMount })
)(BottomPanel)

export default BottomPanelContainer
