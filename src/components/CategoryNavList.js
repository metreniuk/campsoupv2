import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import navItems from '../constants/navigation'

const CategoryNavList = props => {
  const navLinks = navItems
    .map(({en, rus}) => ({
      id: en,
      name: rus,
      link: `/${en}`
    }))

  return (
    <Fragment>
      {props.children(navLinks)}
    </Fragment>
  )
}

CategoryNavList.propTypes = {
  children: PropTypes.func.isRequired
}

export default CategoryNavList
