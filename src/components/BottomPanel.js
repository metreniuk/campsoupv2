// @flow
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import chevronDown from "@fortawesome/fontawesome-free-solid/faChevronCircleDown"
import chevronUp from "@fortawesome/fontawesome-free-solid/faChevronCircleUp"
import starSolid from "@fortawesome/fontawesome-free-solid/faStar"
import cloudSolid from "@fortawesome/fontawesome-free-solid/faCloud"
import starRegular from "@fortawesome/fontawesome-free-regular/faStar"
import { amber, canary } from "../constants/colors"
import CategoryNavList from "../components/CategoryNavList"
import type { FilterType, CategoryType } from "../types"

const Header = styled.header`
  background-color: ${amber};
  color: ${canary};
  display: flex;
  align-items: stretch;
  height: 30px;
`

const ExpandButton = styled.div`
  padding: 2px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`

const HeaderItem = styled(Link)`
  padding: 8px 10px;
  border-left: 1px solid ${canary};
  text-transform: uppercase;
  color: ${canary};

  &:hover {
    background-color: ${canary};
    color: ${amber};
  }
`

const FiltersHeading = styled.h5`
  display: flex;
  align-items: center;
`

const FilterItem = styled.button`
  padding: 6px;
  border: 1px solid ${amber};
  border-radius: 4px;
  color: ${amber};
  background-color: ${canary};
`

const Filters = styled.div`
  display: flex;
  color: ${amber};
  background-color: ${canary};

  ${FiltersHeading} {
    margin-right: 20px;
  }

  ${FilterItem} {
    margin-right: 10px;
  }
`

const Separator = styled.div`
  height: 1px;
  background-color: ${amber};
`
const TileStar = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 8px;
`

const Tile = styled(Link)`
  position: relative;
  padding: 12px 4px;
  text-align: center;
  width: 110px;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  background-color: ${amber};
  border-radius: 4px;
  color: ${canary};
`

const TilesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 190px;
  overflow: auto;
  padding: 20px;
  background-color: ${canary};

  ${Tile} {
    margin: 0 10px 10px 0;
  }
`
const innerHeight = "238px"
const Wrapper = styled.div`
  font-family: "BloggerSansMedium", sans-serif;
  font-size: 16px;
  width: 100%;
  position: relative;
  top: ${props => (props.isOpen ? "0" : innerHeight)};
  transition: top 0.3s;

  ${Filters} {
    padding: 10px 20px;
  }
`

type DisplayType = CategoryType | "all"
type Props = {
  isOpen: boolean,
  filter: FilterType,
  displayType: DisplayType,
  toggleOpen: () => void,
  setFilter: (filter: FilterType) => void,
  setDisplayType: (type: DisplayType) => void,
}

type TileType = {
  link: string,
  title: string,
  type: CategoryType,
  isFavorite: boolean,
}

const tiles: Array<TileType> = [
  {
    link: "/",
    title: "faf",
    type: "sport",
    isFavorite: false,
  },
  {
    link: "/",
    title: "amam",
    type: "events",
    isFavorite: true,
  },
]

const BottomPanel = ({
  isOpen,
  displayType,
  toggleOpen,
  setFilter,
  setDisplayType,
}: Props) => (
  <Wrapper isOpen={isOpen}>
    <Header>
      <ExpandButton onClick={toggleOpen}>
        {isOpen ? (
          <FontAwesomeIcon icon={chevronDown} />
        ) : (
          <FontAwesomeIcon icon={chevronUp} />
        )}
      </ExpandButton>
      <CategoryNavList>
        {links =>
          links.map(({ id, name, link }) => (
            <HeaderItem key={id} to={link} onClick={() => setDisplayType(id)}>
              {name}
            </HeaderItem>
          ))
        }
      </CategoryNavList>
    </Header>
    <Filters>
      <FiltersHeading>Фильтр:</FiltersHeading>
      <FilterItem onClick={() => setFilter("favorite")}>
        <FontAwesomeIcon icon={starSolid} />
      </FilterItem>
      <FilterItem onClick={() => setFilter("weather")}>
        <FontAwesomeIcon icon={cloudSolid} />
      </FilterItem>
      <FilterItem onClick={() => setFilter("tags")}>Характеристики</FilterItem>
      <FilterItem onClick={() => setFilter("age")}>Возраст</FilterItem>
    </Filters>
    <Separator />
    <TilesSection>
      {tiles.map(
        ({ title, link, isFavorite, type }: TileType) =>
          (displayType === "all" || type === displayType) && (
            <Tile key={title} to={link}>
              {title}
              <TileStar>
                {isFavorite ? (
                  <FontAwesomeIcon icon={starSolid} />
                ) : (
                  <FontAwesomeIcon icon={starRegular} />
                )}
              </TileStar>
            </Tile>
          )
      )}
    </TilesSection>
  </Wrapper>
)

export default BottomPanel
