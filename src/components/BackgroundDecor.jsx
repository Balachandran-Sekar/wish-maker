import balloon from "../assets/balloon.png";
import balloon2 from "../assets/balloon2.png";
import heart from "../assets/heart.png";
import heart2 from "../assets/heart2.png";
import star from "../assets/star.png";
import star2 from "../assets/star2.png";
import wish from "../assets/wish.png";
import wish2 from "../assets/wish2.png";

export default function BackgroundDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Balloon */}
      <img
        src={balloon}
        className="w-24 absolute top-10 left-10 animate-floatSlow opacity-80"
      />

      {/* Heart */}
      <img
        src={heart}
        className="w-16 absolute top-1/3 right-16 animate-floatMedium opacity-70"
      />

      {/* Star */}
      <img
        src={star}
        className="w-14 absolute bottom-24 left-1/4 animate-floatFast opacity-60"
      />

      {/* Balloon 2 */}
      <img
        src={balloon2}
        className="w-20 absolute top-1/2 right-20 animate-floatSlow opacity-75"
      />

      {/* Heart 2 */}
      <img
        src={heart2}
        className="w-12 absolute bottom-1/3 left-16 animate-floatFast opacity-65"
      />

      {/* Star 2 */}
      <img
        src={star2}
        className="w-16 absolute top-20 right-1/4 animate-floatMedium opacity-70"
      />

      {/* Wish */}
      <img
        src={wish}
        className="w-18 absolute bottom-16 right-1/3 animate-floatSlow opacity-80"
      />

      {/* Wish 2 */}
      <img
        src={wish2}
        className="w-14 absolute top-1/4 left-1/3 animate-floatFast opacity-60"
      />
    </div>
  );
}
