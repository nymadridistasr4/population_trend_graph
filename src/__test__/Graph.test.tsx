// elements/Graph.test.tsx

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
  it('renders Graph component with population data when population type is total', () => {
    // Graphコンポーネントをレンダリング
    render(<Graph populationdata={dummyPopulationData} graphType="total" />)

    // テスト対象の要素が正しく描画されていることを確認
    expect(screen.getByTestId('graph-container')).toBeInTheDocument()
    expect(screen.getByText('総人口推移')).toBeInTheDocument()
  })

  it('renders Graph component with population data when population type is young', () => {
    // Graphコンポーネントをレンダリング
    render(<Graph populationdata={dummyPopulationData} graphType="young" />)

    // テスト対象の要素が正しく描画されていることを確認
    expect(screen.getByTestId('graph-container')).toBeInTheDocument()
    expect(screen.getByText('年少人口推移')).toBeInTheDocument()
  })

  it('renders Graph component with population data when population type is productive', () => {
    // Graphコンポーネントをレンダリング
    render(
      <Graph populationdata={dummyPopulationData} graphType="productive" />
    )

    // テスト対象の要素が正しく描画されていることを確認
    expect(screen.getByTestId('graph-container')).toBeInTheDocument()
    expect(screen.getByText('生産年齢人口推移')).toBeInTheDocument()
  })

  it('renders Graph component with population data when population type is elderly', () => {
    // Graphコンポーネントをレンダリング
    render(<Graph populationdata={dummyPopulationData} graphType="elderly" />)

    // テスト対象の要素が正しく描画されていることを確認
    expect(screen.getByTestId('graph-container')).toBeInTheDocument()
    expect(screen.getByText('老年人口推移')).toBeInTheDocument()
  })

  // 他のテストケースも同様に追加
})
