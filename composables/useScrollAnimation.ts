export function useScrollAnimation(options: {
  threshold?: number
  rootMargin?: string
} = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    const el = elementRef.value
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)

    onUnmounted(() => observer.disconnect())
  })

  return { elementRef, isVisible }
}
