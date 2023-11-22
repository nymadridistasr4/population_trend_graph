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
  toggleButton: {
    margin: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
}

// 人口データの種類を切り替えるボタンのスタイル
const buttonStyle: React.CSSProperties = {
  margin: '10px',
  padding: '5px 10px',
  cursor: 'pointer',
}

// 選択されているボタンのスタイル
const selectedButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#3498db', // 例: 選択されているボタンの背景色
  color: '#fff', // 例: 選択されているボタンの文字色
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

  // 選択中の都道府県の人口データ (総人口)
  const [totalPopulation, setTotalPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])

  // 選択中の都道府県の人口データ (年少人口)
  const [youngPopulation, setYoungPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])

  // 選択中の都道府県の人口データ (生産年齢人口)
  const [productivePopulation, setProductivePopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])

  // 選択中の都道府県の人口データ (老年人口)
  const [elderlyPopulation, setElderlyPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])

  // 表示する人口データの種類
  const [selectedPopulationType, setSelectedPopulationType] = useState<
    'total' | 'young' | 'productive' | 'elderly'
  >('total')

  // 初回レンダリング時に都道府県データを取得
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get(
        'https://opendata.resas-portal.go.jp/api/v1/prefectures',
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
        }
      )
      setPreFectures(results.data)
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

      // 総人口データを取得し、新しく選択された都道府県のデータを追加
      const totalResponse = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
        }
      )
      setTotalPopulation((prevPopulation) => [
        ...prevPopulation,
        { prefName, data: totalResponse.data.result.data[0].data },
      ])

      // 年少人口データを取得し、新しく選択された都道府県のデータを追加
      const youngResponse = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-&gender=1&generation=0-9`,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
        }
      )
      setYoungPopulation((prevPopulation) => [
        ...prevPopulation,
        { prefName, data: youngResponse.data.result.data[1].data },
      ])

      // 生産年齢人口データを取得し、新しく選択された都道府県のデータを追加
      const productiveResponse = await axios.get(
        // 生産年齢人口のリクエストパラメータを追加
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-&gender=1&generation=15-64`,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
        }
      )
      setProductivePopulation((prevPopulation) => [
        ...prevPopulation,
        { prefName, data: productiveResponse.data.result.data[2].data },
      ])

      // 老年人口データを取得し、新しく選択された都道府県のデータを追加
      const elderlyResponse = await axios.get(
        // 老年人口のリクエストパラメータを追加
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-&gender=1&generation=65-`,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
        }
      )
      setElderlyPopulation((prevPopulation) => [
        ...prevPopulation,
        { prefName, data: elderlyResponse.data.result.data[3].data },
      ])
    } else {
      // チェックが外れた場合は対象の都道府県データを削除
      setTotalPopulation((prevPopulation) =>
        prevPopulation.filter((p) => p.prefName !== prefName)
      )
      setYoungPopulation((prevPopulation) =>
        prevPopulation.filter((p) => p.prefName !== prefName)
      )
      setProductivePopulation((prevPopulation) =>
        prevPopulation.filter((p) => p.prefName !== prefName)
      )
      setElderlyPopulation((prevPopulation) =>
        prevPopulation.filter((p) => p.prefName !== prefName)
      )
    }
  }

  // 人口データの種類を切り替えるハンドラ
  const handlePopulationTypeChange = (
    type: 'total' | 'young' | 'productive' | 'elderly'
  ) => {
    setSelectedPopulationType(type)
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
          {/* 人口データの種類を切り替えるボタン */}
          <div>
            <button
              style={
                selectedPopulationType === 'total'
                  ? selectedButtonStyle
                  : buttonStyle
              }
              onClick={() => handlePopulationTypeChange('total')}
            >
              総人口
            </button>
            <button
              style={
                selectedPopulationType === 'young'
                  ? selectedButtonStyle
                  : buttonStyle
              }
              onClick={() => handlePopulationTypeChange('young')}
            >
              年少人口
            </button>
            <button
              style={
                selectedPopulationType === 'productive'
                  ? selectedButtonStyle
                  : buttonStyle
              }
              onClick={() => handlePopulationTypeChange('productive')}
            >
              生産年齢人口
            </button>
            <button
              style={
                selectedPopulationType === 'elderly'
                  ? selectedButtonStyle
                  : buttonStyle
              }
              onClick={() => handlePopulationTypeChange('elderly')}
            >
              老年人口
            </button>
          </div>
          {/* 選択された都道府県のグラフを表示 */}
          {selectedPopulationType === 'total' && totalPopulation.length > 0 && (
            <Graph populationdata={totalPopulation} graphType="total" />
          )}
          {selectedPopulationType === 'young' && youngPopulation.length > 0 && (
            <Graph populationdata={youngPopulation} graphType="young" />
          )}
          {selectedPopulationType === 'productive' &&
            productivePopulation.length > 0 && (
              <Graph
                populationdata={productivePopulation}
                graphType="productive"
              />
            )}
          {selectedPopulationType === 'elderly' &&
            elderlyPopulation.length > 0 && (
              <Graph populationdata={elderlyPopulation} graphType="elderly" />
            )}
        </>
      )}
    </main>
  )
}

export default Main
