import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
  
function Layout(props: any) {
  return (
    <React.Fragment>
      <CssBaseline />
      <div>{props.children}</div>
    </React.Fragment>
  )
}
export default Layout
