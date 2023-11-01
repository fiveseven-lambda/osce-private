import * as React from 'react';
import _ from 'lodash';
import './App.css';

// const patients_family = ["佐藤", "鈴木", "山田", "山梨", "田中", "高橋"]
// const patients_name = ["太郎", "一郎", "花子"]
const headAndNeck = ["頭", "眼", "耳", "鼻・副鼻腔", "口唇・口腔・咽頭", "唾液腺", "頭頸部リンパ節", "甲状腺"]
const abdomen = ["視診", "聴診", "腹部全体の打診", "肝臓の打診", "脾臓の打診", "浅い触診", "深い触診", "肝臓の触診", "脾臓の触診"]
const nerve = ["視野", "眼球運動・眼振", "瞼裂・瞳孔／対光反射", "眼底", "顔面の感覚", "顔面筋", "軟口蓋・咽頭後壁の動き", "舌", "胸鎖乳突筋", "上半身の不随意運動", "Barre徴候", "筋トーヌス", "鼻指鼻試験", "手回内・回外試験", "三角筋", "上腕二頭筋", "手根伸筋群", "通常歩行", "つぎ足歩行", "Romberg試験", "踵膝試験", "腸腰筋", "前脛骨筋", "四肢の触覚", "下顎反射", "上腕二頭筋反射", "上腕三頭筋反射", "膝蓋腱反射", "アキレス腱反射", "Babinski徴候", "項部硬直", "認知機能の診察"]
const orthopedics = ["上肢全体の視診と触診（所見を評価者に述べる）", "上肢の関節の視診と触診（所見を評価者に述べる）", "上肢の可動域（所見を述べなくてよい）", "下肢全体の視診と触診（所見を評価者に述べる）", "下肢の関節の視診と触診（所見を評価者に述べる）", "下肢の可動域（所見を述べなくてよい）", "頚椎の姿勢（所見を評価者に述べる）", "頚椎の可動域（所見を述べなくてよい）", "胸腰椎の姿勢（所見を評価者に述べる）", "胸腰椎の可動域（所見を述べなくてよい）", "下肢伸展挙上試験"]
const stations = ["全身状態とバイタルサイン", "頭頸部", "胸部", "腹部", "神経", "四肢と脊柱", "その他"]

