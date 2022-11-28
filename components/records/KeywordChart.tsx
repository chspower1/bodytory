import { Treemap } from "recharts";
import styled from "styled-components";

const data = [
  { name: "통증", size: 50 },
  { name: "어지러움", size: 20 },
  { name: "저릿저릿함", size: 30 },
  { name: "메스꺼움", size: 90 },
  { name: "화상", size: 60 },
];

const COLORS = ["#8889DD", "#9597E4", "#8DC77B", "#A5D297", "#E2CF45"];

const CustomKeyword = (props: any) => {
  const { x, y, width, height, colors, name, index } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index],
          stroke: "#fff",
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
        {name}
      </text>
    </g>
  );
};

const KeywordChart = () => {
  return (
    <RechartContainer>
      <RechartHeader>가장 많이 기록괸 키워드는 {data[0].name} 이에요</RechartHeader>
      <TreemapBox>
        <Treemap
          data={data}
          width={360}
          height={360}
          dataKey={"size"}
          stroke={"#fff"}
          content={<CustomKeyword colors={COLORS} />}
        ></Treemap>
      </TreemapBox>
    </RechartContainer>
  );
};

const RechartContainer = styled.div`
  width: 510px;
  height: 460px;

  background: #ffffff;
  box-shadow: 8px 8px 18px rgba(32, 36, 120, 0.3);
  border-radius: 40px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RechartHeader = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 60px;
  /* identical to box height, or 333% */

  text-align: center;

  color: #2b2d64;
`;

const TreemapBox = styled.div`
  border-radius: 20px;
  overflow: hidden;
`;

export default KeywordChart;
