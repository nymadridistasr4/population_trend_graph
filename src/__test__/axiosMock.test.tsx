import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios, { AxiosResponse } from 'axios'
import Main from '../elements/Main'

// Jestがaxiosモジュールをモック
jest.mock('axios')

describe('Axios Mock Test', () => {
  // 各テストの前にaxiosモックをリセット
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle axios response', async () => {
    // axiosレスポンスのためのモックデータをセットアップ
    const mockData: AxiosResponse<any> = {
      data: {
        message: null,
        result: [{ prefCode: 1, prefName: '北海道' }],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} as any },
    }

    // axios.get関数をモックしてmockDataで解決
    ;(axios.get as jest.Mock).mockResolvedValue(mockData)

    // axiosリクエストを行うコンポーネントをレンダリング
    await act(async () => {
      render(<Main />)
    })

    // コンポーネントの期待される挙動に基づいてアサーションを追加
    expect(screen.getByText('北海道')).toBeInTheDocument()
  })
})
