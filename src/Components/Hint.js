import React from 'react'

const Hint = (props) => {

  // const showHint = (props) => {
  //   console.log('showhint props', props)
  //   if (props.wantHelp) {
  //     return (
  //       <div>
  //         <p>You can calculate the BPM by counting the beats for 15 seconds, and multiplying the result by 4!</p>
  //       </div>
  //     )
  //   }
  // }

  return(
    <div>
      <h3>Try Again</h3>
      <h1>Want a hint?</h1>
      <button>Eventually Get Hint</button>
    </div>
  ) 
}

export default Hint 