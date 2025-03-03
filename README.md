# React Spin The Wheel

React Spin The Wheel is a simple canvas based spin wheel component for React applications.

## Installation

You can install React Spin The Wheel via npm:

```jsx
npm install react-spin-the-wheel
```

## Usage

To use React Spin The Wheel in your React application, follow these steps:

Import the ReactSpinTheWheel component and necessary types in your component:

```tsx
import ReactSpinTheWheel, { ReactSpinTheWheelRef } from "react-spin-the-wheel";
```

Initialize the ref using useRef hook:

```tsx
const spinWheelRef = useRef<ReactSpinTheWheelRef | null>(null);
```

Use ReactSpinTheWheel in your component:

```tsx
return (
  <div>
    <ReactSpinTheWheel
      ref={spinWheelRef}
      wheelImage={Image}
      onSpinEnd={() => {
        /* some logic */
      }}
    />
    {/* Your other JSX content */}
  </div>
);
```
The ReactSpinTheWheel component accepts props of type ReactSpinTheWheelProps, which includes:
 - wheelImage: Imported image of the wheel passed as string
 - onSpinEnd: Function to be called when the spin ends.
 - additionalSpins (Optional): Number of spins to be made before landing on the final result (defaults to 20).
 - initialImageAngle (Optional): Offset angle required incase wheel image starts with an angle.
 - canvasProps (Optional): Additional props fed directly to canvas element;

Trigger Spin using the spin function in ref object:

```tsx
spinWheelRef.current?.spin({
  spinBy: "ANGLE",
  targetAngle: 20,
});
```

The Spin function accepts an object of type SpinFuncProps, which includes:

- spinBy: Type of angle calculation (ANGLE, SLICE).
  in case of spinBy=ANGLE
- targetAngle: Final target angle where the image should stop
  in case of spinBy=SLICE
- totalSlices: Total number of slices/sections in the wheel image (All the slices should be of same proportion).
- targetSliceNumber: Final slice/section where the spin should stop (assumption is pointer is on top & the slice numbers go anti-clockwise)

## Example

Here's a basic example of how to use React Spin The Wheel:

```tsx
import React from "react";
import ReactSpinTheWheel, { ReactSpinTheWheelRef } from "react-spin-the-wheel";
import MyWheelImage from "../../assets/path-to-image/wheel.png";

function App() {
  const spinWheelRef = (useRef < ReactSpinTheWheelRef) | (null > null);

  const handleButtonClick = () => {
    spinWheelRef.current?.spin({
      spinBy: "ANGLE",
      targetAngle: 20,
    });
  };

  return (
    <div className="App">
      <ReactSpinTheWheel
        ref={spinWheelRef}
        wheelImage={MyWheelImage}
        onSpinEnd={() => {
          /* some logic */
        }}
      />
      <button onClick={handleButtonClick}>Spin Wheel</button>
    </div>
  );
}

export default App;
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
