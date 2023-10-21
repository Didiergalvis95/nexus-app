import '../../assets/styles/Navbar.css'
import Icon from './Icon'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
    return (
        <div className="nav-bar">
            <div className="group">
                <div className="text-wrapper">Home</div>
                <div className="text-wrapper">Dashboard</div>
                <div className="text-wrapper">Stream</div>
            </div>
            <div className="group-2">
              <div className='text-wrapper-2'>NEXUS</div>
            </div>
            <div className="group-3">
              <div><Icon icon={faMagnifyingGlass} css='' /></div>
              <div><Icon icon={faCartShopping} css='' /></div>
              <div><Icon icon={faUser} css=''/></div>
            </div>
        </div>
    )
}

export default Navbar
