/// <reference types="react" />

declare namespace React {
  // Re-export commonly used React types for namespace access
  type FC<P = {}> = React.FC<P>;
  type ReactElement = React.ReactElement;
  type ReactNode = React.ReactNode;
  type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  type FormEvent<T = Element> = React.FormEvent<T>;
  type MouseEvent<T = Element> = React.MouseEvent<T>;
  type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  type Dispatch<A> = React.Dispatch<A>;
  type SetStateAction<S> = React.SetStateAction<S>;
}
