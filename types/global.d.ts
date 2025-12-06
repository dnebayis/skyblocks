// Global type declarations for CDN-based React app
export {};

// Mock the jsx-runtime to avoid TypeScript errors
declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

// Declare JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  
  interface Element extends React.ReactElement<any, any> {}
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  
  interface ElementAttributesProperty {
    props: {};
  }
  interface ElementChildrenAttribute {
    children: {};
  }
  
  type LibraryManagedAttributes<C, P> = C extends React.ComponentType<infer T> ? T extends P ? T : P & T : P;
}

declare global {
  // React globals
  const React: typeof import('react');
  const ReactDOM: typeof import('react-dom');
  
  // Make all React exports available globally
  type ReactElement = typeof import('react').ReactElement;
  type ReactNode = typeof import('react').ReactNode;
  
  // Hook types
  type Dispatch<A> = typeof import('react').Dispatch<A>;
  type SetStateAction<S> = typeof import('react').SetStateAction<S>;
  
  // Framer Motion
  const motion: any;
  const framer: any;
  
  // Lucide Icons
  const Wallet: any;
  const Cloud: any;
  const RefreshCw: any;
  const lucide: any;
  
  // Ethers.js
  const ethers: any;
  
  // Components
  const Button: any;
  const FloorBlock: any;
  const BuildModal: any;
  
  // Relative imports (will be available as globals in browser)
  const services: any;
  const components: any;
  const types: any;
  
  // Services
  const web3Service: {
    getBrowserProvider: any;
    getSignerProvider: any;
    fetchFloors: any;
    switchNetwork: any;
  };
  
  // Types
  const Floor: any;
}

declare const React: {
  createElement: any;
  Fragment: any;
};
declare const ReactDOM: any;
declare const JSX: any;