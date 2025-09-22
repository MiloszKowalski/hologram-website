export interface Still {
  thumbSrc?: string;
  videoSource?: string;
}

export interface Project {
  name: string;
  clientName: string;
  director: string;
  dop: string;
  stills: Still[];
  fullVideoUrl: string;
  thumbSrc: string;
}
