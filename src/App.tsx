import { AnimationEvent, CSSProperties, useState } from "react"
import { cards } from "./cards"
import clsx from "clsx"
import { Credits } from "./components/credits"

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  function handleClick() {
    if(isPlaying) return 

    setIsPlaying(true)
  }

  function handleAnimationEnd(e: AnimationEvent) {
    const target = e.target as HTMLElement ;
    const index = +target.dataset.index!
    if(index != 0) return 

    setIsPlaying(false)
  }

  return (
    <section className="h-dvh min-h-[500px] w-full bg-gray-200 flex flex-col gap-20 pb-20 lg:pb-0 justify-end lg:justify-center">
      <Credits />
      <section className="relative w-full flex px-3 lg:justify-center h-44">
        {cards.map((item, index, array) => (
          <div
            key={index}
            style={{ 
              "--delay": `${(array.length - 1 - index) * 1.2}s`, 
              zIndex: 6 + index,
              // the new value of zIndex after animation  
              "--Zindex": 5 + index
            } as CSSProperties}
            data-index={index} 
            onAnimationEnd={handleAnimationEnd}
            className={clsx( "absolute", isPlaying && "move" )}
          >
            <div
              style={{ transform: `rotate(${item.rotate})` }}
              className="w-44 h-44 border-4 border-white"
            >
              <img className="w-full h-full object-cover" src={item.image} />
            </div>
          </div>
        ))}
      </section>

      <div className="w-full flex justify-center">
        <span
          onClick={handleClick}
          className={clsx(
            "text-white bg-blue-600 px-8 py-2 font-medium rounded-full duration-150 ease-out",
            isPlaying ? 'opacity-0 cursor-default' : 'opacity-100 cursor-pointer'
          )}
        >
          Play
        </span>
      </div>
    </section>
  )
}

export default App
