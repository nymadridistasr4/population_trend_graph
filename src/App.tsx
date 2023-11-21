import React from 'react'
import Main from './elements/Main'

const App: React.FC = () => {
  return (
    <div className="App">
      <header style={{ textAlign: 'center' }}>
        <h1>都道府県別総人口推移グラフ</h1>
      </header>
      <Main />
    </div>
  )
}

export default App
