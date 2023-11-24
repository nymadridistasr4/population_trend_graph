import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Check from '../elements/Check'

// ダミーデータ
const dummyPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  // 他の都道府県データも追加
]

// ダミーコールバック関数
const dummyCallback = jest.fn()

describe('Check Component', () => {
  it('renders Check component with prefectures data', () => {
    // Checkコンポーネントをレンダリング
    render(<Check prefectures={dummyPrefectures} onChange={dummyCallback} />)

    // チェックボックスが存在することを確認
    expect(screen.getByLabelText('北海道')).toBeInTheDocument()
    expect(screen.getByLabelText('青森県')).toBeInTheDocument()
    // 他の都道府県も確認

    // チェックボックスが初期状態で非選択であることを確認
    expect(screen.getByLabelText('北海道')).not.toBeChecked()
    expect(screen.getByLabelText('青森県')).not.toBeChecked()
    // 他の都道府県も確認
  })

  it('handles checkbox change and calls the callback', () => {
    // Checkコンポーネントをレンダリング
    render(<Check prefectures={dummyPrefectures} onChange={dummyCallback} />)

    // チェックボックスをクリック
    fireEvent.click(screen.getByLabelText('北海道'))

    // チェックボックスが選択されていることを確認
    expect(screen.getByLabelText('北海道')).toBeChecked()

    // コールバック関数が正しく呼ばれたか確認
    expect(dummyCallback).toHaveBeenCalledWith('北海道', 1, true)
  })

  // 他のテストケースも同様に追加
})
