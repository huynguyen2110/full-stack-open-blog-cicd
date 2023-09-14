import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showVisible = { display: visible ? '' : 'none' }
  const hideVisible = { display: visible ? 'none' : '' }

  const toggleVisible = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <>
      <div style={hideVisible}>
        <button onClick={toggleVisible}>new blog</button>
      </div>
      <div style={showVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>

    </>
  )

})

Togglable.displayName = 'Togglable'
export default Togglable