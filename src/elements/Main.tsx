import React, { useEffect, useState } from 'react'
import CheckField from './Check'
import axios from 'axios'

// スタイル定義
const Styles: { [key: string]: React.CSSProperties } = {
  graph: {
    padding: '10px',
  },
  label: {
    fontSize: '20px',
    padding: '0.5rem 2rem',
    borderLeft: '4px solid #000',
    marginLeft: '10pt',
  },
}

// メインコンポーネント
const Main: React.FunctionComponent = () => {
  // 都道府県一覧と人口データの状態管理
  const [prefectures, setPreFectures] = useState<{
    message: null
    result: {
      prefCode: number
      prefName: string
    }[]
  } | null>(null)

  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])

  // 非同期処理を含むEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios.get(
          'https://opendata.resas-portal.go.jp/api/v1/prefectures',
          {
            headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
          }
        )
        setPreFectures(results.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // チェックボックスクリック時の処理
  const handleCheckboxChange = (
    prefName: string,
    prefCode: number,
    checked: boolean
  ) => {
    // チェックがついた場合の処理
    if (checked) {
      // ここにチェックがついたときの処理
    }
  }

  return (
    <main>
      {/* ラベル */}
      <h2 style={Styles.label}>都道府県</h2>
      {/* チェックボックスフィールド */}
      {prefectures && (
        <CheckField
          prefectures={prefectures.result}
          onChange={handleCheckboxChange}
        />
      )}
    </main>
  )
}

export default Main
