import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Check from '../elements/Check'

// API呼び出しをモック
jest.mock('axios')

// ダミーデータ
const dummyPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  //   { prefCode: 2, prefName: '青森県' },
  // 他の都道府県データも追加
]

// ダミーコールバック関数
const dummyCallback = jest.fn()

describe('Main Component', () => {
  it('handles unchecking checkbox and removes data', () => {
    // Checkコンポーネントをレンダリング
    render(<Check prefectures={dummyPrefectures} onChange={dummyCallback} />)

    // チェックボックスをクリックして選択状態にする
    fireEvent.click(screen.getByLabelText('北海道'))

    // チェックボックスが選択されていることを確認
    expect(screen.getByLabelText('北海道')).toBeChecked()

    // チェックボックスを再びクリックして選択を解除
    fireEvent.click(screen.getByLabelText('北海道'))

    // チェックボックスが選択されていないことを確認
    expect(screen.getByLabelText('北海道')).not.toBeChecked()
  })

  // 他のテストケースも同様に追加
})
