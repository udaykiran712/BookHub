import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import Footer from '../Footer'

import Header from '../Header'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // Change the breakpoint to 768px
      settings: {
        slidesToShow: 2, // Show 2 slides on devices less than 768px
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksData: [],
  }

  componentDidMount() {
    this.getApiTopRatedBooks()
  }

  onClickTryAgain = () => {
    this.getApiTopRatedBooks()
  }

  getApiTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const booksData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({apiStatus: apiStatusConstants.success, booksData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {booksData} = this.state
    return (
      <ul className="topRatedUnorderedList">
        <Slider {...settings}>
          {booksData.map(eachBook => {
            const {id, authorName, coverPic, title} = eachBook
            const uniqueKey = `book-${id}`
            return (
              <Link to={`/books/${id}`} className="link" key={uniqueKey}>
                <li className="slick-item">
                  <img
                    src={coverPic}
                    alt={title}
                    className="topRatedCoverPic"
                  />
                  <h1 className="topRatedBook-title">{title}</h1>
                  <p className="topRatedBookAuthorName">{authorName}</p>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  onApiFailure = () => (
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

  renderTopRatedBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.onApiFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="HomePage">
        <Header />
        <div className="homeContainer">
          <h1 className="homeHeading">Find Your Next Favorite Books?</h1>
          <p className="homeDescription">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf">
            <button type="button" className="sm-FindBooksButton">
              Find Books
            </button>
          </Link>
          <div className="topRatedBooks">
            <div className="topRatedBooks-header">
              <h1 className="topRated-heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button type="button" className="FindBooksButton">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="carousel-container">
              {this.renderTopRatedBooks()}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
