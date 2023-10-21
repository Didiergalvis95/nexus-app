import '../../assets/styles/Button.css'
import Icon from './Icon'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Button = () => {
  return (
    <div className="buttons">
      <button id="prev"><Icon icon={faAngleLeft} css='' /></button>
      <button id="next"><Icon icon={faAngleRight} css='' /></button>
    </div>
  )
}

export default Button
