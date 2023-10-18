import '../assets/styles/Navbar.css'

const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="group">
       {/* <img class="element" src="img/4-1.png" /> */}
        <div className="text-wrapper">blogs | streams</div>
        <div className="div">Nexus calling</div>
      </div>
      <div className="group-2">
      <div className="text-wrapper-2">Home</div>
        <div className="text-wrapper-2">Dashboard</div>
        <div className="text-wrapper-2">Blog</div>
      </div>
    </div>
  )
}

export default Navbar
