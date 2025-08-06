import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";
import {
  type Group,
  type Object3DEventMap,
  type SpotLight as SpotLightType,
} from "three";

export const useWallLights = (scene: Group<Object3DEventMap>) => {
  useThree(() => {
    var light1 = scene.children.find((x) => x.name === "Wall_light_blue")!
      .children[0] as SpotLightType;
    light1.penumbra = 0.6;
    light1.intensity = 400;

    const parent = scene.children.find(
      (x) => x.name === "Wall_lights_controls"
    )!;

    const light2 = parent.children.find((x) => x.name === "Wall_light_pink")!
      .children[0] as SpotLightType;
    light2.penumbra = isMobile ? 0.2 : 0.6;
    light2.intensity = isMobile ? 600 : 400;

    const light3 = parent.children.find((x) => x.name === "Wall_light_pink001")!
      .children[0] as SpotLightType;
    light3.penumbra = isMobile ? 0.2 : 0.6;
    light3.intensity = isMobile ? 600 : 400;
  });

  useLayoutEffect(() => {
    if (isMobile) {
      const parent = scene.children.find(
        (x) => x.name === "Wall_lights_controls"
      )!;
      parent?.rotation.set(
        (270 * Math.PI) / 180,
        (180 * Math.PI) / 180,
        (180 * Math.PI) / 180
      );
      parent.scale.set(0.2, 0.2, 0.2);
      parent.position.set(40.370121002197266, -6.981804847717285, -20.25);
      const light1 = parent.children[0]?.children[0] as SpotLightType;
      const light2 = parent.children[1]?.children[0] as SpotLightType;
      light1.position.set(0, 0, -7.5);
      light1.rotation.set(-Math.PI / 2 - 0.08, 0, 0);
      light2.rotation.set(-Math.PI / 2 + 0.09, 0, 0);
      light2.position.set(0, 0, 4);
    }
  });
};
