import { useControls } from "leva";

export const useLevaConfig = (isMobile: boolean) => {
  const baseValues = {
    meshPhysicalMaterial: false,
    backside: false,
    transmissionSampler: false,
    backsideThickness: { value: 1, min: -10, max: 10 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    backsideResolution: { value: 512, min: 32, max: 2048, step: 256 },
    samples: { value: 6, min: 0, max: 32, step: 1 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.45, min: 1, max: 5, step: 0.01 },
    thickness: { value: 0.6, min: 0, max: 10, step: 0.01 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    anisotropy: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.01, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.001, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 1, min: 0, max: 2.5, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
  };

  const mobileValues = {
    ...baseValues,
    resolution: { value: 256, min: 256, max: 2048, step: 256 },
    backsideResolution: { value: 128, min: 32, max: 2048, step: 256 },
    samples: { value: 4, min: 0, max: 32, step: 1 },
  };

  const levaConfig = useControls(isMobile ? mobileValues : baseValues);

  return levaConfig;
};
