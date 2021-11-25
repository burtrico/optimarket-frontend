// import '../index.css';
// import Mint from '../images/mint.png';

// // Material-UI Imports
// import { Grid } from '@material-ui/core';
// import { Box } from '@material-ui/core';
// import { Container } from '@material-ui/core';
// import {useState} from 'react'
// import Select from 'react-select'


// function NftMint({currentUser, walletNFTs, addToWallet, nftContracts, ethBalance, setEthBalance}) {

//     const [formData, formDataSetter] = useState({
//         quantity: "",
//         price_total: ""
//     })

//     const [contractToMint, setContractToMint] = useState(null)
//     // const [ mintPrice, setMintPrice] = useState('')
    
//     // function renderMintPrice(e) {
//     //     console.log("SELECTED CONTRACT VALUE = ",e.target.value)
//     //     setContractToMint(e.target.value)
//     //     // setMintPrice(e.target.value.price_mint)
//     // }
    
//     function manageFormData(e) {
//         let targetName = e.target.name;
//         let targetValue = e.target.value;
        
//     const newData = {
//         ...formData,
//         [targetName]: targetValue
//     }
//         // Capture name and value from target of event
//         formDataSetter(newData); 
//     }




//         // Create a callback function to handle onSubmit behavior for our controlled form
//     function handleSubmit(e) {
//             // console.log("handleSubmit fired");
//         let newId = parseInt(walletNFTs[walletNFTs.length - 1].id) + 100;

//             // Prevent default form submission behavior
//         e.preventDefault()
        
//             // Create newCard JS object with formData and generate
//             // a unique ID for each new object
//             let num = 1;

//             let local_name ="";
//             // if (contractToMint.collection_name) {local_name = contractToMint.collection_name}
//             // else {let local_name = contractToMint.name}
        
//             let localNft = {
//             // id: newId,
//                 // title: formData.title,
//                 // content: formData.content,

//             // ...formData,
//             collection_name: contractToMint.collection_name,
//             // name: `${local_name} #${num}`,
//             name: `${contractToMint.collection_name} #1`,
//             // collection_name: (contractToMint.asset_contract ? contractToMint.asset_contract.name : contractToMint.collection);
//             token_id: "1",
//             num_sales: 0,
//             background_color: null,
//             image_url: contractToMint.image_url,
//             description: contractToMint.description,
//             token_metadata: contractToMint.token_metadata,
//             created_date: null,
//             price_current: contractToMint.price_mint,   
//             last_sale: contractToMint.price_mint,
//             user_id: currentUser.id,
//             nft_contract_id: null

//         }
        
//             // Use handleAddCard from props to add the newCard JS object
//             // to the existing array of Card objects (cards)
//         addToWallet(localNft);

//             // Clear out input values upon form submission using formDataSetter
//         formDataSetter({
//             //    ...formData,
//             image_url: "",
//             name: ""
//         })
//         setContractToMint('')
//         alert("See wallet for your newly minted NFT!")
//     }
    
//     const handleAddSubmit = (e) => {
//         e.preventDefault()    
//     let localNft = {
//         // id: newId,
//             // title: formData.title,
//             // content: formData.content,

//         // ...formData,
//         collection_name: contractToMint.collection_name,
//         // name: `${local_name} #${num}`,
//         name: `${contractToMint.collection_name} #1`,
//         // collection_name: (contractToMint.asset_contract ? contractToMint.asset_contract.name : contractToMint.collection);
//         token_id: "1",
//         num_sales: 0,
//         background_color: null,
//         image_url: contractToMint.image_url,
//         description: contractToMint.description,
//         token_metadata: contractToMint.token_metadata,
//         created_date: null,
//         price_current: null,   
//         last_sale: contractToMint.price_mint,
//         user_id: currentUser.id,
//         nft_contract_id: contractToMint.id

//     }
//     addToWallet(localNft)
//     formDataSetter({
//         //    ...formData,
//         image_url: "",
//         name: ""
//     })
//     alert("See wallet for your newly minted NFT!")

// }


//     // const collection_options = nftContracts.map(nftContract => {
//     //     return [value:  

//     return(

//         <div class="mintDiv" id="itemList">
       
          

         
         
            
//                   <Container
//                   align="center">
//                   {/* <Grid
//                     align="center"
//                     className="nftCard"

//                     item xs={3}
                    
//                   > */}
//                   <div>
//                   <div class="headingwhat"><img src={Mint} alt="What is an NFT?"/></div>

//             {/* <select type="text" list="cNames" value={contractName} 
//                 onChange={e => {
//                 // setNftContractName(e.target.value)
//                 chooseContract(e.target.value)
//                 console.log("HERE!!!!!!!!!",nftContract)
//                 // renderNftContract()
//                 }}
//                 name="nftContractList" 
//             />
//             <datalist id="cNames">
//                 {nftContracts.map(nftContract => <option key={nftContract.id} value={nftContract.collection_name ? nftContract.collection_name : nftContract.name}>
//                 {nftContract.collection_name ? nftContract.collection_name : nftContract.name}</option>)}
//             </datalist> */}

//           <ul>
//             {nftContracts && nftContracts.map(nftContract6 => (<li  key={nftContract6.id}><button className="nftContractButton" onClick={()=>setContractToMint(nftContract6)}>{nftContract6.collection_name}{nftContract6.name}
//             </button> -- Drop Date: {nftContract6.drop_date} -- Contract ID: {nftContract6.id}</li> ) ) }
//           </ul>

//             {/* <form onSubmit={handleSubmit}> */}
//             <form onSubmit={handleAddSubmit}>

//                 {/* <select 
//                     type="text" 
//                     name="nft_contract_mint"
//                     list="cNames"
//                     className="mintinput"
//                     // onChange={manageNftContract}
//                     onChange={()=>setContractToMint(contractToMint)}
//                     value={contractToMint}
//                 >
//             <datalist id="cNames">
//                 <option value="">Choose a Collection</option>
//                 {nftContracts.map(nftContract5 => {
//                 <option key={nftContract5.id} value={nftContract5}> {nftContract5.collection_name ? nftContract5.collection_name : nftContract5.name} </option> )} 
//             </datalist>
//             </select> */}

//             {/* {contractToMint && <p>Mint Price per NFT = 0.2 ETH</p>} */}
//             {contractToMint && <p>Mint Price per NFT = {contractToMint.price_mint}</p>}

//             <input 
//                     type="integer" 
//                     placeholder="Quantity" 
//                     name="quantity"
//                     className="mintinput"
//                     onChange={manageFormData}
//                     value={formData.quantity}
//                 />

//             <input 
//                 type="decimal" 
//                 placeholder="Total Price (ETH)" 
//                 name="price_total"
//                 className="mintinput"
//                 onChange={manageFormData}
//                 value={formData.price_total}
//             />

//                 <input 
//                     type="submit" 
//                     value="Submit"
//                     className="addButton"
//                 />
//             </form>
//             <p>{formData.image_url}</p>
//             <h3>{formData.name}</h3>
//             {/* <h3>{formData.collection}</h3> */}
            
//         </div>

//                   {/* </Grid> */}
//                   </Container>
                 

//       </div>        
//     )
// }

// export default NftMint;