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
  const [color, setColor] = useState<string>("rgba(96,125,139,100)");
  const [canvasDisabled, setCanvasDisabled] = useState<boolean>(false);
  const [finalDrawing, setFinalDrawing] = useState<string>(
    "data:image/png;base64,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gIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgQUuh0gQIAAAQIBAgo9IEQjECBAgAABhW4HCBAgQIBAgIBCDwjRCAQIECBAQKHbAQIECBAgECCg0ANCNAIBAgQIEFDodoAAAQIECAQIKPSAEI1AgAABAgT+D1pyF5pEpcJ1AAAAAElFTkSuQmCC",
  );

  const updateColor = (value: any) => {
    setColor(`rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`);
  };

  return (
    <>
      {finalDrawing ? (
        <div className="flex items-center flex-col flex-grow pt-10">
          <h3 className="text-center">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setFinalDrawing("");
                setCanvasDisabled(false);
              }}
            >
              Start a new drawing
            </button>
          </h3>
          <div className="border-2 bg-white">
            <img width={500} height={500} src={`${finalDrawing}`} />
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col flex-grow pt-10">
          <div className={`${canvasDisabled ? "cursor-not-allowed" : "cursor-none"}`}>
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
            <div className="flex flex-col ml-3 gap-1">
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
                  console.log(drawingCanvas?.current?.canvas.drawing.toDataURL());
                  setFinalDrawing(drawingCanvas?.current?.canvas.drawing.toDataURL());
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
