declare module '*.vue' {
  import type { Component } from 'vue'
  const component: Component
  export default component
}

declare type Nullable<T> = T | null
