
const PreviousArrow = ({onClick}) => {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <i className="fa fa-chevron-left"></i> {/* FontAwesome Left Arrow */}
    </div>
  )
}

const NextArrow = ({onClick}) => {
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <i className="fa fa-chevron-right"></i>
    </div>
  )
}

export { PreviousArrow, NextArrow };