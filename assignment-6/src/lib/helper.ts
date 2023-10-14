export function delay(milsec: number) {
  return new Promise((res) => {
    setTimeout(res, milsec);
  });
}
