import reviewImg from "../assets/google-review.webp";
import { profile } from "../data/profile";

/** "Share Your Experience – Submit Review" badge (201 × 67, image is cropped like in the design). */
export default function ReviewBadge() {
  return (
    <a
      href={profile.reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share your experience on Google – submit a review"
      className="mx-auto mt-[37.75px] block h-[67px] w-[201px] overflow-hidden rounded-[2px] outline-offset-4 transition-transform duration-300 hover:scale-105 active:scale-100"
    >
      <img src={reviewImg} alt="" width="201" height="85" className="-mt-[9.1px] block h-[85.3px] w-[201px] max-w-none" />
    </a>
  );
}
