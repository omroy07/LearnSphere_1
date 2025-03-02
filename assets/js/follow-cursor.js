document.querySelector('.glass-morphism-container-hover-effect-1').onmousemove = (e) => {
    const x = e.pageX - e.target.offsetLeft
    const y = e.pageY - e.target.offsetTop
    e.target.style.setProperty('--x', `${ x }px`)
    e.target.style.setProperty('--y', `${ y }px`)
}
document.querySelector('.glass-morphism-container-hover-effect-2').onmousemove = (e) => {
    const x = e.pageX - e.target.offsetLeft
    const y = e.pageY - e.target.offsetTop
    e.target.style.setProperty('--x', `${ x }px`)
    e.target.style.setProperty('--y', `${ y }px`)
}
document.querySelector('.glass-morphism-container-hover-effect-3').onmousemove = (e) => {
    const x = e.pageX - e.target.offsetLeft
    const y = e.pageY - e.target.offsetTop
    e.target.style.setProperty('--x', `${ x }px`)
    e.target.style.setProperty('--y', `${ y }px`)
}