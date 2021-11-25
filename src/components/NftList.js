import NFTcard from './NftCard.js'
import '../index.css';

// Material-UI Imports
import { createChainedFunction, Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Opensea from '../images/opensea.png';
import Powered from '../images/powered.png';

function NftList({ apiData, addToWallet }) {




    return(
        <div id="itemList">
          <Container align="center"  >    
            <Box  m={5}     >
            <Grid
                // gap={10}
                // row-gap={10}
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={10}
                // justifyContent="space-between"
            >
            { apiData.map(
            function(objectIn){
                  return(
                    <Grid
                      className="nftCard"
                      key={objectIn.id}
                      item xs={3} 
                    >
                    <NFTcard
                      nftObj={objectIn}
                      addToWallet={addToWallet}
                    />
                    </Grid>
            )   })   }

            </Grid>
            </Box>
            </Container>  

        <div class="footer">
          <img  src={Powered} alt="powered by"/> 
          <a target="_blank" href="https://docs.opensea.io/"><img class="openlogo" src={Opensea} alt="Opensea"/></a>
          </div>
        </div>
    )


    // return( <div></div> )
}

export default NftList;

