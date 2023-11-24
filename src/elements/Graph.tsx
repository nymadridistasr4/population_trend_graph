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
  graphType: 'total' | 'young' | 'productive' | 'elderly'
}

// 選んだ都道府県の人口推移グラフを表示するコンポーネント
const Graph: React.FC<Props> = ({ populationdata, graphType }) => {
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

  // グラフのタイトルと縦軸ラベルを種類に応じて設定
  let title = ''
  let yAxisLabel = ''

  switch (graphType) {
    case 'total':
      title = '総人口推移'
      yAxisLabel = '総人口数'
      break
    case 'young':
      title = '年少人口推移'
      yAxisLabel = '年少人口数'
      break
    case 'productive':
      title = '生産年齢人口推移'
      yAxisLabel = '生産年齢人口数'
      break
    case 'elderly':
      title = '老年人口推移'
      yAxisLabel = '老年人口数'
      break
    default:
      break
  }

  // Highcharts グラフのオプション
  const options: Highcharts.Options = {
    title: {
      text: title,
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories,
    },
    yAxis: {
      title: {
        text: yAxisLabel,
      },
    },
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
