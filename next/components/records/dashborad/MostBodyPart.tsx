import { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const data = [
  { name: "손목", value: 400, records: 7, visits: 2 },
  { name: "무릎", value: 300, records: 7, visits: 2 },
  { name: "어깨", value: 300, records: 7, visits: 2 },
  { name: "팔", value: 200, records: 7, visits: 2 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy - 35} dy={8} textAnchor="middle" fill={"#363CBF"} fontSize={"21px"} fontWeight={600}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={"#363CBF"} fontSize={"15px"}>
        증상기록 {payload.records}건
      </text>
      <text x={cx} y={cy + 40} dy={8} textAnchor="middle" fill={"#363CBF"} fontSize={"15px"}>
        병원방문 {payload.visits}건
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#5359E9"}
      />
    </g>
  );
};

const SiteChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <RechartContainer>
      <RechartHeader>가장 많은 기록을 남긴 부위는 손목이에요</RechartHeader>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          cx={200}
          cy={200}
          innerRadius={103}
          outerRadius={140}
          fill="#D9DEFF"
          paddingAngle={5}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
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

export default SiteChart;
