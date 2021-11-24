/* External Imports */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import { convertUtf8ToHex } from "@walletconnect/utils"
import { IInternalEvent } from "@walletconnect/types"

/* Internal Imports */
import Button from "./components/Button"
import Column from "./components/Column"
import Wrapper from "./components/Wrapper"
import Modal from "./components/Modal"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Banner from "./components/Banner"
import AccountAssets from "./components/AccountAssets"

/* Helpers */
import { apiGetAccountAssets, apiGetGasPrices, apiGetAccountNonce } from "./helpers/api"
import {
  sanitizeHex,
  verifySignature,
  hashTypedDataMessage,
  hashMessage,
} from "./helpers/utilities"
import { convertAmountToRawNumber, convertStringToHex } from "./helpers/bignumber"
import { IAssetData, ITxData } from "./helpers/types"
import { eip712 } from "./helpers/eip712"

/* Styles */
import { fonts } from "./styles"


const SLayout = styled.div`
  position: relative
  width: 100%
  /* height: 100% */
  min-height: 100vh
  text-align: center
`

const SContent = styled(Wrapper as any)`
  width: 100%
  height: 100%
  padding: 0 16px
`

const SLanding = styled(Column as any)`
  height: 600px
`

const SButtonContainer = styled(Column as any)`
  width: 250px
  margin: 50px 0
`

const SConnectButton = styled(Button as any)`
  border-radius: 8px
  font-size: ${ fonts.size.medium }
  height: 44px
  width: 100%
  margin: 12px 0
`

const SContainer = styled.div`
  height: 100%
  min-height: 200px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  word-break: break-word
`

const SModalContainer = styled.div`
  width: 100%
  position: relative
  word-wrap: break-word
`

const SModalTitle = styled.div`
  margin: 1em 0
  font-size: 20px
  font-weight: 700
`

const SModalParagraph = styled.p`
  margin-top: 30px
`

// @ts-ignore
const SBalances = styled(SLanding as any)`
  height: 100%
  & h3 {
    padding-top: 30px
  }
`

const STable = styled(SContainer as any)`
  flex-direction: column
  text-align: left
`

const SRow = styled.div`
  width: 100%
  display: flex
  margin: 6px 0
`

const SKey = styled.div`
  width: 30%
  font-weight: 700
`

const SValue = styled.div`
  width: 70%
  font-family: monospace
`

const STestButtonContainer = styled.div`
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
`

const STestButton = styled(Button as any)`
  border-radius: 8px
  font-size: ${ fonts.size.medium }
  height: 44px
  width: 100%
  max-width: 175px
  margin: 12px
`

interface IAppState {
  connector: WalletConnect | null
  fetching: boolean
  connected: boolean
  chainId: number
  showModal: boolean
  pendingRequest: boolean
  uri: string
  accounts: string[]
  address: string
  result: any | null
  assets: IAssetData[]
}

const INITIAL_STATE: IAppState = {
  connector: null,
  fetching: false,
  connected: false,
  chainId: 1,
  showModal: false,
  pendingRequest: false,
  uri: "",
  accounts: [],
  address: "",
  result: null,
  assets: [],
}



