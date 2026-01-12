# Troubleshooting: Click Effect Error in questions/page.tsx

## Problem

You may see a syntax or runtime error if you add this code block directly inside the JSX map function:

```
if (typeof window !== "undefined") {
  document.addEventListener("mousedown", function (e) {
    const label = e.target.closest("label")
    if (label && label.querySelector(".click-effect")) {
      const effect = label.querySelector(".click-effect")
      effect.style.left = `${e.offsetX}px`
      effect.style.top = `${e.offsetY}px`
      effect.style.width = effect.style.height = "0px"
      effect.classList.remove("active")
      setTimeout(() => {
        effect.classList.add("active")
        effect.style.width = effect.style.height = "200px"
        setTimeout(() => {
          effect.classList.remove("active")
          effect.style.width = effect.style.height = "0px"
        }, 350)
      }, 10)
    }
  })
}
```

## Why This Causes an Error

- **Invalid Placement:** This code is placed inside the JSX return, specifically inside the map function, which is not valid JavaScript/JSX syntax. You cannot put statements like `if` or event listeners directly inside JSX.
- **Side Effects in Render:** Adding event listeners inside render logic will cause multiple listeners to be added on every render, leading to memory leaks and unexpected behavior.

## Correct Usage

- Place side-effect code (like event listeners) inside a `useEffect` hook at the top level of your component, not inside JSX.
- Example:

```tsx
import { useEffect } from "react"

useEffect(() => {
  function handleMouseDown(e) {
    const label = e.target.closest("label")
    if (label && label.querySelector(".click-effect")) {
      const effect = label.querySelector(".click-effect")
      effect.style.left = `${e.offsetX}px`
      effect.style.top = `${e.offsetY}px`
      effect.style.width = effect.style.height = "0px"
      effect.classList.remove("active")
      setTimeout(() => {
        effect.classList.add("active")
        effect.style.width = effect.style.height = "200px"
        setTimeout(() => {
          effect.classList.remove("active")
          effect.style.width = effect.style.height = "0px"
        }, 350)
      }, 10)
    }
  }
  document.addEventListener("mousedown", handleMouseDown)
  return () => document.removeEventListener("mousedown", handleMouseDown)
}, [])
```

- This ensures the event listener is only added once and cleaned up properly.

## Summary
- Do not put event listeners or `if` statements inside JSX.
- Use `useEffect` for side effects in React components.
- Always clean up event listeners in the cleanup function returned by `useEffect`.
