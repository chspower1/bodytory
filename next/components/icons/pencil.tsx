import { ReactComponentElement, ReactElement } from "react";

interface IconProps {
  width: number;
  height: number;
  fill?: string;
}
const Pencil = ({ width, height, fill }: IconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M29.2052 0C28.7204 0 28.235 0.184675 27.8655 0.555091L24.6312 3.78942L32.2101 11.3683L35.4444 8.13393C36.1852 7.3931 36.1852 6.19363 35.4444 5.45469L30.5448 0.555091C30.1744 0.184675 29.69 0 29.2052 0ZM21.7892 6.63148L0 28.4206V35.9995H7.57884L29.368 14.2103L21.7892 6.63148Z"
        fill={fill ? fill : "rgb(83, 89, 233)"}
      />
    </svg>
  );
};
export default Pencil;
