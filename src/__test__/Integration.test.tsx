import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios, { AxiosResponse } from 'axios'
import Main from '../elements/Main'

// Jest が axios をモック
jest.mock('axios')

describe('Integration Test', () => {
  // axios のモックをリセット
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render Main component with data from API', async () => {
    // ここに axios のモックデータを設定
    const mockData: AxiosResponse<any> = {
      data: {
        message: null,
        result: [
          { prefCode: 1, prefName: '北海道' },
          // Add more prefectures as needed
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} as any },
    }
    ;(axios.get as jest.Mock).mockResolvedValue(mockData)

    // Main コンポーネントを描画
    await act(async () => {
      render(<Main />)
    })

    // Main コンポーネントが API データを使用して期待通りに描画されているかのテストを追加
    expect(screen.getByText('北海道')).toBeInTheDocument()
  })
})
