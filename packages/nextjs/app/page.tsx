"use client";

import { useRef, useState } from "react";
import type { NextPage } from "next";
import CanvasDraw from "react-canvas-draw";
import { CirclePicker } from "react-color";
import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";

interface CanvasDrawLines extends CanvasDraw {
  canvas: any;
  lines: Lines[];
  props: {
    // onChange: Function,
    // loadTimeOffset: PropTypes.number,
    // lazyRadius: PropTypes.number,
    // brushRadius: PropTypes.number,
    brushColor: string;
    // catenaryColor: PropTypes.string,
    // gridColor: PropTypes.string,
    // backgroundColor: PropTypes.string,
    // hideGrid: PropTypes.bool,
    canvasWidth: any;
    canvasHeight: any;
    // disabled: PropTypes.bool,
    // imgSrc: PropTypes.string,
    // saveData: PropTypes.string,
    // immediateLoading: PropTypes.bool,
    // hideInterface: PropTypes.bool,
    // gridSizeX: PropTypes.number,
    // gridSizeY: PropTypes.number,
    // gridLineWidth: PropTypes.number,
    // hideGridX: PropTypes.bool,
    // hideGridY: PropTypes.bool,
    // enablePanAndZoom: PropTypes.bool,
    // mouseZoomFactor: PropTypes.number,
    // zoomExtents: boundsProp,
    // clampLinesToDocument: PropTypes.bool,
  };
  // lines: Array<{ x: number; y: number }>;
}

interface Lines {
  background?: unknown;
  ref?: unknown;
  brushColor: string;
  brushRadius: number;
  points: Array<{ x: number; y: number }>;
  // lines: Array<{ x: number; y: number }>;
}

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const drawingCanvas = useRef<CanvasDrawLines>(null);
  const [color, setColor] = useState("rgba(96,125,139,100)");
  const [canvasDisabled, setCanvasDisabled] = useState(false);

  const updateColor = (value: any) => {
    setColor(`rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`);
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="cursor-none">
          <CanvasDraw
            key={"canvas"}
            ref={drawingCanvas}
            canvasWidth={500}
            canvasHeight={500}
            brushColor={color}
            lazyRadius={1}
            brushRadius={3}
            disabled={canvasDisabled}
            hideGrid={true}
            immediateLoading={true}
            loadTimeOffset={10}
          />
        </div>

        <div className="flex flex-row m-5">
          <CirclePicker color={color} onChangeComplete={updateColor} circleSpacing={3} className="h-0" />
          {/* <Button
            disabled={
              canvasDisabled ||
              (drawingCanvas &&
                drawingCanvas.current &&
                drawingCanvas.current.lines &&
                drawingCanvas.current.lines.length === 0) ||
              false
            }
            onClick={() => {
              if (canvasDisabled || (drawingCanvas.current && !drawingCanvas.current.lines)) return;
              undo();
            }}
            icon={<UndoOutlined />}
          >
            UNDO
          </Button> */}
          <div className="flex flex-col ml-3 gap-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                drawingCanvas.current?.undo();
              }}
            >
              <ArrowUturnLeftIcon className="h-4 w-4" /> UNDO
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                drawingCanvas?.current?.clear();
              }}
            >
              <TrashIcon className="h-4 w-4" /> Clear
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setCanvasDisabled(true);
                // console.log(drawingCanvas?.current?.getDataURL());
              }}
            >
              Submit
            </button>
          </div>
        </div>
        {/* <CirclePicker /> */}
      </div>
    </>
  );
};

export default Home;
