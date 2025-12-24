import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import {
  Group,
  type Object3DEventMap,
  type SpotLight as SpotLightType,
} from "three";

export const useWallLights = (scene: Group<Object3DEventMap>) => {
  useThree(() => {
    const parent = scene.children.find((x) => x.name === "lights_controls")!;

    var light1 = parent.children.find((x) => x.name === "wall_light_blue")!
      .children[0] as SpotLightType;
    light1.penumbra = 0.6;
    light1.intensity = 400;

    const light2 = scene.children.find((x) => x.name === "wall_light_blue_2")!
      .children[0] as SpotLightType;
    light2.penumbra = isMobile ? 0.2 : 0.6;
    light2.intensity = isMobile ? 600 : 400;

    const light3 = parent.children.find((x) => x.name === "wall_light_pink")!
      .children[0] as SpotLightType;
    light3.penumbra = isMobile ? 0.2 : 0.6;
    light3.intensity = isMobile ? 600 : 400;
  });

  useGSAP(() => {
    if (isMobile) {
      const parent = scene.children.find((x) => x.name === "lights_controls")!;

      parent?.rotation.set(
        (270 * Math.PI) / 180,
        (180 * Math.PI) / 180,
        (180 * Math.PI) / 180
      );
      parent.scale.set(0.2, 0.2, 0.2);
      parent.position.set(40.370121002197266, -6.981804847717285, -20.25);
    }
  }, []);
};
