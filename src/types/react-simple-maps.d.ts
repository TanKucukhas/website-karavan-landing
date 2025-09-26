declare module 'react-simple-maps' {
  import { ReactNode } from 'react';
  
  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    style?: Record<string, unknown>;
    width?: number;
    height?: number;
    children?: ReactNode;
  }
  
  export interface GeographiesProps {
    geography: string;
    children: (props: { geographies: unknown[] }) => ReactNode;
  }
  
  export interface GeographyProps {
    geography: unknown;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: Record<string, unknown>;
  }
  
  export interface GraticuleProps {
    stroke?: string;
    strokeWidth?: number;
  }
  
  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Graticule: React.FC<GraticuleProps>;
}
