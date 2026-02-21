/// <reference types="react" />

// Declare the React namespace to support React.* type usage
// These are minimal declarations that allow React.ChangeEvent, React.FormEvent etc
declare global {
  namespace React {
    // Component types
    type FC<P = {}> = any;
    type ReactElement<P = any, T = any> = any;
    type ReactNode = any;
    
    // Event types
    type ChangeEvent<T = Element> = any;
    type FormEvent<T = Element> = any;
    type MouseEvent<T = Element> = any;
    type KeyboardEvent<T = Element> = any;
    type FocusEvent<T = Element> = any;
    
    // State types
    type Dispatch<A> = any;
    type SetStateAction<S> = any;
  }
}

export {};
