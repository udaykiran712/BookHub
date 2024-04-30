import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

const BookshelvesItem = props => {
  const {bookDetails} = props

  //    console.log(bookDetails)
  const {id, coverPic, authorName, rating, readStatus, title} = bookDetails
  return (
    <li className="bookContainer">
      <Link to={`/books/${id}`} className="link">
        <img src={coverPic} alt={title} className="coverPic" />
        <div className="bookDetailsContainer">
          <h1 className="bookName">{title}</h1>
          <p className="authorName">{authorName}</p>
          <div className="ratingContainer">
            <p className="rating">Avg Rating</p>
            <BsFillStarFill className="ratingStar" />
            <p className="rating">{rating}</p>
          </div>
          <p className="statusTitle">
            Status: <span className="readStatus">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BookshelvesItem
