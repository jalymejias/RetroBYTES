import {
  Grid,
  Box,
  Paper,
  Typography,
} from "@material-ui/core";
import VideoBkg from "../../../components/vidFootage/videobg"; 
import robotError from '../../../assets/images/robot404.png'


const paperStyle = {
  padding: 20,
  height: "55vh",
  width: 480,
  margin: "20px auto",
  opacity: "0.7"
};


const CategoryPageError = () => {
 

  return (
    <>
 
      <>
      </> : 
      <>
<Box

        
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="20vh"
        marginLeft="40vh"
          component="form"
          sx={{
            "& > :not(style)": { m: 3, width: "55ch" },
            
          }}
        >
          <Grid container >
            <Paper elevation={10} style={paperStyle}>
              <Grid item align="center">
                <Box style={{ marginTop: "20px"}}>
                

                  <Typography style={{ fontSize: "2rem", fontWeight: 600, textTransform:'uppercase' }}>
                    En este momento
                  </Typography>
                  <Typography style={{ fontSize: "2rem", fontWeight: 600, textTransform:'uppercase' }}>
                    No hay productos en esta categoría
                  </Typography>
                  <img src={robotError} alt="RobotError" />
                </Box>
              </Grid>
            </Paper>
          <VideoBkg />
          </Grid>
        </Box>
      </>
      };
    
    </>
  );
};

export default CategoryPageError;
