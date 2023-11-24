import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Graph from '../elements/Graph'

// ダミーデータ
const dummyPopulationData = [
  {
    prefName: '北海道',
    data: [
      { year: 2021, value: 100 },
      { year: 2022, value: 150 },
    ],
  },
  {
    prefName: '青森県',
    data: [
      { year: 2021, value: 50 },
      { year: 2022, value: 75 },
    ],
  },
  // 他の都道府県データも追加
]

describe('Graph Component', () => {
  it('renders Graph component with population data', () => {
    // Graphコンポーネントをレンダリング
    render(<Graph populationdata={dummyPopulationData} graphType="total" />)

    // グラフが存在することを確認
    expect(screen.getByTestId('graph-container')).toBeInTheDocument()
  })

  // 他のテストケースも同様に追加
})
