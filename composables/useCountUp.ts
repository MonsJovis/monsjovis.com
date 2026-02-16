export function useCountUp(target: number, duration = 1500) {
  const current = ref(0)
  let started = false

  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }

  function start() {
    if (started) return
    started = true

    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      current.value = Math.round(easeOutCubic(progress) * target)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  return { current, start }
}