function question(selectedStation) {
  let key = 0;
  let reply = Array(<p key={key++}>共用試験OSCE課題</p>);
  const selectedStationIndices = selectedStation.flatMap((selected, index) => selected ? [index] : [])
  if(selectedStationIndices.length === 0) { return '領域が選択されていません'; }
  const selectedStationIndex = _.sample(selectedStationIndices)
  reply.push(<p key={key++}>―{stations[selectedStationIndex]}―</p>);
  switch(selectedStationIndex){
    case 0: // バイタルサイン
      if(_.random(0, 1) === 0){
        reply.push(
          <p key={key++}><u>座位</u>で下記の項目の診察を行ってください。</p>,
          <p key={key++}>制限時間は5分間です。</p>,
          <ul className='itemize' key={key++}> {
            _.shuffle([
              <li key='0'>体温の測定</li>,
              <li key='1'>呼吸
                <ul>
                  <li>呼吸の観察</li>
                  <li>呼吸数の測定</li>
                  {_.random(0, 1) === 0 && <li>経皮的動脈血酸素飽和度の測定</li>}
                </ul>
              </li>,
              <li key='2'>橈骨動脈の触診</li>,
              <li key='3'>上肢の血圧測定
                <ul><li>触診法で片側1回</li><li>聴診法で片側1回</li></ul>
              </li>,
            ])
          } </ul>,
        )
      }else{
        reply.push(
          <p key={key++}><u>仰臥位</u>で下記の項目の診察を行ってください。</p>,
          <p key={key++}>制限時間は5分間です。</p>,
          <ul className='itemize' key={key++}> {
            _.shuffle([
              <li key='0'>橈骨動脈の触診</li>,
              <li key='1'>上肢の血圧測定
                <ul><li>触診法で片側1回</li><li>聴診法で片側1回</li></ul>
              </li>,
              <li key='2'>足背動脈の触診</li>,
              <li key='3'>後脛骨動脈の触診</li>,
              <li key='4'>膝窩動脈の触診</li>,
              <li key='5'>下腿・足背の浮腫</li>,
            ]).slice(0, 5)
          } </ul>,
        )
      }
      break
    case 1: // 頭頸部
      reply.push(
        <p key={key++}>下記の項目の診察を行ってください。</p>,
        <p key={key++}>制限時間は5分間です。</p>,
        <ul className='itemize' key={key++}> {
          _.shuffle(headAndNeck)
          .slice(0, 5)
          .map((item, index) => <li key={index}>{item}</li>)
        } </ul>,
        <p key={key++}>＊所見を評価者に述べる<u>必要はありません。</u></p>
      )
      break
    case 2: // 胸部
      if(_.random(0, 1) === 0){
        reply.push(
          <p key={key++}><u>仰臥位</u>で下記の項目の診察を行ってください。</p>,
          <p key={key++}>制限時間は5分間です。</p>,
          <ul className='itemize' key={key++}> {
            _.shuffle([
              <li key='0'>頸部血管（視診・聴診・触診）</li>,
              <li key='1'>前胸部の視診</li>,
              <li key='2'>心臓<ul>
                <li>視診</li>
                <li>触診</li>
                <li>聴診</li>
              </ul></li>,
              <li key='3'>肺（前胸部）<ul>
                <li>打診</li>
                <li>聴診</li>
              </ul></li>,
            ]).slice(0, 3)
          } </ul>,
        )
      }else{
        reply.push(
          <p key={key++}><u>座位</u>で下記の項目の診察を行ってください。</p>,
          <p key={key++}>制限時間は5分間です。</p>,
          <ul className='itemize' key={key++}> {
            _.shuffle([
              <li key='0'>頸部血管（視診・聴診・触診）</li>,
              <li key='1'>前胸部の視診</li>,
              <li key='2'>心臓<ul>
                <li>視診</li>
                <li>触診</li>
                <li>聴診</li>
              </ul></li>,
              <li key='3'>肺（前胸部）<ul>
                <li>打診</li>
                <li>聴診</li>
              </ul></li>,
              <li key='4'>肺（背部）<ul>
                <li>視診</li>
                <li>打診</li>
                <li>聴診</li>
              </ul></li>,
            ]).slice(0, 3)
          } </ul>,
        )
      }
      break
    case 3: // 腹部
      reply.push(
        <p key={key++}>下記の項目の診察を<u>仰臥位で</u>始めてください。</p>,
        <p key={key++}>制限時間は5分間です。</p>,
        <ul className='itemize' key={key++}> {
          _.shuffle(abdomen)
          .slice(0, 5)
          .map((item, index) => <li key={index}>{item}</li>)
        } </ul>,
        <p key={key++}>＊視診は所見を評価者に述べながら行ってください。</p>,
        <p key={key++}>＊視診以外の所見を評価者に述べる必要はありません。</p>,
      )
      break
    case 4: // 神経
      reply.push(
        <p key={key++}>下記の項目の神経診察を行ってください。</p>,
        <p key={key++}>制限時間は5分間です。</p>,
        <ul className='itemize' key={key++}> {
          _.shuffle(nerve)
          .slice(0, 8)
          .map((item, index) => <li key={index}>{item}</li>)
        } </ul>,
        <p key={key++}>＊所見を評価者に述べる必要はありません。</p>,
      )
      break
    case 5: // 四肢と脊柱
      reply.push(
        <p key={key++}>下記の項目の診察を行ってください。</p>,
        <p key={key++}>制限時間は5分です。</p>,
        <ul className='itemize' key={key++}> {
          _.shuffle(orthopedics)
          .slice(0, 3)
          .map((item, index) => <li key={index}>{item}</li>)
        } </ul>,
      )
      break
    default: // その他
      const other_num = _.random(0, 2);
      if(other_num === 0){
        const draw_blood = _.random(0, 1)
        reply.push(
          <p key={key++}> 基本的臨床手技 </p>,
          <ul className='itemize' key={key++}>
            <li>手袋の着用</li>
            <li>上肢の静脈から必要量を採血
              { draw_blood === 0 ? "（真空採血管ホルダーを用いて）" : "（シリンジを用いて）" }
            </li>
            <li>使用済み物品の廃棄</li>
            <li>処置後、速乾性消毒薬による手指消毒</li>
          </ul>,
          <p key={key++}> ＊事前に、あなたが採血を行う承諾を得ています。 </p>
        )
      }else if(other_num === 1){
        reply.push(
          <p key={key++}> 救急 </p>,
          <p key={key++}> 患者：氏名不詳　40歳ぐらい　男性 </p>,
          <p key={key++}> ここは病院の売店の前です。 </p>,
          <p key={key++}> 目の前で40歳ぐらいの男性が倒れました。 </p>,
          <p key={key++}> 人形（シミュレータ）をその男性とみなして、下記項目の処置を行ってください。 </p>,
          <p key={key++}> 制限時間は５分間です。 </p>,
          <p key={key++}> ・心肺蘇生法 </p>,
          <p key={key++}> ＊評価者から伝えられる状況設定や指示に従って処置を進めてください。 </p>,
          <p key={key++}> ＊患者さんの所見は評価者が告げます。 </p>,
          <p key={key++}> ＊評価者が病院職員役、医師役をします。 </p>,
          <p key={key++}> ＊あなたは手袋のみを持っています。 </p>,
        )
      }else if(other_num === 2){
        reply.push(
          <p key={key++}>感染対策</p>,
          <p key={key++}>下記の項目を行ってください。</p>,
          <p key={key++}>制限時間は５分間です。</p>,
          <ul className='itemize' key={key++}>
            <li> 流水による衛生的手洗い </li>
            <li> PPEの着脱と廃棄（エプロン・ガウン、マスク、帽子、アイプロテクション、手袋について） </li>
          </ul>,
        )
      }
  }
  return <div> { reply } </div>;
}

function App() {
  const [selectedStation, setSelectedStation] = React.useState(Array(stations.length).fill(false));
  const [text, setText] = React.useState('');
  return <div className='app'>
    <div>
      {
        stations.map((station, station_index) => 
          <label key={station_index}>
            <input
              type='checkbox'
              checked={selectedStation[station_index]}
              onChange={
                e => {
                  setSelectedStation(
                    selectedStation.map((station, index) => (index === station_index ? e.target.checked : station))
                  )
                }
              }
            />
            { station }
          </label>
        )
      }
    </div>
    <div>
      <button onClick={e => setSelectedStation(Array(stations.length).fill(true))}>
        全て選択
      </button>
      <button onClick={e => setSelectedStation(Array(stations.length).fill(false))}>
        全て選択解除
      </button>
    </div>
    <div>
      <button
        onClick={() => setText(question(selectedStation))}
        className='gen-button'
      >
        生成
      </button>
    </div>
    <div className='text'>
      { text }
    </div>
  </div>
}

export default App;
