import React from 'react';
import '../css/mainPage.css';
import RecentPage from "../components/recentPage";

const App = () => {
  return (
    <div className="container">

      <h1 className="head">Global Hunger Index</h1>
      <br></br>
      <div className="explain">
        <h3><strong>GHI란</strong></h3>
        <p>
          전 세계, 지역 및 국가 수준에서 기아를 종합적으로 측정하고 추적하기 위해 설계된 도구로, 기아의 여러 차원을 시간 경과에 따라 반영합니다.<br />
          GHI는 기아와의 싸움에 대한 인식과 이해를 높이고, 국가 및 지역 간의 기아 수준을 비교할 수 있는 방법을 제공하며,<br />
          기아 수준이 가장 높은 지역과 기아를 근절하기 위한 추가적인 노력이 가장 필요한 지역에 주목하도록 하는 것을 목표로 합니다.
        </p>
      </div>
      <br></br>
      <div className="split_section">
        <div className="left_section">
          <h3 className="center">GHI를 계산하기 위해</h3>
          <p className="center">
            각 국가의 GHI 점수는 기아의 다차원적 특성을 포괄적으로 반영하는 네 가지 지표를 결합한 공식을 기반으로 계산됩니다.
          </p>

          <div className="flex_container">
            <img src="/icon/bowl.png" alt="Sample" className="image" />
            <div>
              <p><strong>1. Undernourishment:</strong></p>
              <p>칼로리 섭취량이 부족한 인구 비율.</p>
            </div>
          </div>

          <div className="flex_container">
            <img src="/icon/height.png" alt="Sample" className="image" />
            <div>
              <p><strong>2. Child stunting:</strong></p>
              <p>5세 미만 어린이 중 연령에 비해 키가 작은 비율.</p>
            </div>
          </div>

          <div className="flex_container">
            <img src="/icon/scale.png" alt="Sample" className="image" />
            <div>
              <p><strong>3. Child wasting:</strong></p>
              <p>5세 미만 어린이 중 키에 비해 체중이 적은 비율.</p>
            </div>
          </div>

          <div className="flex_container">
            <img src="/icon/coffin.png" alt="Sample" className="image" />
            <div>
              <p><strong>4. Child mortality:</strong></p>
              <p>5세 생일 이전에 사망하는 어린이의 비율.</p>
            </div>
          </div>
        </div>

        <div className="right_section">
          <h3 className="center">GHI Severity Scale</h3>
          <p className="center">각 국가의 GHI Score의 위험도는 5단계로 나뉩니다.</p>
          <table className="table">
            <tr>
              <td className="even">GHI SCORE</td>
              <td className="even">DANGER</td>
            </tr>
            <tr>
              <td className="odd">0 ~ 9.9</td>
              <td className="odd">LOW</td>
            </tr>
            <tr>
              <td className="even">10.0 ~ 19.9</td>
              <td className="even">MODERATE</td>
            </tr>
            <tr>
              <td className="odd">20.0 ~ 34.9</td>
              <td className="odd">SERIOUS</td>
            </tr>
            <tr>
              <td className="even">35.0 ~ 49.9</td>
              <td className="even">ALARMING</td>
            </tr>
            <tr>
              <td className="odd">50.0 ~ 100</td>
              <td className="odd">EXTREMELY ALARMING</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="calculate">
        <p>GHI 계산방법</p>
        <p>Undernourishment/3 + Child stunting/6 + Child wasting/6 + Child mortality/3 = GHI SCORE</p>
      </div>
      <div>
        <table>
          <tr>

            <td className="table_cell_foot">
              <strong>Undernourishment</strong><br />
              불충분한 식량 접근성을 측정하는, 중요한 지표 <br />
              어린이와 성인을 포함한 전체 인구를 지칭<br />
              국제적인 기아 목표를 위한 주요 지표로 사용
            </td>
            <td className="table_cell_foot">
            <strong>Child stunting & Child wasting</strong> <br />
              칼로리 가용성을 넘어, 식단의 질과 활용 측면을 고려<br />
              어린이의 영양 결핍에 대한 특별한 취약성을 반영<br />
              지속가능발전목표를 위한 영양 지표로 사용
            </td>
            <td className="table_cell_foot">
            <strong>Child mortality</strong><br />
              사망이 굶주림에 어린이가 가장 취약하다는 점을 반영<br />
              발육부진과 소모증은 영양실조로 인한 사망 위험을 부분적으로만 반영<br />
            </td>

          </tr>
        </table>
      </div>
      <div className='lastExplain'>
        <p style={{ fontSize: '20px' }}><strong>기아란?</strong></p>
        <p> &nbsp;기아 문제는 복잡하며, 이를 설명하기 위해 다양한 용어가 사용됩니다. <br></br>
          &nbsp;기아는 보통 충분한 칼로리를 섭취하지 못해 발생하는 고통을 의미합니다.
          유엔 식량농업기구는 식량 부족 또는 영양부족을, 개인이 건강하고 생산적인 삶을 유지하기 위해 필요한 최소한의 에너지조차 제공하지 못하는 상태로 정의합니다.
          이는 성별, 나이, 신장, 신체 활동 수준에 따라 달라질 수 있습니다.
          <br></br>
          &nbsp;영양실조는 칼로리 부족을 넘어, 에너지, 단백질, 필수 비타민과 미네랄의 결핍을 포함합니다.
          이는 음식의 양이나 질이 부족하거나, 감염이나 질병으로 인해 체내에서 영양소를 제대로 활용하지 못하는 경우에 발생합니다.

          가정 내 식량 불안정, 부적절한 모성 건강 관리 및 육아 방식, 안전한 물과 위생 시설 부족, 의료 서비스 접근성 부족 등 다양한 근본적인 요인에서 기인합니다.
          <br></br>
          &nbsp;영양불균형은 영양실조와 과영양을 모두 포함합니다.
          과영양은 과체중, 비만, 비전염성 질병을 초래하며, 이는 전 세계적으로 점점 더 흔해지고 있습니다.
          이러한 문제는 건강, 정부 지출, 식량 체계 발전에도 영향을 미칩니다.
          GHI(Global Hunger Index)는 과영양보다는 주로 영양실조와 관련된 문제에 초점을 맞춥니다.
          <br></br>
          &nbsp;이 외 기아를 설명하기 위해 많은 용어들이 사용됩니다.</p>
          <br></br>
        <hr></hr>
        <br></br>
        <p style={{ fontSize: '20px' }}><strong>국가별 불완전한 데이터</strong></p>
        <p> &nbsp; 일부 국가에서는 다양한 이유로 GHI 점수를 계산하기에 충분한 데이터를 확보하지 못하기도 합니다. 이러한 경우  데이터 부족 문제를 해결하고, 해당 국가들의 기아 상황을 예비적으로 파악하기 위해 여러 알려진 요인들을 기반으로 GHI를 임시로 지정합니다.<br></br>
          &nbsp;고려되는 요인으로는는<br></br>
          1. 이용 가능한 GHI 지표 값<br></br>
          2. 국가의 마지막으로 알려진 GHI 심각도<br></br>
          3. 국가의 마지막으로 알려진 영양부족 유병률<br></br>
          4. 해당 국가가 속한 아지역의 영양부족 유병률<br></br>
          5. 유엔 식량농업기구의 평가<br></br>가 있습니다. <br></br>

        &nbsp; 일부 국가에서 데이터가 누락되는 이유로는 폭력적 분쟁이나 정치적 불안, 전쟁 등의 이유가 있으며 데이터가 누락된 국가들은 대체로 가장 심각한 기아 문제를 겪고 있을 가능성이 큽니다.</p>
      </div>
      <RecentPage></RecentPage>
    </div >
  );
};

export default App;