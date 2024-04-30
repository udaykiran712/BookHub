import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class BookDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, bookIdDetails: []}

  componentDidMount() {
    this.getApiBookDetails()
  }

  onClickTryAgain = () => {
    this.getApiBookDetails()
  }

  getApiBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookIdDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSection1 = () => {
    const {bookIdDetails} = this.state
    const {coverPic, title, authorName, rating, readStatus} = bookIdDetails

    return (
      <div className="bookDetails-section1">
        <img src={coverPic} alt={title} className="bookCoverPic" />
        <div className="thatBookDetails">
          <h1 className="thatBookTitle">{title}</h1>
          <p className="thatBookAuthor">{authorName}</p>
          <div className="eachBookRatingContainer">
            <p className="thatBookRating">Avg Rating</p>
            <BsFillStarFill className="ratingStarImage" />
            <p className="thatBookRating">{rating}</p>
          </div>
          <p className="thatBookStatusTitle">
            Status: <span className="thatBookReadStatus">{readStatus}</span>
          </p>
        </div>
      </div>
    )
  }

  renderAuthorAndBookDetails = () => {
    const {bookIdDetails} = this.state
    const {aboutAuthor, aboutBook} = bookIdDetails
    return (
      <div className="bookDetails-section2">
        <hr className="hr-line" />
        <h1 className="heading">About Author</h1>
        <p className="description">{aboutAuthor}</p>
        <h1 className="heading">About Book</h1>
        <p className="description">{aboutBook}</p>
      </div>
    )
  }

  onSuccessApi = () => (
    <>
      {this.renderSection1()}
      {this.renderAuthorAndBookDetails()}
    </>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

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

  renderFinalDetails = () => {
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
    return (
      <div>
        <Header />
        <div className="main-container">
          <div className="bookIdDetailsContainer">
            {this.renderFinalDetails()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default BookDetails
