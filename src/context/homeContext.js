import React from 'react'

const HomeContext = React.createContext({
  activeTabId: 'HOME',
  onChangeTab: () => {},
})

export default HomeContext
