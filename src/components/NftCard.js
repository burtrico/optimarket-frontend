
// import NFTwallet from './NFTwallet.js'
import '../index.css';
import Popup from './Popup';
import React, { useState } from 'react'

function NftCard({nftObj, addToWallet, removeFromWallet}) {

    const [addNFT, walletSetter] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => { setIsOpen(!isOpen); }

    // function addToWallet() { walletSetter(!addNFT) }

    // const renderPrice=()=> {
    //   // if(nftObj.last_sale !== null) {
    //   //   if(nftObj.last_sale.payment_token.eth_price !== null ) {
    //   //     return(<h4>{nftObj.last_sale.payment_token.eth_price}</h4>)
    //   let x = 20;
    //   // if(nftObj.asset_contract && nftObj.asset_contract.name === "cryptopunks") { let x = 2000 }
    //   // if(nftObj.asset_contract && nftObj.asset_contract.name === "boredapeyachtclub") { let x = 300 }
    //   // else if(nftObj.asset_contract && nftObj.asset_contract.name === "pudgypenguins") { let x = 10 }
    //   // else  { let x = 20 }
    //     const price = (Math.random()*20).toFixed(1)
    //     // return( <div className="divPrice"> <h4>{price}</h4></div>  )
    //     return( <><h4>{price} - Price</h4></>  )

    //   // } } 
    // }
    // renderPrice();

    

    // const image = require(nftObj.image_url)
    // let image = nftObj.image_url;

    const price = (Math.random()*20).toFixed(1)

    if (nftObj.price_current === null) { nftObj.price_current = price }
  

    return (
        <div >
          <div className="cardInfoDiv">
            <img src={nftObj.image_url} className="nftImage" alt="no img" />
            <h3 className="cardname">{nftObj.name}</h3>  
            <h4 className="cardcontract">{nftObj.collection_name}</h4>
            <div className="cardprice"><h4>{nftObj.price_current ? nftObj.price_current : price } - Price</h4></div>
            <div className="lastsale">{nftObj.last_sale ? `${nftObj.last_sale} - Last` : ""} </div>
          </div>

          <div className="infoButtonDiv"> 
            <button
            className="infoButton"
            onClick={togglePopup} >More Info</button> 
          </div> 

      <div className="addButtonDiv" tabIndex="0">

        <button className="addButton" onClick={addToWallet ? ()=>addToWallet(nftObj) 
                 : ()=>removeFromWallet(nftObj)}>
        { (addToWallet) ? "Buy NFT" : "Sell NFT"}
        </button>

      
      </div>
      
          {isOpen && <Popup
          content={<>
            <b> {nftObj.name} Additonal Info</b>
            <p> Token ID: {nftObj.token_id}</p>
            <p> Number of Sales: {nftObj.num_sales}</p>
            <p> Background Color: {nftObj.background_color}</p>
            <p> Image URL: {nftObj.image_url}</p>
            <p> Description: {nftObj.description}</p>
            <p> Token Metadata: {nftObj.token_metadata}</p>
            <p> Created Date: {nftObj.created_date}</p>
            {/* <p> {nftObj.user_id}</p> */}
            {/* <p> {nftObj.nft_contract_id}</p> */}
            {/* <button>Test Button</button> */}

          </>}
          
          handleClose={togglePopup}
          nftObj={nftObj}
          
          />}
      
    </div>
    )
    
}

export default NftCard;