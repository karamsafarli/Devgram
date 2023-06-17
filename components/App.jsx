'use client'
import Nav from "./Nav";
import { useSelector } from 'react-redux';

const App = ({ children }) => {

  const darkMode = useSelector((state) => state.colorThemeReducer.value)

  return (
      <body className="app" style={{ backgroundColor: darkMode ? 'black' : '#F3F2EF', color: darkMode ? 'white' : 'black' }}>
        <div className="app-container">
          <Nav />
          {children}
        </div>
      </body>
  )
}

export default App