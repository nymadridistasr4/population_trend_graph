import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// スタイルの定義
const Styles = {
  graph: {
    padding: '12px',
  },
}

// コンポーネントのプロパティの型定義
type Props = {
  populationdata: {
    prefName: string
    data: { year: number; value: number }[]
  }[]
}

// 選んだ都道府県の人口推移グラフを表示するコンポーネント
const Graph: React.FC<Props> = ({ populationdata }) => {
  // グラフのデータとカテゴリを保持するための配列
  const series: Highcharts.SeriesOptionsType[] = []
  const categories: string[] = []

  // 選択された都道府県ごとにグラフデータを整形
  for (const p of populationdata) {
    const data: number[] = []

    // 年ごとのデータを取得
    for (const pd of p.data) {
      data.push(pd.value)
      categories.push(String(pd.year))
    }

    // シリーズに追加
    series.push({
      type: 'line',
      name: p.prefName,
      data,
    })
  }

  // Highcharts グラフのオプション
  const options: Highcharts.Options = {
    title: {
      text: '総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: 'line', name: '都道府県名', data: [] }]
        : series,
  }

  // HighchartsReact コンポーネントを使ってグラフを描画
  return (
    <div style={Styles.graph}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Graph