const App = () => {
  const [connector, setConnector] = useState<WalletConnect | null>(null)
  const [accounts, setAccounts] = useState<string[]>([''])
  const [assets, setAssets] = useState<IAssetData[]>([])
  const [address, setAddress] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  const [chainId, setChainId] = useState<number>(0)
  const [fetching, setFetching] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [pendingRequest, setPendingRequest] = useState<boolean>(false)
  const [result, setResult] = useState<any | null>()

  const connect = async () => {
    // bridge url
    const bridge = "https://bridge.walletconnect.org"

    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal })

    useEffect(() => {
      // await this.setState({ connector })
      setConnector(connector)
    }, [])

    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession()
    }

    // subscribe to events
    subscribeToEvents()
  }
  const subscribeToEvents = () => {
    // const { connector } = this.state

    if (!connector) {
      return
    }

    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`)

      if (error) {
        throw error
      }

      const { chainId, accounts } = payload.params[0]
      onSessionUpdate(accounts, chainId)
    })

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`)

      if (error) {
        throw error
      }

      onConnect(payload)
    })

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`)

      if (error) {
        throw error
      }

      onDisconnect()
    })

    if (connector.connected) {
      const { chainId, accounts } = connector
      const address = accounts[0]

      useEffect(() => {
        setConnected(true)
        setChainId(chainId)
        setAccounts(accounts)
        setAddress(address)
      }, [])
      // this.setState({
      //   connected: true,
      //   chainId,
      //   accounts,
      //   address,
      // })
      onSessionUpdate(accounts, chainId)
    }

    useEffect(() => {
      setConnector(connector)
    }, [])
    // this.setState({ connector })
  }

  const killSession = async () => {
    if (connector) {
      connector.killSession()
    }
    resetApp()
  }

  const resetApp = async () => {
    useEffect(() => {
      setConnector(null)
      setAccounts([])
      setAssets([])
      setAddress('')
      setConnected(false)
      setChainId(0)
      setFetching(false)
      setShowModal(false)
      setPendingRequest(false)
      setResult([])
    }, [])
    // await this.setState({ ...INITIAL_STATE })
  }

  const onConnect = async (payload: IInternalEvent) => {
    const { chainId, accounts } = payload.params[0]
    const address = accounts[0]

    useEffect(() => {
      setConnected(true)
      setChainId(chainId)
      setAccounts(accounts)
      setAddress(address)
    }, [])

    // await this.setState({
    //   connected: true,
    //   chainId,
    //   accounts,
    //   address,
    // })
    getAccountAssets()
  }

  const onDisconnect = async () => {
    resetApp()
  }

  const onSessionUpdate = async (accounts: string[], chainId: number) => {
    const address = accounts[0]

    useEffect(() => {
      setChainId(chainId)
      setAccounts(accounts)
      setAddress(address)
    }, [])
    // await this.setState({ chainId, accounts, address })
    await getAccountAssets()
  }

  const getAccountAssets = async () => {
    useEffect(() => {
      setFetching(true)
    }, [])
    // this.setState({ fetching: true })

    try {
      // get account balances
      const assets = await apiGetAccountAssets(address, chainId)

      useEffect(() => {
        setFetching(false)
        setAddress(address)
        setAssets(assets)
      }, [])

      // await this.setState({ fetching: false, address, assets })
    } catch (error) {
      console.error(error)

      useEffect(() => {
        setFetching(false)
      }, [])
      // await this.setState({ fetching: false })
    }
  }

  const toggleModal = () => {
    useEffect(() => {
      /**
       * @todo Confirm that this works!
       */
      setShowModal(!showModal)
    }, [])
    // this.setState({ showModal: !this.state.showModal })
  }

  const sendTransaction = async () => {
    // const { connector, address, chainId } = this.state

    if (!connector) {
      return
    }

    // from
    const from = address

    // to
    const to = address

    // nonce
    const _nonce = await apiGetAccountNonce(address, chainId)
    const nonce = sanitizeHex(convertStringToHex(_nonce))

    // gasPrice
    const gasPrices = await apiGetGasPrices()
    const _gasPrice = gasPrices.slow.price
    const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9)))

    // gasLimit
    const _gasLimit = 21000
    const gasLimit = sanitizeHex(convertStringToHex(_gasLimit))

    // value
    const _value = 0
    const value = sanitizeHex(convertStringToHex(_value))

    // data
    const data = "0x"

    // test transaction
    const tx: ITxData = {
      from,
      to,
      nonce,
      gasPrice,
      gasLimit,
      value,
      data,
    }

    try {
      // open modal
      toggleModal()

      // toggle pending request indicator
      useEffect(() => {
        setPendingRequest(true)
      }, [])
      // this.setState({ pendingRequest: true })

      // send transaction
      const result = await connector.sendTransaction(tx)

      // format displayed result
      const formattedResult = {
        method: "eth_sendTransaction",
        txHash: result,
        from: address,
        to: address,
        value: "0 ETH",
      }

      // display result
      useEffect(() => {
        setConnector(connector)
        setPendingRequest(false)
        setResult(formattedResult || null)
      }, [])

      // this.setState({
      //   connector,
      //   pendingRequest: false,
      //   result: formattedResult || null,
      // })
    } catch (error) {
      console.error(error)

      useEffect(() => {
        setConnector(connector)
        setPendingRequest(false)
        setResult(null)
      }, [])
      // this.setState({ connector, pendingRequest: false, result: null })
    }
  }

  const signMessage = async () => {
    // const { connector, address, chainId } = this.state

    if (!connector) {
      return
    }

    // test message
    const message = `My email is john@doe.com - ${ new Date().toUTCString() }`

    // encode message (hex)
    const hexMsg = convertUtf8ToHex(message)

    // eth_sign params
    const msgParams = [address, hexMsg]

    try {
      // open modal
      toggleModal()

      // toggle pending request indicator
      useEffect(() => {
        setPendingRequest(true)
      }, [])
      // this.setState({ pendingRequest: true })

      // send message
      const result = await connector.signMessage(msgParams)

      // verify signature
      const hash = hashMessage(message)
      const valid = await verifySignature(address, result, hash, chainId)

      // format displayed result
      const formattedResult = {
        method: "eth_sign",
        address,
        valid,
        result,
      }

      // display result
      useEffect(() => {
        setConnector(connector)
        setPendingRequest(false)
        setResult(formattedResult || null)
      }, [])
      // this.setState({
      //   connector,
      //   pendingRequest: false,
      //   result: formattedResult || null,
      // })
    } catch (error) {
      console.error(error)

      useEffect(() => {
        setConnector(connector)
        setPendingRequest(false)
        setResult(null)
      }, [])
      // this.setState({ connector, pendingRequest: false, result: null })
    }
  }

  const signTypedData = async () => {
    // const { connector, address, chainId } = this.state
    if (!connector) {
      return
    }

    const message = JSON.stringify(eip712.example)

    // eth_signTypedData params
    const msgParams = [address, message]

    try {
      // open modal
      toggleModal()

      // toggle pending request indicator
      useEffect(() => {
        setPendingRequest(true)
      }, [])
      // this.setState({ pendingRequest: true })

      // sign typed data
      const result = await connector.signTypedData(msgParams)

      // verify signature
      const hash = hashTypedDataMessage(message)
      const valid = await verifySignature(address, result, hash, chainId)

      // format displayed result
      const formattedResult = {
        method: "eth_signTypedData",
        address,
        valid,
        result,
      }

      // display result
      useEffect(() => {
        setConnector(connector)
        setPendingRequest(false)
        setResult(formattedResult || null)
      }, [])
      // this.setState({
      //   connector,
      //   pendingRequest: false,
      //   result: formattedResult || null,
      // })
    } catch (error) {
      console.error(error)

      useEffect(() => {
        setConnector(connector)
        setPendingRequest(false)
        setResult(null)
      }, [])
      // this.setState({ connector, pendingRequest: false, result: null })
    }
  }

  return (
    <SLayout>
      <Column maxWidth={1000} spanHeight>
        <Header
          connected={connected}
          address={address}
          chainId={chainId}
          killSession={killSession}
        />
        <SContent>
          {!address && !assets.length ? (
            <SLanding center>
              <h3>
                {`Try out WalletConnect`}
                <br />
                <span>{`v${ process.env.REACT_APP_VERSION }`}</span>
              </h3>
              <SButtonContainer>
                <SConnectButton left onClick={connect} fetching={fetching}>
                  {"Connect to WalletConnect"}
                </SConnectButton>
              </SButtonContainer>
            </SLanding>
          ) : (
            <SBalances>
              <Banner />
              <h3>Actions</h3>
              <Column center>
                <STestButtonContainer>
                  <STestButton left onClick={sendTransaction}>
                    {"eth_sendTransaction"}
                  </STestButton>

                  <STestButton left onClick={signMessage}>
                    {"eth_sign"}
                  </STestButton>

                  <STestButton left onClick={signTypedData}>
                    {"eth_signTypedData"}
                  </STestButton>
                </STestButtonContainer>
              </Column>
              <h3>Balances</h3>
              {!fetching ? (
                <AccountAssets chainId={chainId} assets={assets} />
              ) : (
                <Column center>
                  <SContainer>
                    <Loader />
                  </SContainer>
                </Column>
              )}
            </SBalances>
          )}
        </SContent>
      </Column>
      <Modal show={showModal} toggleModal={toggleModal}>
        {pendingRequest ? (
          <SModalContainer>
            <SModalTitle>{"Pending Call Request"}</SModalTitle>
            <SContainer>
              <Loader />
              <SModalParagraph>{"Approve or reject request using your wallet"}</SModalParagraph>
            </SContainer>
          </SModalContainer>
        ) : result ? (
          <SModalContainer>
            <SModalTitle>{"Call Request Approved"}</SModalTitle>
            <STable>
              {Object.keys(result).map(key => (
                <SRow key={key}>
                  <SKey>{key}</SKey>
                  <SValue>{result[key].toString()}</SValue>
                </SRow>
              ))}
            </STable>
          </SModalContainer>
        ) : (
          <SModalContainer>
            <SModalTitle>{"Call Request Rejected"}</SModalTitle>
          </SModalContainer>
        )}
      </Modal>
    </SLayout>
  )
}

export default App
