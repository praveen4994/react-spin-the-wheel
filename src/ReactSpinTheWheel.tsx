import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";

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

function degToRadians(deg: number) {
  return (deg * Math.PI) / 180.0;
}

const ReactSpinTheWheel = forwardRef<
  ReactSpinTheWheelRef,
  ReactSpinTheWheelProps
>(
  (
    {
      wheelImage,
      onSpinEnd,
      additionalSpins = 20,
      canvasProps,
      initialImageAngle = 0,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const wheelRadius = 250;
    const angleRef = useRef(0);
    const speedRef = useRef(0);
    const spinningRef = useRef(false);
    const slowingDownRef = useRef(false);
    const targetAngleRef = useRef(0);
    const animFrameRef = useRef<number>(0);

    const wheelImageRef = useRef(new Image());

    // Pass the ref to the useImperativeHandle hook
    useImperativeHandle(ref, () => ({
      spin: spinWheel,
    }));

    useEffect(() => {
      wheelImageRef.current.src = wheelImage;
      wheelImageRef.current.onload = drawWheel;

      return () => {
        wheelImageRef.current.onload = null;
      };
    }, []);

    const drawWheel = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw spinning wheel
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angleRef.current);
      ctx.drawImage(
        wheelImageRef.current,
        -wheelRadius,
        -wheelRadius,
        wheelRadius * 2,
        wheelRadius * 2
      );
      ctx.restore();
    };

    const animate = () => {
      if (!spinningRef.current) return;

      angleRef.current += speedRef.current;

      const angleDiff = targetAngleRef.current - angleRef.current;

      if (angleDiff < degToRadians(360 * 2) && speedRef.current > 0.05) {
        speedRef.current *= 0.95;
      }

      if (angleDiff < 0.02) {
        angleRef.current = targetAngleRef.current;
        spinningRef.current = false;
        speedRef.current = 0;
        setIsSpinning(false);
        onSpinEnd();
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
      } else {
        animFrameRef.current = requestAnimationFrame(animate);
      }

      drawWheel();
    };

    const spinWheel = (props: SpinFuncProps) => {
      if (isSpinning) return;

      setIsSpinning(true);
      spinningRef.current = true;
      speedRef.current = 0.5;
      slowingDownRef.current = false;

      if (props.spinBy === "ANGLE") {
        targetAngleRef.current = degToRadians(
          props.targetAngle + 360 * additionalSpins
        );
        animate();
      }

      if (props.spinBy === "SLICE") {
        const { targetSliceNumber, totalSlices } = props;
        if (targetSliceNumber <= 0 && targetSliceNumber > totalSlices) {
          throw "Invalid slice";
        }

        const sliceWidth = 360 / totalSlices;
        const startAngle = sliceWidth * (targetSliceNumber - 1);

        const finalAngle = startAngle + sliceWidth / 2 - initialImageAngle;

        targetAngleRef.current = degToRadians(
          finalAngle + 360 * additionalSpins
        );
        animate();
      }
    };

    return (
      <canvas
        width={500}
        height={500}
        {...canvasProps}
        ref={canvasRef}
      ></canvas>
    );
  }
);

export default ReactSpinTheWheel;
