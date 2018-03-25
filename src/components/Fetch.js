// @flow
import * as React from "react"

export type FetchPropsType = {|
  url: string,
  loading?: React.Node,
  success: React.Node,
  error?: React.Node,
  refetchKey?: string,
  onSuccess?: (json: {}) => void,
  onError?: (err: {}) => void,
|}
type State = {
  isFetched: boolean,
  didFail: boolean,
}
class Fetch extends React.Component<FetchPropsType, State> {
  static defaultProps = {
    loading: null,
    success: null,
    error: null,
  }
  state = { isFetched: false, didFail: false }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps: FetchPropsType) {
    if (prevProps.refetchKey !== this.props.refetchKey) {
      this.fetchData()
    }
  }

  fetchData() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(this.props.onSuccess)
      .then(() => this.setState({ isFetched: true }))
      .catch(err => {
        this.onError(err)
        this.setState({ didFail: true })
      })
  }

  render() {
    const { loading, error, success } = this.props
    const { isFetched, didFail } = this.state

    return !isFetched ? loading : didFail ? error : success
  }
}

type CurriedFetchPropsType = $Diff<FetchPropsType, { success: React.Node }>

export const withFetch = <T>(
  fetchProps: CurriedFetchPropsType | ((props: T) => CurriedFetchPropsType)
) => (BaseComponent: React.ComponentType<{}>) => (props: T) => {
  const computedProps =
    typeof fetchProps === "function" ? fetchProps(props) : fetchProps

  return (
    <Fetch {...(computedProps: any)} success={<BaseComponent {...props} />} />
  )
}

export default Fetch
