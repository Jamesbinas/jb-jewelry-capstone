import './Story.css'

function Story() {
  return (
    <section className="story">
      <div className="story-content">
        <p className="story-label">Our Story</p>
        <h2 className="story-title">A Legacy Built By Hand</h2>
        <p className="story-text">
          JB Jewelry was built from passion, patience, and a love for beautiful things. 
          Decades later, our grandfather still walks into that shop every single day — 
        </p>
        <p className="story-text">
          Every ring, necklace, and bracelet carries that same dedication. 
          This isn't just a jewelry store. It's a lifetime of craft.
        </p>
      </div>
      <div className="story-image">
        <img src="/src/assets/pics.jpg" className="story-placeholder" alt="JB Jewelry"/>
        <p className="story-caption">Est. decades ago — still going strong</p>
      </div>
    </section>
  )
}

export default Story