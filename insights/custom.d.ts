declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'react-dom/server' {
  export function renderToString(element: React.ReactElement): string;
}