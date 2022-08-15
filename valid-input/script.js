const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
  input.addEventListener("keydown", (e) => {
    const el = e.target
    if (el.value.trim() === '') {
      el.setAttribute("aria-valid", "false")
    } else {
      el.setAttribute("aria-valid", "true")
    }
  })
})