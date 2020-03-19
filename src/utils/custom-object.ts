import { TextureLoader } from "three";

export interface uniforms{
    time: number,
    colorTexture: TextureLoader
}

export interface colorTexture{
    value: TextureLoader
}

export interface time{
    value: number
}