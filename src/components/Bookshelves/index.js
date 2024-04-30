import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import BookshelvesItem from '../BookshelvesItem'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookshelfName: 'ALL',
    activeValue: 'All',
    searchInput: '',
    search: '',
    bookshelvesData: [],
  }

  componentDidMount() {
    this.getReadBooksApi()
  }

  onClickSearchIcon = () => {
    this.setState(
      prevState => ({search: prevState.searchInput}),
      this.getReadBooksApi,
    )
  }

  onClickBookStatus = event => {
    const {id, value} = event.target.dataset
    this.setState(
      {
        bookshelfName: id,
        activeValue: value,
      },
      this.getReadBooksApi,
    )
  }

  onClickTryAgain = () => {
    this.getReadBooksApi()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getReadBooksApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookshelfName, search} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(eachItem => ({
        id: eachItem.id,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        rating: eachItem.rating,
        readStatus: eachItem.read_status,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookshelvesData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLeftNavbar = () => {
    const {bookshelfName} = this.state
    return (
      <div className="section1">
        <h1 className="section1-heading">Bookshelves</h1>
        <ul className="section1-list">
          {bookshelvesList.map(eachItem => (
            <li
              key={eachItem.id}
              data-id={eachItem.value} // Use 'data-id' attribute to store the id
              data-value={eachItem.label}
              className={`${
                eachItem.value === bookshelfName
                  ? 'normalStatus bookStatusActive'
                  : 'normalStatus'
              }`}
              onClick={this.onClickBookStatus}
            >
              {eachItem.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  noBooksFoundView = () => {
    const {search} = this.state
    console.log(search)
    return (
      <div className="noBooksFoundViewContainer">
        <img
          src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694916803/Asset_1_1_vsebm2.png"
          alt="no books"
          className="noBooks"
        />
        <p className="noBooks-title">
          Your search for {search} did not find any matches.
        </p>
      </div>
    )
  }

  onSuccessApi = () => {
    const {bookshelvesData, bookshelfName} = this.state
    if (bookshelvesData.length === 0) {
      return this.noBooksFoundView()
    }
    return (
      <div className="section2">
        <div className="sm-Navbar">
          <h1 className="sm-Bookshelves-Heading">Bookshelves</h1>
          {bookshelvesList.map(eachItem => (
            <button
              type="button"
              key={eachItem.id}
              data-id={eachItem.value}
              data-value={eachItem.label}
              onClick={this.onClickBookStatus}
              className={`${
                eachItem.value === bookshelfName
                  ? 'activeBtn normalBtn'
                  : 'normalBtn'
              }`}
            >
              {eachItem.label}
            </button>
          ))}
        </div>
        <div className="section2-2">
          <ul className="books">
            {bookshelvesData.map(eachItem => (
              <BookshelvesItem bookDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onFailureApi = () => (
    <div className="failureView-container">
      <img
        src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694930693/Group_7522failureCase_ydyurk.png"
        alt="failure view"
      />
      <p className="failureView-title">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={this.onClickTryAgain}
        className="tryAgainBtn"
      >
        Try Again
      </button>
    </div>
  )

  renderBookShelves = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.onSuccessApi()
      case apiStatusConstants.failure:
        return this.onFailureApi()
      default:
        return null
    }
  }

  render() {
    const {searchInput, activeValue} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-container">
          {this.renderLeftNavbar()}
          <div className="section2">
            <div className="section2-1">
              <h1 className="section2-1-heading">{`${activeValue} Books`}</h1>
              <div className="search-container">
                <input
                  type="search"
                  className="search-bar"
                  onChange={this.onChangeSearchInput}
                  placeholder="Search"
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="searchBtn"
                  onClick={this.onClickSearchIcon}
                >
                  <BsSearch className="searchIcon" />
                </button>
              </div>
            </div>
            {this.renderBookShelves()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
