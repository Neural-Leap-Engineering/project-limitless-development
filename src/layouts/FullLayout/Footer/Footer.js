import React from 'react'
import {
    Box,
    Link,
    Typography,
    
  } from "@mui/material";
const Footer = () => {
    return ( 
        <Box sx={{p:3, textAlign:'center', marginTop:'50px'}}>
            <Typography>© 2024 All rights reserved by <Link href="https://www.neuralleap.ai/">www.neuralleap.ai</Link> </Typography>
        </Box>
     );
}
 
export default Footer;