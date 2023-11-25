import React from 'react'

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
  }[]
  onChange: (name: string, prefCode: number, check: boolean) => void
}

// スタイル定義
const Styles: { [key: string]: React.CSSProperties } = {
  checkcardList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start',
    justifySelf: 'auto',
  },
  text: { display: 'contents', marginLeft: '1em', cursor: 'pointer' },
  checkcard: {
    borderRadius: '24px',
    border: 'solid 2px',
    textAlign: 'center',
    padding: '4px',
    margin: '0.5rem',
  },
}

// 都道府県一覧のチェックボックスを表示するコンポーネント
const Check: React.FC<Props> = ({ prefectures = [], onChange }) => {
  return (
    <>
      {/* チェックボックスリスト */}
      <div style={Styles.checkcardList}>
        {prefectures.map(({ prefName, prefCode }) => (
          <div style={Styles.checkcard} key={prefName}>
            {/* チェックボックス */}
            <input
              type="checkbox"
              name="Prefecture name"
              onChange={(event) =>
                onChange(prefName, prefCode, event.target.checked)
              }
              id={'checkbox' + prefCode}
            />
            {/* チェックボックスラベル */}
            <label style={Styles.text} htmlFor={'checkbox' + prefCode}>
              {/* 長さが3の場合、全角スペースを追加 */}
              {prefName.length === 3 && '　'} {prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}

export default Check
