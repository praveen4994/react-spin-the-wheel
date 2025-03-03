import { HTMLAttributes } from "react";
import ReactSpinTheWheel from "./ReactSpinTheWheel";

export type ReactSpinTheWheelProps = {
  wheelImage: string;
  onSpinEnd: () => void;
  additionalSpins?: number;
  initialImageAngle?: number;
  canvasProps?: HTMLAttributes<HTMLCanvasElement>;
};
export type SpinFuncProps =
  | {
      spinBy: "SLICE";
      totalSlices: number;
      targetSliceNumber: number;
    }
  | {
      spinBy: "ANGLE";
      targetAngle: number;
    };

// Define the ref type
export type ReactSpinTheWheelRef = {
  spin: (props: SpinFuncProps) => void;
};

export default ReactSpinTheWheel;
