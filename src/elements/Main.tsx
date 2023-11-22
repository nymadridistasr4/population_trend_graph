import React, { useEffect, useState } from 'react'
import CheckField from './Check'
import Graph from './Graph'
import axios from 'axios'

// スタイルの定義
const Styles: { [key: string]: React.CSSProperties } = {
  label: {
    fontSize: '20px',
    padding: '0.5rem 2rem',
    borderLeft: '4px solid #000',
    marginLeft: '10pt',
  },
}

const Main: React.FC = () => {
  // 都道府県データのステート
  const [prefectures, setPreFectures] = useState<{
    message: null
    result: {
      prefCode: number
      prefName: string
    }[]
  } | null>(null)

  // 選択中の都道府県
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null
  )

  // 選択中の都道府県の人口データ
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])

  // 初回レンダリング時に都道府県データを取得
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

  // チェックボックスが変更された時のハンドラ
  const handleCheckboxChange = async (
    prefName: string,
    prefCode: number,
    checked: boolean
  ) => {
    if (checked) {
      // チェックされたら選択中の都道府県を更新
      setSelectedPrefecture(prefName)

      try {
        // 人口データを取得し、新しく選択された都道府県のデータを追加
        const response = await axios.get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
          }
        )
        setPrefPopulation((prevPopulation) => [
          ...prevPopulation,
          { prefName, data: response.data.result.data[0].data },
        ])
      } catch (error) {
        console.error('Error fetching population data:', error)
      }
    } else {
      // チェックが外れた場合は対象の都道府県データを削除
      setPrefPopulation((prevPopulation) =>
        prevPopulation.filter((p) => p.prefName !== prefName)
      )
    }
  }

  return (
    <main>
      <h2 style={Styles.label}>都道府県</h2>
      {prefectures && (
        <>
          {/* チェックボックスコンポーネント */}
          <CheckField
            prefectures={prefectures.result}
            onChange={handleCheckboxChange}
          />
          {/* 選択された全ての都道府県のグラフを表示 */}
          {prefPopulation.length > 0 && (
            <Graph populationdata={prefPopulation} />
          )}
        </>
      )}
    </main>
  )
}

export default Main
