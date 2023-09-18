// jest.d.ts
declare namespace jest {
  interface Matchers<R, T> {
    toHaveBeenCalledWith(...expected: any[]): R;
  }
}
