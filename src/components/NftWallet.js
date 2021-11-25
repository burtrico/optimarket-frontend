import '../index.css';

// Material-UI Imports
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import NFTcard from './NftCard';


function NftWallet({walletNFTs, removeFromWallet, ethBalance, setEthBalance}) {


    return(
        <div id="itemList">
          <Container align="center">    
            

            <Box m={5}>
            <Grid
                container
                spacing={10}
                direction="row"
            >
                        
            { walletNFTs && walletNFTs.map(objectIn => {
            return(
                <Grid
                  className="nftCard"
                  key={objectIn.id}
                  item xs={3}
                >

                  <NFTcard
                   nftObj={objectIn}
                   removeFromWallet={removeFromWallet}

                  />
                </Grid>
              )}
            )}





            </Grid>
            </Box>
            </Container> 
            
        <div class="footer">

          {/* <a target="_blank" href=?><img class="openlogo" src={?} alt="?"/></a> */}
        </div>

        </div>
    )
}

export default NftWallet;