"use client";

import React, { useEffect } from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";

export default function InteractiveAstrolightCanvas() {
  function initFalling2DMatterJS() {
    const canvas = document.querySelector<HTMLDivElement>("#canvas-target");

    if (!canvas) {
      return;
    }

    const canvasWidth = canvas.clientWidth + 2;
    const canvasHeight = canvas.clientHeight + 2;
    const canvasWallDepth = canvasWidth / 4;
    const astrolightAmount = 30; // Number of astrolight objects
    const astrolightSize = canvasWidth / 15; // Size of each astrolight object
    const astrolightSizeScale = 0.2;
    const astrolightRestitution = 0.75; // How bouncy the objects are
    const worldGravity = 2; // Gravity strength

    const engine = Engine.create();
    engine.world.gravity.y = worldGravity;

    const render = Render.create({
      element: canvas,
      engine: engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: canvasWidth,
        height: canvasHeight,
        pixelRatio: 2,
      },
    });

    function getRandomNumber(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    const min = astrolightSize / 2;
    const max = canvasWidth - astrolightSize / 2;

    const astrolightCreate = () => {
      const astrolight = Bodies.rectangle(
        getRandomNumber(min, max),
        astrolightSize,
        astrolightSize,
        astrolightSize,
        {
          chamfer: {
            radius: astrolightSize / 2,
          },
          restitution: astrolightRestitution,
          render: {
            sprite: {
              texture: "/astrolight_3d.png",
              xScale: astrolightSizeScale,
              yScale: astrolightSizeScale,
            },
          },
        }
      );
      Composite.add(engine.world, astrolight);
    };

    const boxTop = Bodies.rectangle(
      canvasWidth / 2 + canvasWallDepth * 2,
      canvasHeight + canvasWallDepth,
      canvasWidth + canvasWallDepth * 4,
      canvasWallDepth * 2,
      { isStatic: true }
    );

    const boxLeft = Bodies.rectangle(
      canvasWallDepth * -1,
      canvasHeight / 2,
      canvasWallDepth * 2,
      canvasHeight,
      { isStatic: true }
    );

    const boxRight = Bodies.rectangle(
      canvasWidth + canvasWallDepth,
      canvasHeight / 2,
      canvasWallDepth * 2,
      canvasHeight,
      { isStatic: true }
    );

    const boxBottom = Bodies.rectangle(
      canvasWidth / 2 + canvasWallDepth * 2,
      canvasWallDepth * -1,
      canvasWidth + canvasWallDepth * 4,
      canvasWallDepth * 2,
      { isStatic: true }
    );

    Composite.add(engine.world, [boxTop, boxLeft, boxRight, boxBottom]);

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    function repeatedFunction(count: number, maxCount: number) {
      if (count < maxCount) {
        astrolightCreate();
        setTimeout(() => {
          repeatedFunction(count + 1, maxCount);
        }, 100);
      }
    }
    repeatedFunction(0, astrolightAmount);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);
  }

  useEffect(() => {
    initFalling2DMatterJS();
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <div className="pt-[100%]"></div>
      <div
        id="canvas-target"
        className="absolute top-0 left-0 w-full h-full overflow-hidden transform-[scale3d(1none,_1none,_1none)] transform-3d"
      ></div>
    </div>
  );
}