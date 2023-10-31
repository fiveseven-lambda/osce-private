import * as React from 'react';
import _ from 'lodash';
import './App.css';

const patients_family = ["佐藤", "鈴木", "山田", "山梨", "田中", "高橋"]
const patients_name = ["太郎", "一郎", "花子"]
const vitalsign = ["体温の測定", "呼吸（所見を述べてください。）", "橈骨動脈の触診（所見を述べてください。）", "上肢の血圧測定（触診法）", "上肢の血圧測定（聴診法）", "足背動脈の触診", "後脛骨動脈の触診", "膝窩動脈の触診", "下腿の浮腫"]
const headAndNeck = ["頭", "眼", "耳", "鼻・副鼻腔", "口唇・口腔・咽頭", "唾液腺", "頭頸部リンパ節", "甲状腺"]
const chest = ["頸部血管", "前胸部の視診", "心臓", "肺(前胸部)", "肺(背部)"]
const abdomen = ["視診", "聴診", "腹部全体の打診", "肝臓の打診", "脾臓の打診", "浅い触診", "深い触診", "肝臓の触診", "脾臓の触診"]
const nerve = ["視野", "眼球運動・眼振", "瞼裂・瞳孔／対光反射", "眼底", "顔面の感覚", "顔面筋", "軟口蓋・咽頭後壁の動き", "舌", "胸鎖乳突筋", "上半身の不随意運動", "Barre徴候", "筋トーヌス", "鼻指鼻試験", "手回内・回外試験", "三角筋", "上腕二頭筋", "手根伸筋群", "通常歩行", "つぎ足歩行", "Romberg試験", "踵膝試験", "腸腰筋", "前脛骨筋", "四肢の触覚", "下顎反射", "上腕二頭筋反射", "上腕三頭筋反射", "膝蓋腱反射", "アキレス腱反射", "Babinski徴候", "項部硬直", "認知機能の診察"]
const orthopedics = ["上肢全体の視診と触診（所見を評価者に述べる）", "上肢の関節の視診と触診（所見を評価者に述べる）", "上肢の可動域（所見を述べなくてよい）", "下肢全体の視診と触診（所見を評価者に述べる）", "下肢の関節の視診と触診（所見を評価者に述べる）", "下肢の可動域（所見を述べなくてよい）", "頚椎の姿勢（所見を評価者に述べる）", "頚椎の可動域（所見を述べなくてよい）", "胸腰椎の姿勢（所見を評価者に述べる）", "胸腰椎の可動域（所見を述べなくてよい）", "下肢伸展挙上試験"]
const stations = ["バイタルサイン", "頭頸部", "四肢と脊柱", "胸部", "腹部", "神経", "その他"]

function question(selectedStation) {
  let reply = Array(<p>共用試験OSCE課題</p>);
  const selectedStationIndices = selectedStation.flatMap((selected, index) => selected ? [index] : [])
  if(selectedStationIndices.length == 0) { return '領域が選択されていません'; }
  const selectedStationIndex = _.sample(selectedStationIndices)
  reply.push(<p>---{stations[selectedStationIndex]}---</p>);
  switch(selectedStationIndex){
    case 0: // バイタルサイン
      reply.push(<ul> {
        _.shuffle(vitalsign)
        .slice(0, 5)
        .map((item, index) => <li key={index}>{item}</li>)
      } </ul>)
      break
    case 1: // 頭頸部
      reply.push(<ul> {
        _.shuffle(headAndNeck)
        .slice(0, 5)
        .map((item, index) => <li key={index}>{item}</li>)
      } </ul>)
      reply.push(<p>＊所見を評価者に述べる必要はありません。</p>);
      break
    case 2: // 四肢と脊柱
      reply.push(<ul> {
        _.shuffle(orthopedics)
        .slice(0, 3)
        .map((item, index) => <li key={index}>{item}</li>)
      } </ul>)
      break
    case 3: // 胸部
      reply.push(<ul> {
        _.shuffle(chest)
        .slice(0, 3)
        .map((item, index) => <li key={index}>{item}</li>)
      } </ul>)
      break
    case 4: // 腹部
      reply.push(<ul> {
        _.shuffle(abdomen)
        .slice(0, 3)
        .map((item, index) => <li key={index}>{item}</li>)
      } </ul>)
      reply.push(<p>＊視診は所見を評価者に述べながら行ってください。</p>)
      reply.push(<p>＊視診以外の所見を評価者に述べる必要はありません。</p>)
      break
    case 5: // 神経
      reply.push(<ul> {
        _.shuffle(nerve)
        .slice(0, 8)
        .map((item, index) => <li key={index}>{item}</li>)
      } </ul>)
      reply.push(<p>＊所見を評価者に述べる必要はありません。</p>);
      break
    case 6: // その他
      const other_num = _.random(0, 2);
      if(other_num == 0){
        const draw_blood = _.random(0, 1)
        reply.push(<p> 基本的臨床手技 </p>)
        reply.push(<ul>
          <li>手袋の着用</li>
          <li>上肢の静脈から必要量を採血
            { draw_blood === 0 ? "（真空採血管ホルダーを用いて）" : "（シリンジを用いて）" }
          </li>
          <li>使用済み物品の廃棄</li>
          <li>処置後、速乾性消毒薬による手指消毒</li>
        </ul>)
        reply.push(<p> ＊事前に、あなたが採血を行う承諾を得ています。 </p>)
      }else if(other_num == 1){
        reply.push(<p> 救急 </p>)
        reply.push(<p> 患者：氏名不詳　40歳ぐらい　男性 </p>)
        reply.push(<p> ここは病院の売店の前です。 </p>)
        reply.push(<p> 目の前で40歳ぐらいの男性が倒れました。 </p>)
        reply.push(<p> 人形（シミュレータ）をその男性とみなして、下記項目の処置を行ってください。 </p>)
        reply.push(<p> 制限時間は５分間です。 </p>)
        reply.push(<p> ・心肺蘇生法 </p>)
        reply.push(<p> ＊評価者から伝えられる状況設定や指示に従って処置を進めてください。 </p>)
        reply.push(<p> ＊患者さんの所見は評価者が告げます。 </p>)
        reply.push(<p> ＊評価者が病院職員役、医師役をします。 </p>)
        reply.push(<p> ＊あなたは手袋のみを持っています。" </p>)
      }else if(other_num == 2){
        reply.push(<p>感染対策</p>)
        reply.push(<p>下記の項目を行ってください。</p>)
        reply.push(<p>制限時間は５分間です。</p>)
        reply.push(<ul>
          <li> 流水による衛生的手洗い </li>
          <li> PPEの着脱と廃棄（エプロン・ガウン、マスク、帽子、アイプロテクション、手袋について） </li>
        </ul>)
      }
  }
  return <div> { reply } </div>;
}

function App() {
  const [selectedStation, setSelectedStation] = React.useState(Array(stations.length).fill(false));
  const [text, setText] = React.useState('');
  return <div>
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
      <button onClick={() => setText(question(selectedStation))}>
        生成
      </button>
    </div>
    <div>
      { text }
    </div>
  </div>
}

export default App;
