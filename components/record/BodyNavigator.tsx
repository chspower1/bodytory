import { RoundButton } from "@components/button/Button";
import { SiteType } from "pages/users/records/write";
import { Dispatch, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";

interface BodyNavigator {
  selectedSite: SiteType;
  setSelectedSite: Dispatch<SetStateAction<SiteType>>;
  setHoveredSite?: Dispatch<SetStateAction<string>>;
}

type CurrentBodyPosition = "front" | "back" | "face";

const face: SiteType[] = ["head", "forehead", "eyes", "nose", "mouth", "cheek", "chin", "ears"];

const back: SiteType[] = ["back", "waist", "hip"];

const BodyNavigator = ({ selectedSite, setSelectedSite, setHoveredSite }: BodyNavigator) => {
  const [currentBodyPosition, setCurrentBodyPosition] = useState<CurrentBodyPosition>(
    face.includes(selectedSite) ? "face" : back.includes(selectedSite) ? "back" : "front",
  );

  return (
    <CustomContainer>
      {currentBodyPosition !== "face" ? (
        <ButtonsContainer>
          <RoundButton width="90px" height="50px" onClick={() => setCurrentBodyPosition("front")}>
            앞
          </RoundButton>
          <RoundButton width="90px" height="50px" onClick={() => setCurrentBodyPosition("back")}>
            뒤
          </RoundButton>
        </ButtonsContainer>
      ) : (
        <ButtonsContainer>
          <RoundButton width="90px" height="50px" onClick={() => setCurrentBodyPosition("front")}>
            몸
          </RoundButton>
        </ButtonsContainer>
      )}
      <PathBox>
        {currentBodyPosition === "front" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 414 792" fill="none">
            <g clip-path="url(#clip0_200_1219)">
              <HoverPath
                isChecked={selectedSite === "neck"}
                onClick={() => setSelectedSite("neck")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M239.127 146.073C237.837 141.624 229.104 131.611 226.648 128.86C224.192 126.109 227.529 116.802 218.796 116.802H193.801C185.068 116.802 188.405 126.109 185.949 128.86C183.493 131.611 174.76 141.624 173.47 146.073C172.18 150.522 177.861 150.584 177.861 150.584H234.735C234.735 150.584 240.417 150.522 239.127 146.073Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M154.256 149.406C154.256 149.406 131.63 149.406 124.374 158.887C117.105 168.367 96.005 185.469 115.12 185.234C134.223 184.998 132.461 186.398 141.38 176.336C141.38 176.336 161.339 158.156 161.86 156.049C162.381 153.942 161.004 149.877 154.268 149.406H154.256Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M100.074 252.328C98.7587 251.944 97.8904 250.705 97.9896 249.341C98.4858 242.773 100.595 229.699 103.15 219.661C106.077 208.185 101.277 193.078 110.295 190.389C119.313 187.7 133.851 188.159 132.92 202.336C131.99 216.513 131.047 226.576 127.177 235.821C123.307 245.066 118.382 259.119 110.059 255.848C105.308 253.976 102.009 252.91 100.061 252.328H100.074Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M101.872 276.629C108.223 276.629 113.371 272.346 113.371 267.062C113.371 261.778 108.223 257.495 101.872 257.495C95.5216 257.495 90.3734 261.778 90.3734 267.062C90.3734 272.346 95.5216 276.629 101.872 276.629Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M87.2598 278.216C83.7494 278.142 80.5118 280.013 78.7876 283.062C74.5453 290.572 66.681 304.96 66.16 312.408C65.4529 322.483 50.2204 345.658 58.4197 348C66.6189 350.342 65.6886 357.133 78.8124 335.582C91.9363 314.031 106.325 301.837 103.175 286.631C101.773 279.84 92.8046 278.328 87.2474 278.204L87.2598 278.216Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M49.1536 352.337C49.1536 352.337 37.0221 367.791 40.545 371.831C44.0678 375.871 54.9589 381.497 56.7203 375.165C58.4817 368.832 67.7974 361.905 63.0465 357.332C58.2956 352.759 50.394 350.677 49.1536 352.325V352.337Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M258.056 149.406C258.056 149.406 280.681 149.406 287.938 158.887C295.207 168.367 316.307 185.469 297.191 185.234C278.089 184.998 279.85 186.398 270.931 176.336C270.931 176.336 250.973 158.156 250.452 156.049C249.931 153.942 251.308 149.877 258.043 149.406H258.056Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M312.25 252.328C313.565 251.944 314.434 250.705 314.334 249.341C313.838 242.773 311.729 229.699 309.174 219.661C306.247 208.185 311.047 193.078 302.029 190.389C293.011 187.7 278.473 188.159 279.404 202.336C280.346 216.501 281.277 226.576 285.147 235.821C289.017 245.066 293.942 259.119 302.265 255.848C307.016 253.976 310.315 252.91 312.263 252.328H312.25Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M310.439 276.629C316.79 276.629 321.938 272.346 321.938 267.062C321.938 261.778 316.79 257.495 310.439 257.495C304.089 257.495 298.94 261.778 298.94 267.062C298.94 272.346 304.089 276.629 310.439 276.629Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M325.052 278.216C328.562 278.142 331.8 280.013 333.524 283.062C337.766 290.572 345.631 304.96 346.152 312.408C346.859 322.483 362.091 345.658 353.892 348C345.693 350.342 346.623 357.133 333.499 335.582C320.375 314.031 305.986 301.837 309.137 286.631C310.539 279.84 319.507 278.328 325.064 278.204L325.052 278.216Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M363.158 352.337C363.158 352.337 375.289 367.791 371.767 371.831C368.244 375.871 357.353 381.497 355.591 375.165C353.83 368.832 344.514 361.905 349.265 357.332C354.016 352.759 361.917 350.677 363.158 352.325V352.337Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "chest"}
                onClick={() => setSelectedSite("chest")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("가슴")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M206.305 162.493H174.301C174.301 162.493 150.373 164.637 149.207 185.246C148.041 205.855 136.232 228.534 161.947 228.769C187.661 229.005 206.292 228.856 206.292 228.856"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "stomach"}
                onClick={() => setSelectedSite("stomach")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("배")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M206.305 236.292H182.972C182.972 236.292 155.645 237.259 153.139 256.331C150.634 275.403 151.8 322.892 155.782 328.655C159.763 334.417 161.202 357.604 206.305 357.604"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "stomach"}
                onClick={() => setSelectedSite("stomach")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("배")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M205.883 236.292H229.215C229.215 236.292 256.542 237.259 259.048 256.331C261.554 275.403 260.388 322.892 256.406 328.655C252.424 334.417 250.985 357.604 205.883 357.604"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "pelvis"}
                onClick={() => setSelectedSite("pelvis")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("골반")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M156.241 355.076C158.424 356.117 160.16 357.902 161.339 359.996L188.827 409.121C188.827 409.121 196.939 424.339 179.052 421.538C161.165 418.737 141.938 415.218 141.938 415.218C141.938 415.218 131.035 413.347 136.952 396.951C142.41 381.844 142.633 348.619 156.228 355.076H156.241Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "pelvis"}
                onClick={() => setSelectedSite("pelvis")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("골반")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M255.649 355.076C253.466 356.117 251.729 357.902 250.551 359.996L223.063 409.121C223.063 409.121 214.95 424.339 232.838 421.538C250.725 418.737 269.951 415.218 269.951 415.218C269.951 415.218 280.855 413.347 274.938 396.951C269.48 381.844 269.257 348.619 255.662 355.076H255.649Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "sexOrgan"}
                onClick={() => setSelectedSite("sexOrgan")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("생식기")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M206.305 365.671H189.001C189.001 365.671 179.424 365.931 179.052 370.194C178.271 379.216 191.382 413.643 206.305 413.643"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "sexOrgan"}
                onClick={() => setSelectedSite("sexOrgan")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("생식기")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M206.305 365.671H223.609C223.609 365.671 233.185 365.931 233.557 370.194C234.338 379.216 221.227 413.643 206.305 413.643"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M140.623 432.977C137.373 436.818 135.389 441.614 134.942 446.695C134.334 453.635 133.64 463.636 133.962 470.365C134.496 481.63 140.822 533.605 137.659 543.792C134.496 553.967 165.085 556.879 168.595 554.698C172.106 552.517 195.141 457.043 189.422 440.573C183.704 424.104 144.419 428.491 140.735 432.853C140.698 432.902 140.661 432.939 140.623 432.977Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M162.464 587.003C164.61 575.56 159.913 565.079 151.974 563.593C144.036 562.107 135.86 570.179 133.715 581.622C131.569 593.065 136.266 603.546 144.205 605.032C152.144 606.518 160.319 598.446 162.464 587.003Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M131.109 610.205C127.872 609.895 125.031 612.485 124.845 615.93C123.94 633.441 121.732 682.405 125.18 688.527C129.398 696 140.301 698.23 145.573 682.925C150.845 667.62 165.259 624.295 155.769 617.95C155.769 617.95 154.554 612.485 131.097 610.205H131.109Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M128.604 700.932C126.644 701.267 125.155 702.94 124.957 705.009C124.423 710.846 123.629 722.706 122.947 728.345C122.054 735.842 123.505 741.692 130.501 742.163C137.498 742.634 144.208 745.211 142.422 727.638C140.636 710.066 140.388 707.686 140.599 702.754C140.71 700.337 133.193 700.151 128.591 700.932H128.604Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M271.713 431.576C274.963 435.418 276.948 440.214 277.394 445.295C278.002 452.235 278.697 462.236 278.374 468.965C277.841 480.23 271.514 532.205 274.678 542.392C277.841 552.566 247.251 555.479 243.741 553.297C240.231 551.116 217.196 455.643 222.914 439.173C228.632 422.703 267.917 427.09 271.601 431.452C271.638 431.502 271.676 431.539 271.713 431.576Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M268.143 603.634C276.082 602.148 280.778 591.667 278.633 580.224C276.487 568.781 268.312 560.709 260.373 562.195C252.434 563.68 247.738 574.161 249.883 585.604C252.029 597.047 260.204 605.119 268.143 603.634Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M281.239 608.804C284.477 608.495 287.318 611.085 287.504 614.53C288.409 632.041 290.617 681.004 287.169 687.126C282.951 694.599 272.048 696.83 266.776 681.525C261.504 666.22 247.09 622.895 256.58 616.55C256.58 616.55 257.795 611.085 281.252 608.804H281.239Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M283.745 699.531C285.705 699.865 287.194 701.539 287.392 703.608C287.925 709.445 288.719 721.305 289.401 726.944C290.295 734.441 288.843 740.29 281.847 740.761C274.851 741.232 268.14 743.81 269.927 726.237C271.713 708.664 271.961 706.285 271.75 701.353C271.638 698.936 279.155 698.75 283.757 699.531H283.745Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M56.1993 387.681C57.9856 388.598 59.0275 390.519 58.7794 392.502C57.415 403.284 50.4065 417.337 50.5677 420.274C50.7414 423.521 50.9151 441.528 50.9151 441.528C49.3273 445.035 46.5239 442.581 45.9905 441.701C45.4571 440.821 46.0774 422.815 45.1967 420.881C44.3159 418.948 41.8599 414.202 39.7511 433.001C38.275 446.187 34.4173 449.707 32.2465 450.624C31.1797 451.082 29.9641 450.463 29.716 449.335C29.4679 448.207 29.4803 446.695 29.9021 444.774C32.1845 434.241 33.4125 419.307 32.1845 418.601C30.9564 417.895 30.2494 420.534 26.3792 429.135C22.5091 437.735 20.9337 447.935 16.0092 448.282C11.0846 448.629 19.5196 429.135 21.281 421.414C21.2934 421.34 21.3182 421.253 21.3306 421.179C21.7772 419.146 22.0005 413.235 20.9213 415.007C15.2525 424.339 4.80802 438.244 3.17064 435.406C1.23556 432.072 7.21447 423.236 13.7144 412.343C17.0263 406.803 18.1179 401.214 18.1055 398.351C18.1055 396.716 17.1008 395.737 15.9968 396.951C13.4291 399.789 10.0303 402.168 7.0284 404.213C3.15824 406.853 -0.72433 402.788 1.57048 401.214C3.85288 399.628 7.47496 395.935 8.70299 393.469C9.74496 391.387 11.494 386.665 18.7753 381.819C21.5415 379.973 24.8659 379.093 28.1903 379.267C32.1969 379.477 37.9773 380.072 42.5545 381.658C47.6155 383.418 53.0114 386.045 56.1869 387.669L56.1993 387.681Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M355.951 388.338C354.165 389.255 353.123 391.175 353.371 393.158C354.735 403.94 361.744 417.993 361.583 420.93C361.409 424.177 361.235 442.184 361.235 442.184C362.823 445.691 365.626 443.237 366.16 442.357C366.693 441.477 366.073 423.471 366.954 421.538C367.834 419.604 370.29 414.858 372.399 433.658C373.875 446.843 377.733 450.363 379.904 451.28C380.971 451.739 382.186 451.119 382.434 449.991C382.682 448.863 382.67 447.352 382.248 445.431C379.966 434.897 378.738 419.964 379.966 419.257C381.194 418.551 381.901 421.191 385.771 429.791C389.641 438.392 391.217 448.591 396.141 448.938C401.066 449.285 392.631 429.791 390.869 422.07C390.857 421.996 390.832 421.909 390.82 421.835C390.373 419.803 390.15 413.891 391.229 415.663C396.898 424.995 407.342 438.9 408.98 436.062C410.915 432.728 404.936 423.892 398.436 412.999C395.124 407.459 394.032 401.87 394.045 399.008C394.045 397.372 395.05 396.393 396.154 397.607C398.721 400.445 402.12 402.825 405.122 404.869C408.992 407.509 412.875 403.444 410.58 401.87C408.297 400.284 404.675 396.591 403.447 394.125C402.405 392.043 400.656 387.321 393.375 382.476C390.609 380.629 387.284 379.749 383.96 379.923C379.953 380.134 374.173 380.728 369.596 382.315C364.535 384.074 359.139 386.702 355.963 388.325L355.951 388.338Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M123.171 747.132C119.734 746.76 116.398 748.446 114.487 751.333C112.069 754.977 108.695 759.934 106.995 761.731C104.291 764.593 96.8856 775.883 103.001 781.596C103.51 782.067 103.844 782.687 104.006 783.356C104.353 784.769 105.333 787.049 108.099 787.037C108.967 787.037 109.799 787.371 110.481 787.916C111.163 788.462 112.193 788.933 113.594 788.499C114.897 788.09 116.336 788.263 117.328 789.193C118.32 790.122 119.983 790.655 122.352 788.635C123.704 787.483 125.664 787.483 127.078 788.561C129.025 790.048 132.275 790.99 137.051 787.545C145.573 781.398 144.258 769.984 144.258 769.538C144.258 769.203 143.601 765.114 144.283 760.553C144.729 757.616 143.303 754.692 140.71 753.229C136.555 750.875 130.067 747.876 123.158 747.12L123.171 747.132Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M289.191 747.132C292.627 746.76 295.963 748.446 297.874 751.333C300.293 754.977 303.667 759.934 305.366 761.731C308.07 764.593 315.476 775.883 309.36 781.596C308.852 782.067 308.517 782.687 308.355 783.356C308.008 784.769 307.028 787.049 304.262 787.037C303.394 787.037 302.563 787.371 301.88 787.916C301.198 788.462 300.169 788.933 298.767 788.499C297.464 788.09 296.025 788.263 295.033 789.193C294.041 790.122 292.379 790.655 290.009 788.635C288.657 787.483 286.697 787.483 285.283 788.561C283.336 790.048 280.086 790.99 275.31 787.545C266.788 781.398 268.103 769.984 268.103 769.538C268.103 769.203 268.761 765.114 268.078 760.553C267.632 757.616 269.058 754.692 271.651 753.229C275.806 750.875 282.294 747.876 289.203 747.12L289.191 747.132Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "chest"}
                onClick={() => setSelectedSite("chest")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("가슴")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M205.858 162.493H237.861C237.861 162.493 261.789 164.637 262.955 185.246C264.121 205.855 275.93 228.534 250.216 228.769C224.502 229.005 205.87 228.856 205.87 228.856"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "head"}
                onClick={() => setCurrentBodyPosition("face")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("머리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M205.424 8.11719C187.648 8.11719 170.729 19.2706 169.538 46.8568C168.446 72.0759 188.083 106.082 205.858 106.082C223.634 106.082 242.587 72.1007 243.108 46.8568C243.555 24.6367 223.212 8.11719 205.424 8.11719V8.11719Z"
                fill="#D9DEFF"
              />
            </g>
            <g clip-path="url(#clip1_200_1219)">
              <path
                d="M182.173 99.8877V119.152C182.173 119.152 182.198 125.829 174.827 131.094C167.457 136.359 160.78 143.557 150.077 143.916C139.374 144.275 115.49 147.422 105.655 176.398C95.8187 205.374 100.216 213.625 97.0575 222.582C93.8986 231.539 92.1395 248.387 92.1395 251.199C92.1395 254.011 88.448 259.45 80.3712 270.686C72.2945 281.922 64.5646 295.797 61.9384 313.004C59.3122 330.212 31.3904 376.569 31.3904 376.569"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M44.3726 379.368C44.3726 379.368 35.4163 374.103 24.0073 379.368C12.5982 384.633 10.4923 390.431 9.25357 392.884C8.0148 395.337 4.16223 400.081 1.8829 401.667C-0.39643 403.253 3.81538 407.812 7.68033 405.173C11.5453 402.534 13.8246 401.841 17.6896 396.39C17.6896 396.39 20.8484 401.655 14.3573 412.544C7.86615 423.433 1.89529 432.564 3.82777 435.896C5.76024 439.229 15.7695 426.766 21.3811 415.877C21.3811 415.877 23.6604 414.65 21.9138 422.368C20.1547 430.098 11.7311 449.585 16.649 449.226C21.5669 448.879 23.1401 438.696 27.0051 430.086C30.8701 421.476 31.5762 418.85 32.8025 419.556C34.0289 420.262 32.8025 435.178 30.5232 445.72C29.7676 449.226 30.3746 451.53 31.3284 451.889C31.3284 451.889 38.2407 452.744 40.359 433.964C42.4773 415.183 44.9301 419.915 45.7972 421.848C46.6643 423.78 46.0573 441.781 46.59 442.66C47.1227 443.54 49.9223 445.993 51.5079 442.487C51.5079 442.487 51.3345 424.486 51.1611 421.241C50.9876 417.995 60.1174 401.494 60.1174 390.518C60.1174 379.542 61.703 373.657 61.703 373.657C61.703 373.657 111.477 304.035 115.515 284.201C119.553 264.355 134.121 236.444 137.466 234.685"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M230.398 99.8877V119.152C230.398 119.152 230.374 125.829 237.744 131.094C245.115 136.359 251.792 143.557 262.495 143.916C273.198 144.275 297.081 147.422 306.917 176.398C316.753 205.374 312.355 213.625 315.514 222.582C318.673 231.539 320.432 248.387 320.432 251.199C320.432 254.011 324.124 259.45 332.2 270.686C340.277 281.922 348.007 295.797 350.633 313.004C353.272 330.212 381.181 376.569 381.181 376.569"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M368.682 380.298C368.682 380.298 377.638 375.033 389.047 380.298C400.456 385.563 402.562 391.361 403.801 393.813C405.04 396.266 408.892 401.011 411.172 402.597C413.451 404.183 409.239 408.741 405.374 406.103C401.509 403.464 399.23 402.77 395.365 397.319C395.365 397.319 392.206 402.584 398.697 413.474C405.188 424.363 411.159 433.493 409.227 436.826C407.294 440.158 397.285 427.696 391.674 416.806C391.674 416.806 389.394 415.58 391.141 423.298C392.9 431.028 401.324 450.515 396.406 450.156C391.488 449.809 389.915 439.626 386.05 431.016C382.185 422.418 381.478 419.779 380.252 420.486C379.026 421.192 380.252 436.107 382.531 446.65C383.287 450.156 382.68 452.46 381.726 452.819C381.726 452.819 374.814 453.674 372.696 434.893C370.59 416.1 368.125 420.845 367.257 422.777C366.39 424.71 366.997 442.71 366.465 443.59C365.932 444.469 363.132 446.922 361.547 443.416C361.547 443.416 361.72 425.416 361.894 422.17C362.067 418.925 352.937 402.423 352.937 391.447C352.937 380.471 351.352 374.587 351.352 374.587C351.352 374.587 301.578 304.964 297.54 285.13C293.501 265.284 278.933 237.373 275.589 235.614"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M137.429 190.967C137.429 190.967 136.549 232.877 139.126 240.83C141.703 248.796 148.02 280.163 145.914 295.847C143.809 311.53 141.22 334.473 141.814 339.627C142.409 344.781 126.726 392.538 127.184 429.529C127.655 466.521 133.031 522.702 131.161 538.15C129.29 553.599 128.113 577.248 128.113 577.248C128.113 577.248 118.984 597.094 118.637 613.942C118.29 630.803 116.878 709.283 121.622 719.813C121.622 719.813 114.078 727.717 120.396 743.165C120.396 743.165 110.04 759.319 107.228 762.305C104.416 765.291 96.5124 777.406 104.069 782.845C104.069 782.845 104.416 788.729 109.78 787.404C109.78 787.404 111.972 791.393 116.184 787.602C116.184 787.602 118.637 795.047 125.054 786.45C125.054 786.45 128.745 794.267 137.255 788.122C145.766 781.978 144.453 770.568 144.453 770.122C144.453 769.676 143.313 762.751 145.592 756.78C147.872 750.809 146.336 740.006 146.336 740.006C146.336 740.006 149.978 731.582 146.026 722.885C146.026 722.885 144.354 705.938 147.859 693.909C151.365 681.88 161.585 653.672 164.05 648.047C166.515 642.423 167.556 601.925 167.444 591.631C167.333 581.336 179.968 563.422 181.492 549.956C183.016 536.49 202.737 451.692 203.084 437.47C203.43 423.248 204.483 418.157 204.483 418.157H206.242"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M275.081 190.967C275.081 190.967 275.96 232.877 273.384 240.83C270.807 248.796 264.489 280.163 266.595 295.847C268.701 311.53 271.29 334.473 270.696 339.627C270.101 344.781 285.784 392.538 285.325 429.529C284.855 466.521 279.478 522.702 281.349 538.15C283.219 553.599 284.396 577.248 284.396 577.248C284.396 577.248 293.526 597.094 293.873 613.942C294.22 630.803 295.632 709.283 290.887 719.813C290.887 719.813 298.432 727.717 292.114 743.165C292.114 743.165 302.47 759.319 305.282 762.305C308.094 765.291 315.997 777.406 308.441 782.845C308.441 782.845 308.094 788.729 302.73 787.404C302.73 787.404 300.537 791.393 296.326 787.602C296.326 787.602 293.873 795.047 287.456 786.45C287.456 786.45 283.765 794.267 275.254 788.122C266.744 781.978 268.057 770.568 268.057 770.122C268.057 769.688 269.197 762.751 266.917 756.78C264.638 750.809 266.174 740.006 266.174 740.006C266.174 740.006 262.532 731.582 266.484 722.885C266.484 722.885 268.156 705.938 264.65 693.909C261.145 681.88 250.925 653.672 248.46 648.047C245.995 642.423 244.954 601.925 245.065 591.631C245.177 581.336 232.541 563.422 231.018 549.956C229.494 536.49 209.773 451.692 209.426 437.47C209.079 423.248 208.026 418.157 208.026 418.157H206.267"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M125.054 786.449C125.054 786.449 124.793 780.924 130.405 777.059"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M116.184 787.613C116.184 787.613 115.131 784.789 122.502 777.059"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M109.78 787.415C109.78 787.415 108.293 784.43 114.958 777.059"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M104.069 782.857C104.069 782.857 105.295 777.765 108.454 773.38"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M287.567 786.449C287.567 786.449 287.828 780.924 282.216 777.059"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M296.437 787.613C296.437 787.613 297.49 784.789 290.119 777.059"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M302.842 787.415C302.842 787.415 304.328 784.43 297.663 777.059"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M308.552 782.857C308.552 782.857 307.326 777.765 304.167 773.38"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M206.23 1.23926C183.672 1.23926 159.913 20.6022 163.195 51.2758C166.478 81.937 183.672 112.92 206.23 112.92C228.788 112.92 245.994 81.9493 249.265 51.2758C252.548 20.6022 228.788 1.23926 206.23 1.23926V1.23926Z"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 397 748" fill="none">
            <g clip-path="url(#clip0_144_1651)">
              <HoverPath
                isChecked={selectedSite === "neck"}
                onClick={() => setSelectedSite("neck")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M229.877 141.453C228.637 137.175 220.241 127.545 217.879 124.899C215.518 122.253 218.726 113.303 210.329 113.303H186.297C177.9 113.303 181.109 122.253 178.747 124.899C176.386 127.545 167.989 137.175 166.749 141.453C165.508 145.732 170.971 145.792 170.971 145.792H225.655C225.655 145.792 231.118 145.732 229.877 141.453Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M148.274 144.659C148.274 144.659 126.52 144.659 119.542 153.777C112.553 162.894 92.2658 179.341 110.645 179.114C129.012 178.888 127.319 180.235 135.894 170.557C135.894 170.557 155.084 153.073 155.585 151.047C156.086 149.021 154.762 145.112 148.286 144.659H148.274Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M96.1777 243.639C94.9135 243.27 94.0786 242.078 94.174 240.767C94.6511 234.45 96.6787 221.877 99.1356 212.223C101.95 201.187 97.3346 186.659 106.005 184.072C114.676 181.486 128.654 181.927 127.76 195.561C126.865 209.196 125.959 218.873 122.238 227.764C118.517 236.655 113.782 250.17 105.779 247.024C101.211 245.224 98.0383 244.199 96.1658 243.639H96.1777Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M97.9071 267.011C104.013 267.011 108.963 262.892 108.963 257.81C108.963 252.729 104.013 248.609 97.9071 248.609C91.801 248.609 86.851 252.729 86.851 257.81C86.851 262.892 91.801 267.011 97.9071 267.011Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M83.8574 268.536C80.4821 268.465 77.3692 270.264 75.7113 273.196C71.6324 280.419 64.0708 294.256 63.5698 301.418C62.89 311.108 48.2439 333.395 56.1275 335.647C64.0111 337.9 63.1166 344.431 75.7352 323.705C88.3538 302.98 102.189 291.252 99.1595 276.629C97.8117 270.098 89.1886 268.644 83.8454 268.524L83.8574 268.536Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M47.2181 339.818C47.2181 339.818 35.5537 354.68 38.9409 358.566C42.3281 362.451 52.7999 367.862 54.4935 361.772C56.1871 355.681 65.1441 349.019 60.5762 344.621C56.0082 340.224 48.4108 338.221 47.2181 339.806V339.818Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "shoulder"}
                onClick={() => setSelectedSite("shoulder")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("어깨")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M248.078 144.659C248.078 144.659 269.832 144.659 276.809 153.777C283.799 162.894 304.086 179.341 285.707 179.114C267.34 178.888 269.033 180.235 260.458 170.557C260.458 170.557 241.268 153.073 240.767 151.047C240.266 149.021 241.59 145.112 248.066 144.659H248.078Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "upperArm"}
                onClick={() => setSelectedSite("upperArm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("윗팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M300.186 243.639C301.45 243.27 302.285 242.078 302.19 240.767C301.713 234.45 299.685 221.877 297.228 212.223C294.413 201.187 299.029 186.659 290.358 184.072C281.676 181.486 267.709 181.927 268.604 195.561C269.51 209.184 270.405 218.873 274.126 227.764C277.847 236.655 282.582 250.17 290.585 247.024C295.153 245.224 298.325 244.199 300.198 243.639H300.186Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "albow"}
                onClick={() => setSelectedSite("albow")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("팔꿈치")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M298.445 267.011C304.551 267.011 309.501 262.892 309.501 257.81C309.501 252.729 304.551 248.609 298.445 248.609C292.339 248.609 287.389 252.729 287.389 257.81C287.389 262.892 292.339 267.011 298.445 267.011Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "forearm"}
                onClick={() => setSelectedSite("forearm")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("아랫팔")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M312.495 268.536C315.87 268.465 318.983 270.264 320.641 273.196C324.72 280.419 332.281 294.256 332.782 301.418C333.462 311.108 348.108 333.395 340.224 335.647C332.341 337.9 333.235 344.431 320.617 323.705C307.998 302.98 294.163 291.252 297.192 276.629C298.54 270.098 307.163 268.644 312.506 268.524L312.495 268.536Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "wrist"}
                onClick={() => setSelectedSite("wrist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M349.134 339.818C349.134 339.818 360.798 354.68 357.411 358.566C354.024 362.451 343.552 367.862 341.858 361.772C340.165 355.681 331.208 349.019 335.776 344.621C340.344 340.224 347.941 338.221 349.134 339.806V339.818Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M135.167 417.369C132.042 421.064 130.133 425.676 129.704 430.563C129.12 437.237 128.452 446.855 128.762 453.326C129.275 464.16 135.357 514.145 132.316 523.941C129.275 533.738 158.686 536.527 162.062 534.429C165.437 532.332 187.585 440.514 182.087 424.675C176.588 408.836 138.816 413.055 135.274 417.25C135.238 417.298 135.202 417.334 135.167 417.369Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M156.169 565.499C158.232 554.494 153.716 544.415 146.083 542.986C138.449 541.557 130.589 549.32 128.526 560.325C126.463 571.33 130.979 581.409 138.612 582.838C146.245 584.267 154.106 576.504 156.169 565.499Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M126.019 587.811C122.906 587.513 120.175 590.004 119.996 593.317C119.125 610.158 117.002 657.246 120.318 663.134C124.373 670.32 134.856 672.466 139.925 657.747C144.994 643.028 158.853 601.362 149.729 595.26C149.729 595.26 148.56 590.004 126.007 587.811H126.019Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M123.61 675.063C121.725 675.385 120.294 676.994 120.103 678.984C119.59 684.597 118.827 696.003 118.171 701.426C117.312 708.636 118.708 714.262 125.434 714.714C132.161 715.167 138.613 717.646 136.896 700.746C135.179 683.847 134.94 681.558 135.143 676.815C135.25 674.491 128.022 674.312 123.598 675.063H123.61Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "thigh"}
                onClick={() => setSelectedSite("thigh")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허벅지")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M261.209 416.023C264.334 419.717 266.242 424.33 266.672 429.216C267.256 435.89 267.924 445.508 267.614 451.98C267.101 462.813 261.018 512.798 264.06 522.594C267.101 532.379 237.689 535.18 234.314 533.082C230.939 530.985 208.791 439.168 214.289 423.329C219.787 407.489 257.56 411.708 261.102 415.904C261.138 415.951 261.173 415.987 261.209 416.023Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "knee"}
                onClick={() => setSelectedSite("knee")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("무릎")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M257.779 581.495C265.412 580.066 269.927 569.986 267.864 558.981C265.801 547.976 257.941 540.213 250.308 541.642C242.674 543.071 238.159 553.151 240.222 564.156C242.285 575.161 250.145 582.923 257.779 581.495Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "calf"}
                onClick={() => setSelectedSite("calf")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("종아리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M270.369 586.464C273.482 586.166 276.213 588.657 276.392 591.97C277.263 608.81 279.386 655.899 276.07 661.786C272.015 668.973 261.531 671.118 256.462 656.399C251.393 641.68 237.534 600.015 246.658 593.912C246.658 593.912 247.827 588.657 270.381 586.464H270.369Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "ankle"}
                onClick={() => setSelectedSite("ankle")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발목")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M272.778 673.716C274.663 674.038 276.094 675.647 276.285 677.637C276.797 683.251 277.561 694.656 278.217 700.079C279.075 707.29 277.68 712.915 270.953 713.368C264.227 713.821 257.774 716.3 259.492 699.4C261.209 682.5 261.448 680.212 261.245 675.468C261.138 673.144 268.365 672.965 272.79 673.716H272.778Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M53.9927 373.809C55.7102 374.691 56.712 376.539 56.4735 378.445C55.1615 388.814 48.4229 402.329 48.5779 405.154C48.7449 408.277 48.9119 425.594 48.9119 425.594C47.3852 428.966 44.6898 426.607 44.1769 425.76C43.6641 424.914 44.2604 407.597 43.4136 405.738C42.5668 403.879 40.2053 399.314 38.1777 417.394C36.7584 430.075 33.0492 433.459 30.962 434.341C29.9363 434.782 28.7675 434.186 28.5289 433.102C28.2904 432.017 28.3023 430.563 28.7078 428.716C30.9024 418.586 32.0831 404.224 30.9024 403.545C29.7216 402.866 29.0418 405.404 25.3206 413.675C21.5995 421.947 20.0847 431.755 15.3498 432.089C10.6149 432.423 18.7251 413.675 20.4187 406.25C20.4306 406.179 20.4545 406.095 20.4664 406.024C20.8958 404.069 21.1105 398.384 20.0728 400.089C14.6223 409.063 4.57988 422.435 3.00554 419.706C1.14496 416.5 6.89369 408.002 13.1433 397.526C16.3278 392.199 17.3774 386.824 17.3654 384.071C17.3654 382.498 16.3994 381.556 15.3379 382.724C12.869 385.453 9.60107 387.742 6.71478 389.708C2.99362 392.247 -0.739477 388.338 1.46698 386.824C3.66152 385.298 7.14415 381.747 8.3249 379.375C9.32676 377.373 11.0084 372.832 18.0095 368.172C20.6692 366.396 23.8655 365.55 27.0619 365.717C30.9143 365.92 36.4722 366.492 40.8732 368.017C45.7393 369.71 50.9275 372.236 53.9808 373.797L53.9927 373.809Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "hand"}
                onClick={() => setSelectedSite("hand")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("손")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M342.204 374.441C340.487 375.323 339.485 377.17 339.723 379.077C341.035 389.446 347.774 402.961 347.619 405.786C347.452 408.908 347.285 426.225 347.285 426.225C348.812 429.598 351.507 427.238 352.02 426.392C352.533 425.546 351.936 408.229 352.783 406.37C353.63 404.511 355.992 399.946 358.019 418.026C359.438 430.707 363.148 434.091 365.235 434.973C366.261 435.414 367.429 434.818 367.668 433.734C367.906 432.649 367.895 431.195 367.489 429.348C365.294 419.218 364.114 404.856 365.294 404.177C366.475 403.498 367.155 406.036 370.876 414.307C374.597 422.578 376.112 432.387 380.847 432.721C385.582 433.054 377.472 414.307 375.778 406.882C375.766 406.811 375.742 406.727 375.73 406.656C375.301 404.701 375.086 399.016 376.124 400.721C381.575 409.695 391.617 423.067 393.191 420.338C395.052 417.132 389.303 408.634 383.054 398.158C379.869 392.831 378.819 387.456 378.831 384.703C378.831 383.129 379.797 382.188 380.859 383.356C383.328 386.085 386.596 388.373 389.482 390.34C393.203 392.878 396.936 388.969 394.73 387.456C392.535 385.93 389.053 382.379 387.872 380.007C386.87 378.005 385.188 373.464 378.187 368.804C375.528 367.028 372.331 366.182 369.135 366.349C365.283 366.551 359.725 367.123 355.324 368.649C350.458 370.341 345.269 372.868 342.216 374.429L342.204 374.441Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "head"}
                onClick={() => setCurrentBodyPosition("face")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("머리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M197.89 8.90039C180.799 8.90039 164.53 18.2561 163.385 41.4249C162.336 62.6034 181.216 91.1473 198.307 91.1473C215.398 91.1473 233.622 62.6272 234.123 41.4249C234.553 22.7731 214.993 8.90039 197.89 8.90039V8.90039Z"
                fill="#03E7CB"
              />
              <HoverPath
                isChecked={selectedSite === "back"}
                onClick={() => setSelectedSite("back")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("등")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M198.295 149.94C198.295 149.94 156.814 144.636 147.606 174.706C138.399 204.775 139.067 248.681 149.252 257.811C159.438 266.94 198.295 266.594 198.295 266.594"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "back"}
                onClick={() => setSelectedSite("back")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("등")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M198.295 149.94C198.295 149.94 239.777 144.636 248.984 174.706C258.192 204.775 257.524 248.681 247.338 257.811C237.153 266.94 198.295 266.594 198.295 266.594"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "waist"}
                onClick={() => setSelectedSite("waist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M198.379 273.805H168.681C168.681 273.805 146.139 273.125 146.592 292.719C147.046 312.312 141.857 317.044 143.432 321.775C145.006 326.506 145.579 328.306 198.367 328.306"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "waist"}
                onClick={() => setSelectedSite("waist")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("허리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M198.379 273.805H228.076C228.076 273.805 250.618 273.125 250.165 292.719C249.712 312.312 254.9 317.044 253.326 321.775C251.751 326.506 251.179 328.306 198.391 328.306"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "hip"}
                onClick={() => setSelectedSite("hip")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("엉덩이")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M198.379 334.837H164.566C164.566 334.837 125.422 335.981 131.517 390.578C131.732 392.521 132.471 394.368 133.664 395.929C139.532 403.581 159.891 423.675 198.379 398.349"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "hip"}
                onClick={() => setSelectedSite("hip")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("엉덩이")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M198.379 334.837H232.191C232.191 334.837 271.335 335.981 265.24 390.578C265.026 392.521 264.286 394.368 263.094 395.929C257.226 403.581 236.867 423.675 198.379 398.349"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M123.693 720.674C120.473 720.424 117.515 722.485 116.644 725.596C115.308 730.339 114.402 736.716 118.517 738.205C124.957 740.541 137.182 742.484 140.057 734.38C141.285 730.923 141.309 728.158 140.82 726.013C140.092 722.807 137.075 720.662 133.783 720.9C131.779 721.043 128.631 721.055 123.681 720.674H123.693Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "foot"}
                onClick={() => setSelectedSite("foot")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("발")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M273.446 720.674C276.666 720.424 279.624 722.485 280.495 725.596C281.831 730.339 282.737 736.716 278.622 738.205C272.182 740.541 259.957 742.484 257.083 734.38C255.854 730.923 255.83 728.158 256.319 726.013C257.047 722.807 260.064 720.662 263.356 720.9C265.36 721.043 268.508 721.055 273.458 720.674H273.446Z"
                fill="#D9DEFF"
              />
            </g>
            <g clip-path="url(#clip1_144_1651)">
              <path
                d="M175.097 96.7559V115.268C175.097 115.268 175.121 121.685 168.037 126.745C160.953 131.805 154.536 138.722 144.249 139.067C133.962 139.412 111.008 142.436 101.554 170.282C92.1009 198.128 96.3275 206.057 93.2915 214.665C90.2555 223.272 88.5648 239.463 88.5648 242.166C88.5648 244.868 85.0169 250.095 77.2542 260.893C69.4915 271.691 62.0622 285.024 59.5382 301.561C57.0141 318.097 30.1781 362.646 30.1781 362.646"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M42.6554 365.336C42.6554 365.336 34.0474 360.277 23.0821 365.336C12.1167 370.396 10.0927 375.968 8.90211 378.325C7.71152 380.682 4.00877 385.242 1.81808 386.766C-0.372616 388.29 3.6754 392.671 7.39005 390.135C11.1047 387.599 13.2954 386.932 17.0101 381.694C17.0101 381.694 20.0461 386.754 13.8074 397.219C7.56864 407.683 1.82998 416.457 3.68731 419.66C5.54463 422.862 15.1646 410.886 20.558 400.421C20.558 400.421 22.7487 399.242 21.07 406.659C19.3793 414.088 11.2833 432.815 16.01 432.47C20.7366 432.136 22.2487 422.35 25.9633 414.076C29.678 405.802 30.3566 403.278 31.5353 403.957C32.714 404.635 31.5353 418.969 29.3446 429.101C28.6183 432.47 29.2017 434.684 30.1185 435.029C30.1185 435.029 36.762 435.851 38.7979 417.803C40.8338 399.754 43.1912 404.302 44.0246 406.159C44.858 408.017 44.2746 425.315 44.7866 426.16C45.2986 427.005 47.9893 429.363 49.5133 425.993C49.5133 425.993 49.3466 408.695 49.1799 405.576C49.0132 402.457 57.7879 386.599 57.7879 376.051C57.7879 365.503 59.3118 359.848 59.3118 359.848C59.3118 359.848 107.15 292.941 111.031 273.881C114.913 254.821 128.914 227.986 132.129 226.296"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M221.447 96.7559V115.268C221.447 115.268 221.423 121.685 228.507 126.745C235.591 131.805 242.009 138.722 252.295 139.067C262.582 139.412 285.537 142.436 294.99 170.282C304.443 198.128 300.217 206.057 303.253 214.665C306.289 223.272 307.979 239.463 307.979 242.166C307.979 244.868 311.527 250.095 319.29 260.893C327.053 271.691 334.482 285.024 337.006 301.561C339.542 318.097 366.366 362.646 366.366 362.646"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M354.353 366.23C354.353 366.23 362.961 361.17 373.926 366.23C384.892 371.29 386.916 376.861 388.106 379.219C389.297 381.576 393 386.135 395.19 387.659C397.381 389.183 393.333 393.564 389.618 391.029C385.904 388.493 383.713 387.826 379.998 382.588C379.998 382.588 376.962 387.647 383.201 398.112C389.44 408.577 395.178 417.351 393.321 420.553C391.464 423.756 381.844 411.779 376.45 401.315C376.45 401.315 374.26 400.136 375.938 407.553C377.629 414.982 385.725 433.709 380.998 433.363C376.272 433.03 374.76 423.244 371.045 414.97C367.33 406.708 366.652 404.172 365.473 404.85C364.294 405.529 365.473 419.863 367.664 429.994C368.39 433.363 367.807 435.578 366.89 435.923C366.89 435.923 360.246 436.744 358.21 418.696C356.186 400.636 353.817 405.196 352.984 407.053C352.15 408.91 352.734 426.208 352.222 427.054C351.71 427.899 349.019 430.256 347.495 426.887C347.495 426.887 347.662 409.589 347.828 406.47C347.995 403.35 339.22 387.493 339.22 376.945C339.22 366.397 337.696 360.742 337.696 360.742C337.696 360.742 289.858 293.835 285.977 274.774C282.096 255.702 268.094 228.88 264.88 227.189"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M132.188 185.533C132.188 185.533 131.343 225.808 133.819 233.452C136.296 241.107 142.368 271.25 140.344 286.322C138.32 301.394 135.831 323.443 136.403 328.395C136.974 333.348 121.901 379.242 122.342 414.791C122.794 450.34 127.962 504.33 126.164 519.176C124.366 534.022 123.235 556.749 123.235 556.749C123.235 556.749 114.46 575.821 114.127 592.012C113.794 608.215 112.436 683.634 116.996 693.753C116.996 693.753 109.746 701.349 115.818 716.195C115.818 716.195 106.293 735.802 111.019 739.35C115.746 742.898 126.878 753.184 145.785 739.35C145.785 739.35 150.059 735.552 140.749 713.159C140.749 713.159 144.249 705.063 140.451 696.706C140.451 696.706 138.844 680.419 142.213 668.86C145.582 657.3 155.405 630.192 157.774 624.787C160.143 619.382 161.143 580.464 161.036 570.57C160.929 560.677 173.073 543.462 174.538 530.521C176.002 517.581 194.956 436.09 195.29 422.422C195.623 408.755 196.099 392.028 196.099 392.028"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M221.399 96.7203C231.055 85.3151 237.71 67.624 239.58 50.0401C242.735 20.5629 219.899 1.95508 198.218 1.95508C176.538 1.95508 153.702 20.5629 156.857 50.0401C158.738 67.6478 165.406 85.3627 175.085 96.7679"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M189.872 184.283C189.872 184.283 198.314 227.189 166.918 227.189"
                stroke="#363CBF"
                stroke-width="2"
                stroke-miterlimit="10"
              />
              <path
                d="M210.041 184.176C210.041 184.176 201.6 227.082 232.996 227.082"
                stroke="#363CBF"
                stroke-width="2"
                stroke-miterlimit="10"
              />
              <path
                d="M200.909 392.053C200.909 392.053 201.374 408.744 201.707 422.411C202.04 436.078 220.994 517.581 222.459 530.51C223.923 543.451 236.067 560.654 235.96 570.559C235.853 580.464 236.865 619.382 239.222 624.775C241.58 630.168 251.402 657.288 254.784 668.848C258.165 680.408 256.546 696.694 256.546 696.694C252.748 705.051 256.248 713.147 256.248 713.147C246.938 735.553 251.212 739.338 251.212 739.338C270.106 753.172 281.25 742.886 285.977 739.338C290.704 735.791 281.179 716.183 281.179 716.183C287.251 701.337 280 693.742 280 693.742C284.56 683.622 283.203 608.191 282.87 592C282.536 575.797 273.762 556.737 273.762 556.737C273.762 556.737 272.642 534.01 270.833 519.164C269.035 504.318 274.202 450.316 274.655 414.779C275.107 379.231 260.034 333.336 260.594 328.384C261.165 323.431 258.677 301.383 256.653 286.311C254.629 271.239 260.701 241.095 263.177 233.44C265.654 225.785 264.808 185.521 264.808 185.521"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M135.557 389.683C135.557 389.683 167.168 422.303 198.504 389.683"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M261.439 389.683C261.439 389.683 229.829 422.303 198.492 389.683"
                stroke="#363CBF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_144_1651">
                <rect width="394.551" height="731.343" fill="white" transform="translate(0.822876 8.90039)" />
              </clipPath>
              <clipPath id="clip1_144_1651">
                <rect width="396.992" height="746.8" fill="white" transform="translate(0.00842285 0.764648)" />
              </clipPath>
            </defs>
          </svg>
        )}
        {currentBodyPosition === "face" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 466 542" fill="none">
            <g clip-path="url(#clip0_599_5)">
              <HoverPath
                isChecked={selectedSite === "head"}
                onClick={() => setSelectedSite("head")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("머리")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M59.0349 237.829C57.3531 244.949 47.1888 244.364 46.3357 237.098C39.1208 176.069 41.7777 63.1548 151.147 29.166C289.741 -13.8931 393.139 39.0164 416.392 216.251C417.367 223.639 407.228 226.686 404.132 219.908C381.975 171.119 332.227 115.991 225.66 115.991C107.955 115.991 70.8811 187.382 59.0349 237.829V237.829Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "forehead"}
                onClick={() => setSelectedSite("forehead")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("이마")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M372 198.321C372 226.642 301.584 229.537 223.297 229.537C145.011 229.537 84 235.201 84 206.906C84 178.611 144.987 127 223.297 127C301.608 127 372 170.001 372 198.321Z"
                fill="#B3BDFF"
              />
              <HoverPath
                isChecked={selectedSite === "eyes"}
                onClick={() => setSelectedSite("eyes")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("눈")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M147.5 314C180.913 314 208 296.539 208 275C208 253.461 180.913 236 147.5 236C114.087 236 87 253.461 87 275C87 296.539 114.087 314 147.5 314Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "eyes"}
                onClick={() => setSelectedSite("eyes")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("눈")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M319 314C352.689 314 380 296.539 380 275C380 253.461 352.689 236 319 236C285.311 236 258 253.461 258 275C258 296.539 285.311 314 319 314Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "cheek"}
                onClick={() => setSelectedSite("cheek")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("볼")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M400.578 363.47C400.578 401.75 373.352 432.764 339.763 432.764C306.175 432.764 278.948 401.725 278.948 363.47C278.948 325.214 306.175 325.238 339.763 325.238C373.352 325.238 400.578 325.189 400.578 363.47Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "cheek"}
                onClick={() => setSelectedSite("cheek")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("볼")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M190.883 363.47C190.883 401.75 163.656 432.764 130.068 432.764C96.4795 432.764 69.2529 401.725 69.2529 363.47C69.2529 325.214 96.4795 325.238 130.068 325.238C163.656 325.238 190.883 325.189 190.883 363.47Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "nose"}
                onClick={() => setSelectedSite("nose")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("코")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M215.037 299.706L197.9 357.936C193.952 371.378 203.489 385 216.851 385H251.149C264.511 385 274.048 371.378 270.1 357.936L252.963 299.706C247.202 280.098 220.822 280.098 215.061 299.706H215.037Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "mouth"}
                onClick={() => setSelectedSite("mouth")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("입")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M298.032 428.692C298.032 453.318 270.562 473.262 236.681 473.262C202.8 473.262 175.33 453.293 175.33 428.692C175.33 404.09 202.8 405.797 236.681 405.797C270.562 405.797 298.032 404.066 298.032 428.692Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "chin"}
                onClick={() => setSelectedSite("chin")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("턱")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M177.719 480.212C162.46 480.212 155.928 499.645 168.115 508.837C183.422 520.369 205.408 531.024 234.438 531.024C263.469 531.024 286.771 520.76 304.345 509.471C317.654 500.912 311.438 480.236 295.643 480.236H177.719V480.212Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "ears"}
                onClick={() => setSelectedSite("ears")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("귀")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M46.0226 300.247C46.4614 291.519 36.0777 289.446 27.2541 293.493C10.1674 301.345 -5.33488 321.021 13.7993 346.696C22.891 358.887 29.1309 359.374 36.1265 361.496C48.1432 365.129 55.1144 359.082 51.5557 349.183C47.997 339.283 44.9989 320.728 45.9982 300.247H46.0226Z"
                fill="#D9DEFF"
              />
              <HoverPath
                isChecked={selectedSite === "ears"}
                onClick={() => setSelectedSite("ears")}
                onMouseEnter={() => setHoveredSite && setHoveredSite("귀")}
                onMouseLeave={() => setHoveredSite && setHoveredSite("")}
                d="M421.977 300.346C421.539 291.617 431.922 289.545 440.746 293.592C457.833 301.443 473.335 321.12 454.201 346.794C445.109 358.985 438.869 359.473 431.873 361.594C419.857 365.227 412.886 359.18 416.444 349.281C420.003 339.382 423.001 320.827 422.002 300.346H421.977Z"
                fill="#D9DEFF"
              />
            </g>
            <g clip-path="url(#clip1_599_5)">
              <path
                d="M206.147 429.649C206.147 429.649 211.532 455.804 239.531 455.804C269.649 455.804 272.11 429.649 272.11 429.649"
                stroke="#5155BA"
                stroke-width="4"
                stroke-miterlimit="10"
              />
              <path
                d="M418.996 286.345C418.923 312.695 416.291 338.655 411.296 363.397C412.515 363.811 413.709 364.201 414.903 364.542C442.121 372.457 465.83 344.889 465.83 325.407C465.83 305.924 450.479 286.345 419.021 286.345H418.996Z"
                stroke="#5155BA"
                stroke-width="4"
                stroke-miterlimit="10"
              />
              <path
                d="M50.0497 302.345C50.4883 304.025 50.7563 304.926 50.7563 304.926C50.7563 304.926 47.7591 207.368 81.2643 182.334C116.938 155.667 126.953 130.827 126.149 110.566C151.296 134.748 199.519 158.492 292.188 158.492C413.319 158.492 419.362 302.832 419.362 302.832C419.362 302.832 469.9 -39.1318 187.287 7.6258C17.4705 35.7047 16.5445 176.854 50.0497 302.345Z"
                stroke="#5155BA"
                stroke-width="4"
                stroke-miterlimit="10"
              />
              <path
                d="M232.823 298.04L253.584 341.023L228.364 357.339"
                stroke="#5155BA"
                stroke-width="4"
                stroke-miterlimit="10"
              />
              <path
                d="M293.212 158.492C200.177 158.492 151.784 134.772 126.563 110.565C127.392 130.827 117.328 155.667 81.508 182.333C54.2165 202.644 51.0488 270.759 50.8295 295.672C53.851 428.298 130.779 541.758 240.481 541.758C348.258 541.758 415.049 422.77 419.874 292.457C415.755 259.41 394.873 158.468 293.212 158.468V158.492Z"
                stroke="#5155BA"
                stroke-width="4"
                stroke-miterlimit="10"
              />
              <path
                d="M50.0497 302.32C48.6364 297.036 47.2962 291.727 46.0047 286.394C15.2531 286.832 0.218384 306.144 0.218384 325.407C0.218384 344.67 23.9278 372.457 51.1462 364.542C53.5099 363.86 55.9466 363.032 58.4077 362.082C54.119 343.209 51.3412 323.532 50.3177 303.343C50.2446 303.051 50.1472 302.71 50.0497 302.32V302.32Z"
                stroke="#5155BA"
                stroke-width="4"
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

const CustomContainer = styled.div`
  display: flex;
  width: 50%;
  aspect-ratio: 1/1;
  position: relative;
  background-color: #ebecfc;
  box-shadow: 8px 8px 18px rgba(174, 178, 228, 0.25);
  border-radius: 30px;
`;

const PathBox = styled.div`
  margin: auto;
  width: 46%;
  z-index: 100;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  padding: 18px;
  bottom: 0;
`;

const HoverPath = styled.path<{ isChecked: boolean }>`
  ${({ isChecked }) =>
    isChecked
      ? css`
          fill: rgb(3, 231, 203);
        `
      : css`
          fill: rgb(217, 222, 255);
          &:hover {
            fill: rgb(178, 189, 255);
          }
        `}
`;

export default BodyNavigator;
