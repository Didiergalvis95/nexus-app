import { useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.css'
import Slide from '../Slide/Slide'
import Wrapper from '../Wrapper/Wrapper'
import Icon from '../Icon/Icon'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Home = () => {
  const textos = ["01", "02", "03", "04"];

  const clubImages = [ "/img/titansWallpaper.jpg", "/img/escanor.jpg", "/img/hero.jpg",  "/img/demonSlayer.jpg"];

  const wallpaperImages = ["/img/demonWallpaper.png", "/img/titansWallpaper.png", "/img/melodias.jpeg", "/img/myHeroWallpaper.png"];
  const videoImages =["https://www.youtube.com/embed/-AwLMRgcEoA?si=YALZpeWaRzmCMMaJ&amp;start=3", "https://www.youtube.com/embed/FRn6xXXF-7s?si=_OjpcMZRjDqfImyr&amp;start=9", "https://www.youtube.com/embed/wxcvbL6o55M?si=n50OlTU5cEXxxsZw&amp;start=2","https://www.youtube.com/embed/lFXpmYK6SEQ?si=ST7PEhbKDTO01ZAF&amp;start=5"]
  const wrapper = ["#1 Most Popular", "#2 Most Popular", "#3 Most Popular", "#4 Most Popular"];

  const wrapperName = ["KIMETSU NO YAIBA", "ATTACK ON TITANS", "NANATSU NO TAIZAI", " BOKU NO HERO ACADEMIA"];

  const wrapperDescription = ["In the Taisho era, Tanjiro Kamado, a young man who sells charcoal to support his family, returns home to find everyone murdered by the demon Muzan Kibutsuji. His only surviving family, his sister Nezuko, becomes a demon but struggles not to harm Tanjiro.",
    "The story is set in a fictional world on the brink of extinction due to titans, giant humanoid creatures. Humanity takes refuge within three colossal walls to protect themselves from the titans. Eren Jaeger, after losing his mother to the titans. Later on, Eren discovers that he can transform into a titan with special abilities, triggering crucial events in the plot.",
    "Meliodas defeated the Great Holy Knight Hendrickson; however, he had only been manipulated to break the seal that contained the Ten Commandments, powerful warriors who work directly under the orders of the Demon King, to whom Meliodas once belonged as well.",
    "Izuku Midoriya, a young boy living in a world where over half of the population has developed superpowers, giving rise to both heroes and villains. His greatest dream is to become a hero like his idol 'All Might,' a superhero with an American design and imagery who fights against evil."
  ];

  const [indice, setIndice] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentClubIndex, setCurrentClubIndex] = useState(0);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
  const [currentDescripIndex, setCurrentDescripIndex] = useState(0);
  const [currentWrapperIndex, setCurrentWrapperIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const clubImageRefs = Array.from({ length: clubImages.length }, () => useRef(null));
  const updateImages = () => {
    clubImageRefs.forEach((ref, index) => {
      ref.current.src = clubImages[(currentClubIndex + index) % clubImages.length];
    });
  };

  const mostrarTexto = () => {
    return (
      <div className="text-wrapper-7">
        {
          textos[indice]
        } </div>
    );
  };

  const handleClickPrev = () => {
    setIndice((indice - 1 + textos.length) % textos.length);
    setCurrentImageIndex((currentImageIndex - 1 + wallpaperImages.length) % wallpaperImages.length);
    setCurrentClubIndex((currentClubIndex - 1 + clubImages.length) % clubImages.length);
    setCurrentSeriesIndex((currentSeriesIndex - 1 + wrapperName.length) % wrapperName.length);
    setCurrentDescripIndex((currentDescripIndex - 1 + wrapperDescription.length) % wrapperDescription.length)
    setCurrentWrapperIndex((currentWrapperIndex - 1 + wrapper.length) % wrapper.length);
    setCurrentVideoIndex((currentVideoIndex - 1 + videoImages) % videoImages.length);
    updateImages()
  };

  const handleClickNext = () => {
    setIndice((indice + 1) % textos.length);
    setCurrentImageIndex((currentImageIndex + 1) % wallpaperImages.length);
    setCurrentClubIndex((currentClubIndex + 1) % clubImages.length);
    setCurrentSeriesIndex((currentSeriesIndex + 1) % wrapperName.length);
    setCurrentDescripIndex((currentDescripIndex + 1) % wrapperDescription.length);
    setCurrentWrapperIndex((currentWrapperIndex + 1) % wrapper.length);
    setCurrentVideoIndex((currentVideoIndex + 1) % videoImages.length);
    updateImages()
  };

  return (
    <div className="container">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img className="wallpaperflare" alt="Wallpaperflare"
            src={wallpaperImages[currentImageIndex]} />
          <Navbar />
          <Slide clubImages={clubImages}
            wallpaperImages={wallpaperImages}
            currentImageIndex={currentImageIndex}
            currentClubIndex={currentClubIndex}
            clubImageRefs={clubImageRefs}
            updateImages={updateImages} />
          <Wrapper name={wrapperName[currentSeriesIndex]} description={wrapperDescription[currentDescripIndex]} wrappertop={wrapper[currentWrapperIndex]} video={videoImages[currentVideoIndex]} />
          <div className="bottom-marks">
            <button id="prev" onClick={handleClickPrev}><Icon icon={faAngleLeft} css='' /></button>
            <button id="next" onClick={handleClickNext}><Icon icon={faAngleRight} css='' /></button>
            <img className="vector" alt="Vector" src="/img/Vector 3.png" />
            {mostrarTexto()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
