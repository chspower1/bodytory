import { useEffect, useState } from "react";
import { Treemap } from "recharts";
import styled from "styled-components";

const COLORS = [
  "#12D4C9",
  "#8889DD",
  "#7443FD",
  "#8085FA",
  "#5359E9",
  "#868AF1",
  "#20BEE1",
  "#7075DC",
  "#363CBF",
  "#08BEB3",
].sort(() => Math.random() - 0.5);

const CustomKeyword = (props: any) => {
  const { x, y, width, height, colors, name, index, depth } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        rx={10}
        ry={10}
        width={width}
        height={height}
        style={{
          fill: depth === 0 ? "transparent" : colors[index],
          stroke: "#fff",
          strokeWidth: 5,
          strokeOpacity: 1,
        }}
      />
      <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14} strokeWidth={0}>
        {name}
      </text>
    </g>
  );
};

const MostKeyword = ({ chartData }: any) => {
  // 여기 any

  const [treeChartData, setTreeChartData] = useState<string[]>();
  const [randomOrderData, setRandomOrderData] = useState<string[]>();

  useEffect(() => {
    if (chartData) {
      setTreeChartData(prev =>
        chartData.map((ele: string, idx: number) => ({
          name: ele,
          value: chartData.length - idx,
        })),
      );
    }
  }, [chartData]);

  useEffect(() => {
    if (treeChartData) {
      setRandomOrderData(treeChartData.sort(() => Math.random() - 0.5));
    }
  }, [treeChartData]);

  return (
    <TreemapBox>
      <Treemap
        data={randomOrderData}
        width={360}
        height={360}
        dataKey={"value"}
        stroke={"#fff"}
        content={<CustomKeyword colors={COLORS} />}
        animationDuration={1000}
      ></Treemap>
    </TreemapBox>
  );
};

const TreemapBox = styled.div``;

export default MostKeyword;
