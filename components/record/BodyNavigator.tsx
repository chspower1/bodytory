import { RoundButton } from "@components/button/Button";
import { SiteType } from "pages/users/records/write";
import { Dispatch, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";

interface BodyNavigator {
  selectedSite: SiteType;
  setSelectedSite: Dispatch<SetStateAction<SiteType>>;
  setHoveredSite?: Dispatch<SetStateAction<string>>;
  isWritePage: boolean;
  hoveredSite?: string;
}

type CurrentBodyPosition = "front" | "back" | "face";

const face: SiteType[] = ["head", "forehead", "eyes", "nose", "mouth", "cheek", "chin", "ears"];

const back: SiteType[] = ["back", "waist", "hip"];

const BodyNavigator = ({ selectedSite, setSelectedSite, setHoveredSite, isWritePage, hoveredSite }: BodyNavigator) => {
  const [currentBodyPosition, setCurrentBodyPosition] = useState<CurrentBodyPosition>(
    face.includes(selectedSite) ? "face" : back.includes(selectedSite) ? "back" : "front",
  );

  return (
    <CustomContainer isWritePage={isWritePage}>
      {currentBodyPosition !== "face" ? (
        <ButtonsBox>
          <RoundButton
            width="90px"
            height="50px"
            onClick={() => setCurrentBodyPosition("front")}
            bgColor={currentBodyPosition !== "front" ? "rgb(198, 205, 250)" : undefined}
          >
            앞
          </RoundButton>

          <RoundButton
            width="90px"
            height="50px"
            onClick={() => setCurrentBodyPosition("back")}
            bgColor={currentBodyPosition !== "back" ? "rgb(198, 205, 250)" : undefined}
          >
            뒤
          </RoundButton>
        </ButtonsBox>
      ) : (
        <ButtonsBox>
          {currentBodyPosition !== "face" || (
            <RoundButton
              width="90px"
              height="50px"
              bgColor={currentBodyPosition === "face" ? "rgb(198, 205, 250)" : undefined}
              onClick={() => setCurrentBodyPosition("front")}
            >
              몸
            </RoundButton>
          )}
        </ButtonsBox>
      )}

      <PathBox>
        {currentBodyPosition === "front" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 414 792" fill="none">
            <g clipPath="url(#clip0_200_1219)">
              <HoverPath
                isHover={hoveredSite === "목"}
                isChecked={selectedSite === "neck"}
                onClick={() => setSelectedSite("neck")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M239.127 146.073C237.837 141.624 229.104 131.611 226.648 128.86C224.192 126.109 227.529 116.802 218.796 116.802H193.801C185.068 116.802 188.405 126.109 185.949 128.86C183.493 131.611 174.76 141.624 173.47 146.073C172.18 150.522 177.861 150.584 177.861 150.584H234.735C234.735 150.584 240.417 150.522 239.127 146.073Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "어깨"}
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M154.256 149.406C154.256 149.406 131.63 149.406 124.374 158.887C117.105 168.367 96.005 185.469 115.12 185.234C134.223 184.998 132.461 186.398 141.38 176.336C141.38 176.336 161.339 158.156 161.86 156.049C162.381 153.942 161.004 149.877 154.268 149.406H154.256Z "
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "윗팔"}
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M100.074 252.328C98.7587 251.944 97.8904 250.705 97.9896 249.341C98.4858 242.773 100.595 229.699 103.15 219.661C106.077 208.185 101.277 193.078 110.295 190.389C119.313 187.7 133.851 188.159 132.92 202.336C131.99 216.513 131.047 226.576 127.177 235.821C123.307 245.066 118.382 259.119 110.059 255.848C105.308 253.976 102.009 252.91 100.061 252.328H100.074Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "팔꿈치"}
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M101.872 276.629C108.223 276.629 113.371 272.346 113.371 267.062C113.371 261.778 108.223 257.495 101.872 257.495C95.5216 257.495 90.3734 261.778 90.3734 267.062C90.3734 272.346 95.5216 276.629 101.872 276.629Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "아랫팔"}
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M87.2598 278.216C83.7494 278.142 80.5118 280.013 78.7876 283.062C74.5453 290.572 66.681 304.96 66.16 312.408C65.4529 322.483 50.2204 345.658 58.4197 348C66.6189 350.342 65.6886 357.133 78.8124 335.582C91.9363 314.031 106.325 301.837 103.175 286.631C101.773 279.84 92.8046 278.328 87.2474 278.204L87.2598 278.216Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손목"}
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M49.1536 352.337C49.1536 352.337 37.0221 367.791 40.545 371.831C44.0678 375.871 54.9589 381.497 56.7203 375.165C58.4817 368.832 67.7974 361.905 63.0465 357.332C58.2956 352.759 50.394 350.677 49.1536 352.325V352.337Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "어깨"}
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M258.056 149.406C258.056 149.406 280.681 149.406 287.938 158.887C295.207 168.367 316.307 185.469 297.191 185.234C278.089 184.998 279.85 186.398 270.931 176.336C270.931 176.336 250.973 158.156 250.452 156.049C249.931 153.942 251.308 149.877 258.043 149.406H258.056Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "윗팔"}
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M312.25 252.328C313.565 251.944 314.434 250.705 314.334 249.341C313.838 242.773 311.729 229.699 309.174 219.661C306.247 208.185 311.047 193.078 302.029 190.389C293.011 187.7 278.473 188.159 279.404 202.336C280.346 216.501 281.277 226.576 285.147 235.821C289.017 245.066 293.942 259.119 302.265 255.848C307.016 253.976 310.315 252.91 312.263 252.328H312.25Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "팔꿈치"}
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M310.439 276.629C316.79 276.629 321.938 272.346 321.938 267.062C321.938 261.778 316.79 257.495 310.439 257.495C304.089 257.495 298.94 261.778 298.94 267.062C298.94 272.346 304.089 276.629 310.439 276.629Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "아랫팔"}
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M325.052 278.216C328.562 278.142 331.8 280.013 333.524 283.062C337.766 290.572 345.631 304.96 346.152 312.408C346.859 322.483 362.091 345.658 353.892 348C345.693 350.342 346.623 357.133 333.499 335.582C320.375 314.031 305.986 301.837 309.137 286.631C310.539 279.84 319.507 278.328 325.064 278.204L325.052 278.216Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손목"}
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M363.158 352.337C363.158 352.337 375.289 367.791 371.767 371.831C368.244 375.871 357.353 381.497 355.591 375.165C353.83 368.832 344.514 361.905 349.265 357.332C354.016 352.759 361.917 350.677 363.158 352.325V352.337Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "가슴"}
                isChecked={selectedSite === "chest"}
                onClick={() => setSelectedSite("chest")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("가슴")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M174.301 162.493H205.858H206.305H237.861C237.861 162.493 261.789 164.637 262.955 185.246C263.228 190.072 264.085 195.012 264.907 199.751C267.594 215.246 269.909 228.589 250.216 228.769C226.091 228.99 208.201 228.873 206.081 228.858C203.962 228.873 186.071 228.99 161.947 228.769C142.254 228.589 144.568 215.246 147.256 199.751C148.077 195.012 148.934 190.072 149.207 185.246C150.373 164.637 174.301 162.493 174.301 162.493Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "배"}
                isChecked={selectedSite === "stomach"}
                onClick={() => setSelectedSite("stomach")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("배")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M182.972 236.292H205.883H206.305H229.215C229.215 236.292 256.542 237.259 259.048 256.331C261.554 275.403 260.388 322.892 256.406 328.655C255.783 329.556 255.223 330.882 254.549 332.479C250.921 341.067 243.988 357.482 206.305 357.604V357.604C206.234 357.604 206.164 357.604 206.094 357.604C206.024 357.604 205.953 357.604 205.883 357.604V357.604C168.2 357.482 161.266 341.067 157.639 332.479C156.964 330.882 156.404 329.556 155.782 328.655C151.8 322.892 150.634 275.403 153.139 256.331C155.645 237.259 182.972 236.292 182.972 236.292Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "골반"}
                isChecked={selectedSite === "pelvis"}
                onClick={() => setSelectedSite("pelvis")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("골반")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M156.241 355.076C158.424 356.117 160.16 357.902 161.339 359.996L188.827 409.121C188.827 409.121 196.939 424.339 179.052 421.538C161.165 418.737 141.938 415.218 141.938 415.218C141.938 415.218 131.035 413.347 136.952 396.951C142.41 381.844 142.633 348.619 156.228 355.076H156.241Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "골반"}
                isChecked={selectedSite === "pelvis"}
                onClick={() => setSelectedSite("pelvis")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("골반")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M255.649 355.076C253.466 356.117 251.729 357.902 250.551 359.996L223.063 409.121C223.063 409.121 214.95 424.339 232.838 421.538C250.725 418.737 269.951 415.218 269.951 415.218C269.951 415.218 280.855 413.347 274.938 396.951C269.48 381.844 269.257 348.619 255.662 355.076H255.649Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "생식기"}
                isChecked={selectedSite === "sexOrgan"}
                onClick={() => setSelectedSite("sexOrgan")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("생식기")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M189 365.671H206.305H223.609C223.609 365.671 233.185 365.931 233.557 370.194C234.338 379.216 221.227 413.643 206.305 413.643C191.382 413.643 178.271 379.216 179.052 370.194C179.424 365.931 189 365.671 189 365.671Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "허벅지"}
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M140.623 432.977C137.373 436.818 135.389 441.614 134.942 446.695C134.334 453.635 133.64 463.636 133.962 470.365C134.496 481.63 140.822 533.605 137.659 543.792C134.496 553.967 165.085 556.879 168.595 554.698C172.106 552.517 195.141 457.043 189.422 440.573C183.704 424.104 144.419 428.491 140.735 432.853C140.698 432.902 140.661 432.939 140.623 432.977Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "무릎"}
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M162.464 587.003C164.61 575.56 159.913 565.079 151.974 563.593C144.036 562.107 135.86 570.179 133.715 581.622C131.569 593.065 136.266 603.546 144.205 605.032C152.144 606.518 160.319 598.446 162.464 587.003Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "종아리"}
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M131.109 610.205C127.872 609.895 125.031 612.485 124.845 615.93C123.94 633.441 121.732 682.405 125.18 688.527C129.398 696 140.301 698.23 145.573 682.925C150.845 667.62 165.259 624.295 155.769 617.95C155.769 617.95 154.554 612.485 131.097 610.205H131.109Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발목"}
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M128.604 700.932C126.644 701.267 125.155 702.94 124.957 705.009C124.423 710.846 123.629 722.706 122.947 728.345C122.054 735.842 123.505 741.692 130.501 742.163C137.498 742.634 144.208 745.211 142.422 727.638C140.636 710.066 140.388 707.686 140.599 702.754C140.71 700.337 133.193 700.151 128.591 700.932H128.604Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "허벅지"}
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M271.713 431.576C274.963 435.418 276.948 440.214 277.394 445.295C278.002 452.235 278.697 462.236 278.374 468.965C277.841 480.23 271.514 532.205 274.678 542.392C277.841 552.566 247.251 555.479 243.741 553.297C240.231 551.116 217.196 455.643 222.914 439.173C228.632 422.703 267.917 427.09 271.601 431.452C271.638 431.502 271.676 431.539 271.713 431.576Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "무릎"}
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M268.143 603.634C276.082 602.148 280.778 591.667 278.633 580.224C276.487 568.781 268.312 560.709 260.373 562.195C252.434 563.68 247.738 574.161 249.883 585.604C252.029 597.047 260.204 605.119 268.143 603.634Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "종아리"}
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M281.239 608.804C284.477 608.495 287.318 611.085 287.504 614.53C288.409 632.041 290.617 681.004 287.169 687.126C282.951 694.599 272.048 696.83 266.776 681.525C261.504 666.22 247.09 622.895 256.58 616.55C256.58 616.55 257.795 611.085 281.252 608.804H281.239Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발목"}
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M283.745 699.531C285.705 699.865 287.194 701.539 287.392 703.608C287.925 709.445 288.719 721.305 289.401 726.944C290.295 734.441 288.843 740.29 281.847 740.761C274.851 741.232 268.14 743.81 269.927 726.237C271.713 708.664 271.961 706.285 271.75 701.353C271.638 698.936 279.155 698.75 283.757 699.531H283.745Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손"}
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M56.1993 387.681C57.9856 388.598 59.0275 390.519 58.7794 392.502C57.415 403.284 50.4065 417.337 50.5677 420.274C50.7414 423.521 50.9151 441.528 50.9151 441.528C49.3273 445.035 46.5239 442.581 45.9905 441.701C45.4571 440.821 46.0774 422.815 45.1967 420.881C44.3159 418.948 41.8599 414.202 39.7511 433.001C38.275 446.187 34.4173 449.707 32.2465 450.624C31.1797 451.082 29.9641 450.463 29.716 449.335C29.4679 448.207 29.4803 446.695 29.9021 444.774C32.1845 434.241 33.4125 419.307 32.1845 418.601C30.9564 417.895 30.2494 420.534 26.3792 429.135C22.5091 437.735 20.9337 447.935 16.0092 448.282C11.0846 448.629 19.5196 429.135 21.281 421.414C21.2934 421.34 21.3182 421.253 21.3306 421.179C21.7772 419.146 22.0005 413.235 20.9213 415.007C15.2525 424.339 4.80802 438.244 3.17064 435.406C1.23556 432.072 7.21447 423.236 13.7144 412.343C17.0263 406.803 18.1179 401.214 18.1055 398.351C18.1055 396.716 17.1008 395.737 15.9968 396.951C13.4291 399.789 10.0303 402.168 7.0284 404.213C3.15824 406.853 -0.72433 402.788 1.57048 401.214C3.85288 399.628 7.47496 395.935 8.70299 393.469C9.74496 391.387 11.494 386.665 18.7753 381.819C21.5415 379.973 24.8659 379.093 28.1903 379.267C32.1969 379.477 37.9773 380.072 42.5545 381.658C47.6155 383.418 53.0114 386.045 56.1869 387.669L56.1993 387.681Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손"}
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M355.951 388.338C354.165 389.255 353.123 391.175 353.371 393.158C354.735 403.94 361.744 417.993 361.583 420.93C361.409 424.177 361.235 442.184 361.235 442.184C362.823 445.691 365.626 443.237 366.16 442.357C366.693 441.477 366.073 423.471 366.954 421.538C367.834 419.604 370.29 414.858 372.399 433.658C373.875 446.843 377.733 450.363 379.904 451.28C380.971 451.739 382.186 451.119 382.434 449.991C382.682 448.863 382.67 447.352 382.248 445.431C379.966 434.897 378.738 419.964 379.966 419.257C381.194 418.551 381.901 421.191 385.771 429.791C389.641 438.392 391.217 448.591 396.141 448.938C401.066 449.285 392.631 429.791 390.869 422.07C390.857 421.996 390.832 421.909 390.82 421.835C390.373 419.803 390.15 413.891 391.229 415.663C396.898 424.995 407.342 438.9 408.98 436.062C410.915 432.728 404.936 423.892 398.436 412.999C395.124 407.459 394.032 401.87 394.045 399.008C394.045 397.372 395.05 396.393 396.154 397.607C398.721 400.445 402.12 402.825 405.122 404.869C408.992 407.509 412.875 403.444 410.58 401.87C408.297 400.284 404.675 396.591 403.447 394.125C402.405 392.043 400.656 387.321 393.375 382.476C390.609 380.629 387.284 379.749 383.96 379.923C379.953 380.134 374.173 380.728 369.596 382.315C364.535 384.074 359.139 386.702 355.963 388.325L355.951 388.338Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발"}
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M123.171 747.132C119.734 746.76 116.398 748.446 114.487 751.333C112.069 754.977 108.695 759.934 106.995 761.731C104.291 764.593 96.8856 775.883 103.001 781.596C103.51 782.067 103.844 782.687 104.006 783.356C104.353 784.769 105.333 787.049 108.099 787.037C108.967 787.037 109.799 787.371 110.481 787.916C111.163 788.462 112.193 788.933 113.594 788.499C114.897 788.09 116.336 788.263 117.328 789.193C118.32 790.122 119.983 790.655 122.352 788.635C123.704 787.483 125.664 787.483 127.078 788.561C129.025 790.048 132.275 790.99 137.051 787.545C145.573 781.398 144.258 769.984 144.258 769.538C144.258 769.203 143.601 765.114 144.283 760.553C144.729 757.616 143.303 754.692 140.71 753.229C136.555 750.875 130.067 747.876 123.158 747.12L123.171 747.132Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발"}
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M289.191 747.132C292.627 746.76 295.963 748.446 297.874 751.333C300.293 754.977 303.667 759.934 305.366 761.731C308.07 764.593 315.476 775.883 309.36 781.596C308.852 782.067 308.517 782.687 308.355 783.356C308.008 784.769 307.028 787.049 304.262 787.037C303.394 787.037 302.563 787.371 301.88 787.916C301.198 788.462 300.169 788.933 298.767 788.499C297.464 788.09 296.025 788.263 295.033 789.193C294.041 790.122 292.379 790.655 290.009 788.635C288.657 787.483 286.697 787.483 285.283 788.561C283.336 790.048 280.086 790.99 275.31 787.545C266.788 781.398 268.103 769.984 268.103 769.538C268.103 769.203 268.761 765.114 268.078 760.553C267.632 757.616 269.058 754.692 271.651 753.229C275.806 750.875 282.294 747.876 289.203 747.12L289.191 747.132Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "머리"}
                isChecked={selectedSite === "head"}
                onClick={() => setCurrentBodyPosition("face")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("머리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M205.424 8.11719C187.648 8.11719 170.729 19.2706 169.538 46.8568C168.446 72.0759 188.083 106.082 205.858 106.082C223.634 106.082 242.587 72.1007 243.108 46.8568C243.555 24.6367 223.212 8.11719 205.424 8.11719V8.11719Z"
                fill="#D9DEFF"
              />
            </g>
            <g clipPath="url(#clip1_200_1219)">
              <path
                d="M182.173 99.8877V119.152C182.173 119.152 182.198 125.829 174.827 131.094C167.457 136.359 160.78 143.557 150.077 143.916C139.374 144.275 115.49 147.422 105.655 176.398C95.8187 205.374 100.216 213.625 97.0575 222.582C93.8986 231.539 92.1395 248.387 92.1395 251.199C92.1395 254.011 88.448 259.45 80.3712 270.686C72.2945 281.922 64.5646 295.797 61.9384 313.004C59.3122 330.212 31.3904 376.569 31.3904 376.569"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M44.3726 379.368C44.3726 379.368 35.4163 374.103 24.0073 379.368C12.5982 384.633 10.4923 390.431 9.25357 392.884C8.0148 395.337 4.16223 400.081 1.8829 401.667C-0.39643 403.253 3.81538 407.812 7.68033 405.173C11.5453 402.534 13.8246 401.841 17.6896 396.39C17.6896 396.39 20.8484 401.655 14.3573 412.544C7.86615 423.433 1.89529 432.564 3.82777 435.896C5.76024 439.229 15.7695 426.766 21.3811 415.877C21.3811 415.877 23.6604 414.65 21.9138 422.368C20.1547 430.098 11.7311 449.585 16.649 449.226C21.5669 448.879 23.1401 438.696 27.0051 430.086C30.8701 421.476 31.5762 418.85 32.8025 419.556C34.0289 420.262 32.8025 435.178 30.5232 445.72C29.7676 449.226 30.3746 451.53 31.3284 451.889C31.3284 451.889 38.2407 452.744 40.359 433.964C42.4773 415.183 44.9301 419.915 45.7972 421.848C46.6643 423.78 46.0573 441.781 46.59 442.66C47.1227 443.54 49.9223 445.993 51.5079 442.487C51.5079 442.487 51.3345 424.486 51.1611 421.241C50.9876 417.995 60.1174 401.494 60.1174 390.518C60.1174 379.542 61.703 373.657 61.703 373.657C61.703 373.657 111.477 304.035 115.515 284.201C119.553 264.355 134.121 236.444 137.466 234.685"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M230.398 99.8877V119.152C230.398 119.152 230.374 125.829 237.744 131.094C245.115 136.359 251.792 143.557 262.495 143.916C273.198 144.275 297.081 147.422 306.917 176.398C316.753 205.374 312.355 213.625 315.514 222.582C318.673 231.539 320.432 248.387 320.432 251.199C320.432 254.011 324.124 259.45 332.2 270.686C340.277 281.922 348.007 295.797 350.633 313.004C353.272 330.212 381.181 376.569 381.181 376.569"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M368.682 380.298C368.682 380.298 377.638 375.033 389.047 380.298C400.456 385.563 402.562 391.361 403.801 393.813C405.04 396.266 408.892 401.011 411.172 402.597C413.451 404.183 409.239 408.741 405.374 406.103C401.509 403.464 399.23 402.77 395.365 397.319C395.365 397.319 392.206 402.584 398.697 413.474C405.188 424.363 411.159 433.493 409.227 436.826C407.294 440.158 397.285 427.696 391.674 416.806C391.674 416.806 389.394 415.58 391.141 423.298C392.9 431.028 401.324 450.515 396.406 450.156C391.488 449.809 389.915 439.626 386.05 431.016C382.185 422.418 381.478 419.779 380.252 420.486C379.026 421.192 380.252 436.107 382.531 446.65C383.287 450.156 382.68 452.46 381.726 452.819C381.726 452.819 374.814 453.674 372.696 434.893C370.59 416.1 368.125 420.845 367.257 422.777C366.39 424.71 366.997 442.71 366.465 443.59C365.932 444.469 363.132 446.922 361.547 443.416C361.547 443.416 361.72 425.416 361.894 422.17C362.067 418.925 352.937 402.423 352.937 391.447C352.937 380.471 351.352 374.587 351.352 374.587C351.352 374.587 301.578 304.964 297.54 285.13C293.501 265.284 278.933 237.373 275.589 235.614"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M137.429 190.967C137.429 190.967 136.549 232.877 139.126 240.83C141.703 248.796 148.02 280.163 145.914 295.847C143.809 311.53 141.22 334.473 141.814 339.627C142.409 344.781 126.726 392.538 127.184 429.529C127.655 466.521 133.031 522.702 131.161 538.15C129.29 553.599 128.113 577.248 128.113 577.248C128.113 577.248 118.984 597.094 118.637 613.942C118.29 630.803 116.878 709.283 121.622 719.813C121.622 719.813 114.078 727.717 120.396 743.165C120.396 743.165 110.04 759.319 107.228 762.305C104.416 765.291 96.5124 777.406 104.069 782.845C104.069 782.845 104.416 788.729 109.78 787.404C109.78 787.404 111.972 791.393 116.184 787.602C116.184 787.602 118.637 795.047 125.054 786.45C125.054 786.45 128.745 794.267 137.255 788.122C145.766 781.978 144.453 770.568 144.453 770.122C144.453 769.676 143.313 762.751 145.592 756.78C147.872 750.809 146.336 740.006 146.336 740.006C146.336 740.006 149.978 731.582 146.026 722.885C146.026 722.885 144.354 705.938 147.859 693.909C151.365 681.88 161.585 653.672 164.05 648.047C166.515 642.423 167.556 601.925 167.444 591.631C167.333 581.336 179.968 563.422 181.492 549.956C183.016 536.49 202.737 451.692 203.084 437.47C203.43 423.248 204.483 418.157 204.483 418.157H206.242"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M275.081 190.967C275.081 190.967 275.96 232.877 273.384 240.83C270.807 248.796 264.489 280.163 266.595 295.847C268.701 311.53 271.29 334.473 270.696 339.627C270.101 344.781 285.784 392.538 285.325 429.529C284.855 466.521 279.478 522.702 281.349 538.15C283.219 553.599 284.396 577.248 284.396 577.248C284.396 577.248 293.526 597.094 293.873 613.942C294.22 630.803 295.632 709.283 290.887 719.813C290.887 719.813 298.432 727.717 292.114 743.165C292.114 743.165 302.47 759.319 305.282 762.305C308.094 765.291 315.997 777.406 308.441 782.845C308.441 782.845 308.094 788.729 302.73 787.404C302.73 787.404 300.537 791.393 296.326 787.602C296.326 787.602 293.873 795.047 287.456 786.45C287.456 786.45 283.765 794.267 275.254 788.122C266.744 781.978 268.057 770.568 268.057 770.122C268.057 769.688 269.197 762.751 266.917 756.78C264.638 750.809 266.174 740.006 266.174 740.006C266.174 740.006 262.532 731.582 266.484 722.885C266.484 722.885 268.156 705.938 264.65 693.909C261.145 681.88 250.925 653.672 248.46 648.047C245.995 642.423 244.954 601.925 245.065 591.631C245.177 581.336 232.541 563.422 231.018 549.956C229.494 536.49 209.773 451.692 209.426 437.47C209.079 423.248 208.026 418.157 208.026 418.157H206.267"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M125.054 786.449C125.054 786.449 124.793 780.924 130.405 777.059"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M116.184 787.613C116.184 787.613 115.131 784.789 122.502 777.059"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M109.78 787.415C109.78 787.415 108.293 784.43 114.958 777.059"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M104.069 782.857C104.069 782.857 105.295 777.765 108.454 773.38"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M287.567 786.449C287.567 786.449 287.828 780.924 282.216 777.059"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M296.437 787.613C296.437 787.613 297.49 784.789 290.119 777.059"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M302.842 787.415C302.842 787.415 304.328 784.43 297.663 777.059"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M308.552 782.857C308.552 782.857 307.326 777.765 304.167 773.38"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M206.23 1.23926C183.672 1.23926 159.913 20.6022 163.195 51.2758C166.478 81.937 183.672 112.92 206.23 112.92C228.788 112.92 245.994 81.9493 249.265 51.2758C252.548 20.6022 228.788 1.23926 206.23 1.23926V1.23926Z"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_200_1219">
                <rect width="410.349" height="781.918" fill="white" transform="translate(0.900635 8.11719)" />
              </clipPath>
              <clipPath id="clip1_200_1219">
                <rect width="413.055" height="791.838" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        {currentBodyPosition === "back" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 409 769" fill="none">
            <g clipPath="url(#clip0_200_1146)">
              <HoverPath
                isHover={hoveredSite === "목"}
                isChecked={selectedSite === "neck"}
                onClick={() => setSelectedSite("neck")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M236.701 144.871C235.424 140.465 226.778 130.549 224.346 127.825C221.915 125.1 225.218 115.884 216.572 115.884H191.825C183.179 115.884 186.483 125.1 184.051 127.825C181.619 130.549 172.973 140.465 171.696 144.871C170.419 149.277 176.044 149.338 176.044 149.338H232.354C232.354 149.338 237.979 149.277 236.701 144.871Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "어깨"}
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M152.672 148.172C152.672 148.172 130.271 148.172 123.086 157.56C115.89 166.949 94.9989 183.885 113.925 183.651C132.838 183.418 131.094 184.805 139.924 174.84C139.924 174.84 159.685 156.836 160.201 154.75C160.717 152.664 159.353 148.638 152.685 148.172H152.672Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "윗팔"}
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M99.0273 250.094C97.7254 249.714 96.8657 248.486 96.964 247.136C97.4552 240.632 99.5431 227.685 102.073 217.744C104.971 206.38 100.219 191.42 109.147 188.757C118.076 186.094 132.469 186.548 131.548 200.587C130.627 214.627 129.694 224.592 125.862 233.747C122.03 242.903 117.155 256.819 108.914 253.579C104.21 251.726 100.943 250.671 99.015 250.094H99.0273Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "팔꿈치"}
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M100.808 274.161C107.096 274.161 112.193 269.919 112.193 264.686C112.193 259.454 107.096 255.212 100.808 255.212C94.5204 255.212 89.4232 259.454 89.4232 264.686C89.4232 269.919 94.5204 274.161 100.808 274.161Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "아랫팔"}
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M86.3406 275.731C82.865 275.657 79.6596 277.511 77.9524 280.53C73.7522 287.967 65.9658 302.215 65.45 309.591C64.75 319.568 49.6684 342.517 57.7864 344.837C65.9044 347.156 64.9833 353.882 77.977 332.54C90.9707 311.198 105.217 299.122 102.098 284.064C100.71 277.339 91.8304 275.841 86.3283 275.719L86.3406 275.731Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손목"}
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M48.6122 349.133C48.6122 349.133 36.6011 364.436 40.089 368.437C43.5769 372.438 54.3599 378.01 56.1039 371.738C57.8478 365.467 67.0711 358.607 62.3674 354.078C57.6636 349.55 49.8404 347.488 48.6122 349.12V349.133Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "어깨"}
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M255.443 148.172C255.443 148.172 277.844 148.172 285.029 157.56C292.225 166.949 313.116 183.885 294.19 183.651C275.277 183.418 277.021 184.805 268.191 174.84C268.191 174.84 248.43 156.836 247.914 154.75C247.398 152.664 248.762 148.638 255.43 148.172H255.443Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "어깨"}
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M309.1 250.094C310.402 249.714 311.262 248.486 311.163 247.136C310.672 240.632 308.584 227.685 306.054 217.744C303.156 206.38 307.909 191.42 298.98 188.757C290.039 186.094 275.658 186.548 276.579 200.587C277.512 214.615 278.433 224.592 282.265 233.747C286.097 242.903 290.973 256.819 299.214 253.579C303.917 251.726 307.184 250.671 309.112 250.094H309.1Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "팔꿈치"}
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M307.307 274.161C313.595 274.161 318.692 269.919 318.692 264.686C318.692 259.454 313.595 255.212 307.307 255.212C301.019 255.212 295.922 259.454 295.922 264.686C295.922 269.919 301.019 274.161 307.307 274.161Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "아랫팔"}
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M321.774 275.731C325.25 275.657 328.455 277.511 330.163 280.53C334.363 287.967 342.149 302.215 342.665 309.591C343.365 319.568 358.447 342.517 350.329 344.837C342.211 347.156 343.132 353.882 330.138 332.54C317.144 311.198 302.898 299.122 306.017 284.064C307.405 277.339 316.285 275.841 321.787 275.719L321.774 275.731Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손목"}
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M359.503 349.133C359.503 349.133 371.514 364.436 368.026 368.437C364.538 372.438 353.755 378.01 352.011 371.738C350.267 365.467 341.044 358.607 345.748 354.078C350.451 349.55 358.275 347.488 359.503 349.12V349.133Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "허벅지"}
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M139.175 428.989C135.957 432.794 133.992 437.543 133.55 442.575C132.948 449.447 132.261 459.351 132.58 466.015C133.108 477.171 139.372 528.641 136.24 538.729C133.108 548.817 163.394 551.689 166.87 549.529C170.345 547.369 193.152 452.822 187.49 436.512C181.828 420.202 142.933 424.547 139.286 428.867C139.249 428.916 139.212 428.953 139.175 428.989Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "무릎"}
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M160.801 581.522C162.926 570.19 158.276 559.81 150.416 558.339C142.555 556.868 134.461 564.861 132.337 576.193C130.213 587.525 134.863 597.905 142.723 599.376C150.583 600.847 158.677 592.854 160.801 581.522Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "종아리"}
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M129.755 604.497C126.55 604.19 123.737 606.755 123.553 610.166C122.657 627.507 120.471 675.996 123.885 682.058C128.06 689.458 138.856 691.667 144.075 676.511C149.295 661.355 163.566 618.45 154.171 612.167C154.171 612.167 152.967 606.755 129.743 604.497H129.755Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발목"}
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M127.274 694.343C125.334 694.675 123.86 696.331 123.664 698.381C123.136 704.161 122.35 715.906 121.674 721.49C120.79 728.915 122.227 734.707 129.153 735.174C136.08 735.64 142.724 738.193 140.956 720.79C139.187 703.388 138.942 701.032 139.15 696.147C139.261 693.754 131.818 693.57 127.262 694.343H127.274Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "허벅지"}
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M268.965 427.603C272.182 431.407 274.147 436.157 274.589 441.188C275.191 448.061 275.879 457.965 275.56 464.628C275.032 475.784 268.768 527.255 271.9 537.342C275.032 547.418 244.746 550.302 241.27 548.142C237.794 545.982 214.988 451.436 220.65 435.126C226.311 418.816 265.206 423.16 268.854 427.48C268.891 427.529 268.928 427.566 268.965 427.603Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "무릎"}
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M265.432 597.992C273.292 596.521 277.942 586.141 275.818 574.809C273.693 563.477 265.599 555.484 257.739 556.955C249.879 558.426 245.229 568.806 247.353 580.138C249.478 591.47 257.572 599.463 265.432 597.992Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "종아리"}
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M278.397 603.11C281.602 602.803 284.415 605.368 284.599 608.78C285.495 626.121 287.681 674.609 284.267 680.671C280.091 688.072 269.296 690.281 264.077 675.124C258.857 659.968 244.586 617.064 253.981 610.78C253.981 610.78 255.185 605.368 278.409 603.11H278.397Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발목"}
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M280.877 692.957C282.818 693.288 284.292 694.945 284.488 696.994C285.016 702.774 285.802 714.519 286.478 720.103C287.362 727.528 285.925 733.321 278.998 733.787C272.072 734.253 265.427 736.806 267.196 719.404C268.965 702.001 269.21 699.645 269.001 694.761C268.891 692.367 276.333 692.183 280.89 692.957H280.877Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손"}
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M55.5881 384.134C57.3566 385.042 58.3882 386.944 58.1426 388.907C56.7916 399.584 49.8527 413.501 50.0123 416.41C50.1843 419.625 50.3562 437.457 50.3562 437.457C48.7842 440.93 46.0086 438.5 45.4805 437.629C44.9524 436.758 45.5665 418.926 44.6945 417.011C43.8225 415.097 41.3908 410.396 39.303 429.014C37.8415 442.072 34.022 445.557 31.8728 446.465C30.8166 446.919 29.613 446.306 29.3674 445.189C29.1217 444.072 29.134 442.575 29.5516 440.672C31.8113 430.241 33.0272 415.453 31.8113 414.753C30.5955 414.054 29.8955 416.668 26.0637 425.185C22.2319 433.702 20.6721 443.802 15.7964 444.146C10.9207 444.489 19.2721 425.185 21.016 417.539C21.0283 417.465 21.0529 417.379 21.0652 417.306C21.5073 415.293 21.7283 409.439 20.6599 411.194C15.0473 420.435 4.70637 434.205 3.08523 431.395C1.16934 428.093 7.08896 419.343 13.5244 408.556C16.8035 403.07 17.8843 397.535 17.872 394.7C17.872 393.08 16.8772 392.111 15.7842 393.313C13.2419 396.124 9.87683 398.48 6.90473 400.505C3.07295 403.119 -0.77112 399.094 1.50093 397.535C3.7607 395.964 7.34686 392.307 8.56272 389.865C9.59435 387.803 11.326 383.127 18.5352 378.329C21.2739 376.5 24.5653 375.629 27.8567 375.801C31.8236 376.009 37.5467 376.598 42.0786 378.169C47.0894 379.912 52.4318 382.514 55.5758 384.121L55.5881 384.134Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "손"}
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M352.367 384.784C350.599 385.692 349.567 387.594 349.813 389.558C351.164 400.235 358.103 414.152 357.943 417.06C357.771 420.276 357.599 438.108 357.599 438.108C359.171 441.581 361.947 439.151 362.475 438.279C363.003 437.408 362.389 419.576 363.261 417.662C364.133 415.747 366.565 411.047 368.652 429.664C370.114 442.722 373.933 446.207 376.083 447.115C377.139 447.57 378.342 446.956 378.588 445.839C378.834 444.722 378.821 443.225 378.404 441.323C376.144 430.891 374.928 416.103 376.144 415.404C377.36 414.704 378.06 417.318 381.892 425.835C385.723 434.352 387.283 444.452 392.159 444.796C397.035 445.14 388.683 425.835 386.939 418.189C386.927 418.116 386.903 418.03 386.89 417.956C386.448 415.944 386.227 410.09 387.296 411.845C392.908 421.086 403.249 434.855 404.87 432.045C406.786 428.744 400.866 419.993 394.431 409.206C391.152 403.72 390.071 398.185 390.083 395.35C390.083 393.73 391.078 392.761 392.171 393.964C394.713 396.774 398.079 399.13 401.051 401.155C404.882 403.769 408.727 399.744 406.454 398.185C404.195 396.615 400.609 392.957 399.393 390.515C398.361 388.453 396.629 383.778 389.42 378.979C386.681 377.15 383.39 376.279 380.099 376.451C376.132 376.66 370.409 377.249 365.877 378.82C360.866 380.562 355.524 383.164 352.38 384.772L352.367 384.784Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "머리"}
                isChecked={selectedSite === "head"}
                onClick={() => setCurrentBodyPosition("face")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("머리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M203.763 8.37695C186.164 8.37695 169.412 18.0108 168.233 41.8684C167.152 63.6764 186.593 93.0688 204.193 93.0688C221.792 93.0688 240.558 63.701 241.074 41.8684C241.516 22.662 221.374 8.37695 203.763 8.37695V8.37695Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "등"}
                isChecked={selectedSite === "back"}
                onClick={() => setSelectedSite("back")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("등")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M204.09 274.494C206.18 274.506 244.301 274.591 254.501 265.449C264.989 256.048 265.677 210.837 256.196 179.873C246.968 149.738 206.261 154.105 204.09 154.36C201.92 154.105 161.212 149.738 151.985 179.873C142.503 210.837 143.191 256.048 153.679 265.449C163.877 274.589 201.983 274.506 204.09 274.494Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "허리"}
                isChecked={selectedSite === "waist"}
                onClick={() => setSelectedSite("waist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M173.686 281.155H204.266L204.254 337.277C149.924 337.277 149.308 335.426 147.688 330.559L147.686 330.552C147.013 328.528 147.541 326.504 148.355 323.384C149.501 318.992 151.213 312.427 150.941 300.632C150.474 280.456 173.686 281.155 173.686 281.155ZM204.266 281.155L204.279 337.277C258.609 337.277 259.225 335.426 260.844 330.559L260.847 330.552C261.52 328.528 260.992 326.504 260.178 323.384C259.032 318.992 257.319 312.427 257.592 300.632C258.059 280.456 234.847 281.155 234.847 281.155H204.266Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "엉덩이"}
                isChecked={selectedSite === "hip"}
                onClick={() => setSelectedSite("hip")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("엉덩이")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M169.449 344.003H204.266H239.084C239.084 344.003 279.391 345.181 273.116 401.401C272.895 403.401 272.133 405.304 270.905 406.911C264.863 414.79 243.898 435.481 204.266 409.403C164.634 435.481 143.67 414.79 137.628 406.911C136.399 405.304 135.638 403.401 135.417 401.401C129.141 345.181 169.449 344.003 169.449 344.003Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발"}
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M127.36 741.309C124.044 741.051 120.999 743.175 120.102 746.378C118.727 751.262 117.793 757.828 122.03 759.362C128.662 761.767 141.251 763.768 144.21 755.422C145.475 751.863 145.5 749.016 144.996 746.807C144.247 743.506 141.14 741.297 137.75 741.542C135.687 741.69 132.445 741.702 127.348 741.309H127.36Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "발"}
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M281.565 741.309C284.881 741.051 287.927 743.175 288.823 746.378C290.199 751.262 291.132 757.828 286.895 759.362C280.263 761.767 267.675 763.768 264.715 755.422C263.45 751.863 263.426 749.016 263.929 746.807C264.678 743.506 267.786 741.297 271.175 741.542C273.238 741.69 276.481 741.702 281.577 741.309H281.565Z"
                fill="#D9DEFF"
              />
            </g>
            <g clipPath="url(#clip1_200_1146)">
              <path
                d="M180.294 98.8447V117.908C180.294 117.908 180.318 124.515 173.024 129.725C165.729 134.935 159.121 142.058 148.528 142.414C137.936 142.769 114.299 145.883 104.564 174.557C94.8301 203.231 99.1824 211.395 96.0561 220.259C92.9298 229.122 91.1889 245.794 91.1889 248.577C91.1889 251.36 87.5355 256.742 79.542 267.861C71.5486 278.98 63.8985 292.71 61.2994 309.738C58.7003 326.766 31.0665 372.639 31.0665 372.639"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M43.9148 375.409C43.9148 375.409 35.051 370.199 23.7596 375.409C12.4683 380.619 10.3841 386.357 9.15813 388.784C7.93214 391.211 4.11932 395.906 1.8635 397.476C-0.392311 399.045 3.77604 403.556 7.60112 400.945C11.4262 398.334 13.682 397.647 17.5071 392.253C17.5071 392.253 20.6334 397.463 14.2092 408.239C7.78502 419.015 1.87576 428.05 3.7883 431.347C5.70084 434.645 15.6068 422.312 21.1605 411.537C21.1605 411.537 23.4164 410.323 21.6877 417.96C19.9468 425.61 11.6101 444.894 16.4773 444.538C21.3444 444.195 22.9014 434.118 26.7265 425.598C30.5516 417.078 31.2504 414.479 32.4641 415.178C33.6779 415.876 32.4641 430.636 30.2083 441.069C29.4605 444.538 30.0612 446.818 31.0052 447.174C31.0052 447.174 37.8462 448.02 39.9427 429.435C42.0391 410.85 44.4665 415.533 45.3247 417.446C46.1829 419.358 45.5822 437.17 46.1094 438.041C46.6365 438.911 49.4073 441.339 50.9765 437.869C50.9765 437.869 50.8049 420.057 50.6333 416.845C50.4616 413.633 59.4971 397.304 59.4971 386.442C59.4971 375.581 61.0664 369.758 61.0664 369.758C61.0664 369.758 110.327 300.862 114.323 281.235C118.32 261.608 132.738 233.976 136.048 232.235"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M228.021 98.8447V117.908C228.021 117.908 227.997 124.515 235.291 129.725C242.586 134.935 249.194 142.058 259.787 142.414C270.379 142.769 294.016 145.883 303.75 174.557C313.485 203.231 309.133 211.395 312.259 220.259C315.385 229.122 317.126 245.794 317.126 248.577C317.126 251.36 320.779 256.742 328.773 267.861C336.766 278.98 344.416 292.71 347.016 309.738C349.627 326.766 377.248 372.639 377.248 372.639"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M364.878 376.329C364.878 376.329 373.742 371.119 385.033 376.329C396.325 381.539 398.409 387.276 399.635 389.704C400.861 392.131 404.674 396.826 406.93 398.395C409.185 399.965 405.017 404.476 401.192 401.865C397.367 399.254 395.111 398.567 391.286 393.173C391.286 393.173 388.16 398.383 394.584 409.159C401.008 419.935 406.917 428.97 405.005 432.267C403.092 435.565 393.186 423.232 387.632 412.457C387.632 412.457 385.377 411.243 387.105 418.88C388.846 426.53 397.183 445.814 392.316 445.458C387.449 445.115 385.892 435.038 382.067 426.518C378.241 418.01 377.543 415.399 376.329 416.098C375.115 416.796 376.329 431.556 378.585 441.989C379.333 445.458 378.732 447.738 377.788 448.094C377.788 448.094 370.947 448.94 368.85 430.355C366.766 411.758 364.326 416.453 363.468 418.365C362.61 420.278 363.211 438.09 362.684 438.961C362.156 439.831 359.386 442.258 357.816 438.789C357.816 438.789 357.988 420.977 358.16 417.765C358.331 414.553 349.296 398.224 349.296 387.362C349.296 376.501 347.727 370.678 347.727 370.678C347.727 370.678 298.466 301.782 294.47 282.155C290.473 262.516 276.055 234.896 272.745 233.155"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M136.109 190.262C136.109 190.262 135.239 231.734 137.789 239.605C140.339 247.487 146.591 278.527 144.507 294.047C142.423 309.567 139.861 332.271 140.449 337.371C141.038 342.47 125.517 389.729 125.97 426.335C126.436 462.94 131.757 518.535 129.906 533.822C128.054 549.11 126.89 572.512 126.89 572.512C126.89 572.512 117.854 592.151 117.511 608.824C117.168 625.508 115.77 703.169 120.465 713.59C120.465 713.59 112.999 721.411 119.252 736.698C119.252 736.698 109.444 756.889 114.311 760.542C119.178 764.195 130.641 774.787 150.11 760.542C150.11 760.542 154.511 756.631 144.924 733.572C144.924 733.572 148.528 725.236 144.617 716.63C144.617 716.63 142.962 699.859 146.432 687.956C149.901 676.052 160.016 648.138 162.456 642.573C164.895 637.007 165.925 596.932 165.815 586.745C165.704 576.558 178.209 558.831 179.717 545.505C181.225 532.18 200.743 448.266 201.086 434.193C201.43 420.119 201.92 402.895 201.92 402.895"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M227.972 98.8089C237.915 87.0647 244.768 68.8477 246.693 50.741C249.942 20.3875 226.427 1.22656 204.102 1.22656C181.777 1.22656 158.263 20.3875 161.511 50.741C163.449 68.8722 170.314 87.1137 180.281 98.8579"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M195.508 188.974C195.508 188.974 204.2 233.155 171.871 233.155"
                stroke="#363CBF"
                strokeWidth="2"
                stroke-miterlimit="10"
              />
              <path
                d="M216.276 188.863C216.276 188.863 207.584 233.045 239.913 233.045"
                stroke="#363CBF"
                strokeWidth="2"
                stroke-miterlimit="10"
              />
              <path
                d="M206.873 402.92C206.873 402.92 207.351 420.107 207.694 434.18C208.038 448.254 227.555 532.179 229.063 545.493C230.571 558.818 243.076 576.533 242.966 586.732C242.856 596.932 243.898 637.007 246.325 642.56C248.753 648.113 258.867 676.04 262.349 687.943C265.831 699.847 264.163 716.617 264.163 716.617C260.253 725.223 263.857 733.559 263.857 733.559C254.27 756.631 258.671 760.529 258.671 760.529C278.127 774.774 289.603 764.182 294.47 760.529C299.337 756.876 289.529 736.685 289.529 736.685C295.782 721.398 288.315 713.577 288.315 713.577C293.011 703.157 291.613 625.483 291.27 608.811C290.927 592.126 281.891 572.499 281.891 572.499C281.891 572.499 280.739 549.097 278.875 533.81C277.024 518.523 282.345 462.916 282.811 426.322C283.277 389.717 267.756 342.458 268.332 337.358C268.92 332.258 266.358 309.554 264.274 294.034C262.19 278.514 268.442 247.474 270.992 239.592C273.542 231.709 272.672 190.249 272.672 190.249"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M139.579 400.479C139.579 400.479 172.129 434.069 204.396 400.479"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M269.202 400.479C269.202 400.479 236.652 434.069 204.384 400.479"
                stroke="#363CBF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_200_1146">
                <rect width="406.28" height="753.084" fill="white" transform="translate(0.837708 8.37695)" />
              </clipPath>
              <clipPath id="clip1_200_1146">
                <rect width="408.793" height="769" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        {currentBodyPosition === "face" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 466 542" fill="none">
            <g clipPath="url(#clip0_599_5)">
              <HoverPath
                isHover={hoveredSite === "머리"}
                isChecked={selectedSite === "head"}
                onClick={() => setSelectedSite("head")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("머리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M59.0349 237.829C57.3531 244.949 47.1888 244.364 46.3357 237.098C39.1208 176.069 41.7777 63.1548 151.147 29.166C289.741 -13.8931 393.139 39.0164 416.392 216.251C417.367 223.639 407.228 226.686 404.132 219.908C381.975 171.119 332.227 115.991 225.66 115.991C107.955 115.991 70.8811 187.382 59.0349 237.829V237.829Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "이마"}
                isChecked={selectedSite === "forehead"}
                onClick={() => setSelectedSite("forehead")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("이마")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M372 198.321C372 226.642 301.584 229.537 223.297 229.537C145.011 229.537 84 235.201 84 206.906C84 178.611 144.987 127 223.297 127C301.608 127 372 170.001 372 198.321Z"
                fill="#B3BDFF"
              />
              <HoverPath
                isHover={hoveredSite === "눈"}
                isChecked={selectedSite === "eyes"}
                onClick={() => setSelectedSite("eyes")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("눈")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M147.5 314C180.913 314 208 296.539 208 275C208 253.461 180.913 236 147.5 236C114.087 236 87 253.461 87 275C87 296.539 114.087 314 147.5 314Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "눈"}
                isChecked={selectedSite === "eyes"}
                onClick={() => setSelectedSite("eyes")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("눈")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M319 314C352.689 314 380 296.539 380 275C380 253.461 352.689 236 319 236C285.311 236 258 253.461 258 275C258 296.539 285.311 314 319 314Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "볼"}
                isChecked={selectedSite === "cheek"}
                onClick={() => setSelectedSite("cheek")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("볼")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M400.578 363.47C400.578 401.75 373.352 432.764 339.763 432.764C306.175 432.764 278.948 401.725 278.948 363.47C278.948 325.214 306.175 325.238 339.763 325.238C373.352 325.238 400.578 325.189 400.578 363.47Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "볼"}
                isChecked={selectedSite === "cheek"}
                onClick={() => setSelectedSite("cheek")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("볼")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M190.883 363.47C190.883 401.75 163.656 432.764 130.068 432.764C96.4795 432.764 69.2529 401.725 69.2529 363.47C69.2529 325.214 96.4795 325.238 130.068 325.238C163.656 325.238 190.883 325.189 190.883 363.47Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "코"}
                isChecked={selectedSite === "nose"}
                onClick={() => setSelectedSite("nose")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("코")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M215.037 299.706L197.9 357.936C193.952 371.378 203.489 385 216.851 385H251.149C264.511 385 274.048 371.378 270.1 357.936L252.963 299.706C247.202 280.098 220.822 280.098 215.061 299.706H215.037Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "입"}
                isChecked={selectedSite === "mouth"}
                onClick={() => setSelectedSite("mouth")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("입")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M298.032 428.692C298.032 453.318 270.562 473.262 236.681 473.262C202.8 473.262 175.33 453.293 175.33 428.692C175.33 404.09 202.8 405.797 236.681 405.797C270.562 405.797 298.032 404.066 298.032 428.692Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "턱"}
                isChecked={selectedSite === "chin"}
                onClick={() => setSelectedSite("chin")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("턱")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M177.719 480.212C162.46 480.212 155.928 499.645 168.115 508.837C183.422 520.369 205.408 531.024 234.438 531.024C263.469 531.024 286.771 520.76 304.345 509.471C317.654 500.912 311.438 480.236 295.643 480.236H177.719V480.212Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "귀"}
                isChecked={selectedSite === "ears"}
                onClick={() => setSelectedSite("ears")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("귀")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M46.0226 300.247C46.4614 291.519 36.0777 289.446 27.2541 293.493C10.1674 301.345 -5.33488 321.021 13.7993 346.696C22.891 358.887 29.1309 359.374 36.1265 361.496C48.1432 365.129 55.1144 359.082 51.5557 349.183C47.997 339.283 44.9989 320.728 45.9982 300.247H46.0226Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isHover={hoveredSite === "귀"}
                isChecked={selectedSite === "ears"}
                onClick={() => setSelectedSite("ears")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("귀")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M421.977 300.346C421.539 291.617 431.922 289.545 440.746 293.592C457.833 301.443 473.335 321.12 454.201 346.794C445.109 358.985 438.869 359.473 431.873 361.594C419.857 365.227 412.886 359.18 416.444 349.281C420.003 339.382 423.001 320.827 422.002 300.346H421.977Z"
                fill="#D9DEFF"
              />
            </g>
            <g clipPath="url(#clip1_599_5)">
              <path
                d="M206.147 429.649C206.147 429.649 211.532 455.804 239.531 455.804C269.649 455.804 272.11 429.649 272.11 429.649"
                stroke="#5155BA"
                strokeWidth="4"
                stroke-miterlimit="10"
              />
              <path
                d="M418.996 286.345C418.923 312.695 416.291 338.655 411.296 363.397C412.515 363.811 413.709 364.201 414.903 364.542C442.121 372.457 465.83 344.889 465.83 325.407C465.83 305.924 450.479 286.345 419.021 286.345H418.996Z"
                stroke="#5155BA"
                strokeWidth="4"
                stroke-miterlimit="10"
              />
              <path
                d="M50.0497 302.345C50.4883 304.025 50.7563 304.926 50.7563 304.926C50.7563 304.926 47.7591 207.368 81.2643 182.334C116.938 155.667 126.953 130.827 126.149 110.566C151.296 134.748 199.519 158.492 292.188 158.492C413.319 158.492 419.362 302.832 419.362 302.832C419.362 302.832 469.9 -39.1318 187.287 7.6258C17.4705 35.7047 16.5445 176.854 50.0497 302.345Z"
                stroke="#5155BA"
                strokeWidth="4"
                stroke-miterlimit="10"
              />
              <path
                d="M232.823 298.04L253.584 341.023L228.364 357.339"
                stroke="#5155BA"
                strokeWidth="4"
                stroke-miterlimit="10"
              />
              <path
                d="M293.212 158.492C200.177 158.492 151.784 134.772 126.563 110.565C127.392 130.827 117.328 155.667 81.508 182.333C54.2165 202.644 51.0488 270.759 50.8295 295.672C53.851 428.298 130.779 541.758 240.481 541.758C348.258 541.758 415.049 422.77 419.874 292.457C415.755 259.41 394.873 158.468 293.212 158.468V158.492Z"
                stroke="#5155BA"
                strokeWidth="4"
                stroke-miterlimit="10"
              />
              <path
                d="M50.0497 302.32C48.6364 297.036 47.2962 291.727 46.0047 286.394C15.2531 286.832 0.218384 306.144 0.218384 325.407C0.218384 344.67 23.9278 372.457 51.1462 364.542C53.5099 363.86 55.9466 363.032 58.4077 362.082C54.119 343.209 51.3412 323.532 50.3177 303.343C50.2446 303.051 50.1472 302.71 50.0497 302.32V302.32Z"
                stroke="#5155BA"
                strokeWidth="4"
                stroke-miterlimit="10"
              />
              <path
                d="M157.754 285.491C164.079 285.491 169.206 278.96 169.206 270.904C169.206 262.847 164.079 256.316 157.754 256.316C151.428 256.316 146.301 262.847 146.301 270.904C146.301 278.96 151.428 285.491 157.754 285.491Z"
                fill="#363CBF"
                stroke="#363CBF"
                stroke-miterlimit="10"
              />
              <path
                d="M324.11 285.491C330.435 285.491 335.562 278.96 335.562 270.904C335.562 262.847 330.435 256.316 324.11 256.316C317.785 256.316 312.657 262.847 312.657 270.904C312.657 278.96 317.785 285.491 324.11 285.491Z"
                fill="#363CBF"
                stroke="#363CBF"
                stroke-miterlimit="10"
              />
              <path
                d="M431.083 341.942C438.027 331.47 448.188 315.787 431.765 308.676C451.113 312.548 441.731 333.491 431.083 341.942Z"
                fill="#363CBF"
              />
              <path
                d="M46.4189 341.942C35.7704 333.491 26.3889 312.548 45.7366 308.676C29.2886 315.787 39.4742 331.47 46.4189 341.942Z"
                fill="#363CBF"
              />
            </g>
            <defs>
              <clipPath id="clip0_599_5">
                <rect width="458" height="516" fill="white" transform="translate(5 15)" />
              </clipPath>
              <clipPath id="clip1_599_5">
                <rect width="466" height="542" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </PathBox>
    </CustomContainer>
  );
};

BodyNavigator.defaultProps = {
  isWritePage: true,
};

const CustomContainer = styled.div<{ isWritePage: boolean }>`
  display: flex;
  width: 50%;
  aspect-ratio: 1/1;
  position: relative;
  ${({ isWritePage }) =>
    isWritePage
      ? css`
          background-color: #ebecfc;
          box-shadow: 8px 8px 18px rgba(174, 178, 228, 0.25);
          border-radius: 30px;
        `
      : css``}
`;

const PathBox = styled.div<{ isViewMode?: boolean }>`
  display: flex;
  margin: auto;
  width: 46%;
  z-index: 100;
  ${({ isViewMode }) =>
    isViewMode &&
    css`
      pointer-events: none;
      width: 85%;
    `}
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  padding: 18px;
  bottom: 0;
`;

const HoverPath = styled.path<{ isChecked: boolean; isHover?: boolean }>`
  ${({ isChecked, isHover }) =>
    isChecked
      ? css`
          fill: rgb(3, 231, 203);
        `
      : isHover
      ? css`
          fill: rgb(178, 189, 255);
        `
      : css`
          fill: rgb(217, 222, 255);
        `}
`;

export default BodyNavigator;
