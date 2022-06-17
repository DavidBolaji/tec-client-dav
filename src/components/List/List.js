import React from 'react'

const List = React.memo((props) => {
  return (
    <li>{props.name}</li>
  )
})

export default List