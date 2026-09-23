import { PageHeader } from "@/components/ui/PageHeader";
import { ReviewsClient } from "./ReviewsClient";
import { reviews, ratingDistribution, TOTAL_GOOGLE_REVIEWS, AVERAGE_RATING } from "@/lib/demo-data";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reviews"
        description="Every Google review for Oak & Stone Property Services, in one place."
      />
      <ReviewsClient
        reviews={reviews}
        ratingDistribution={ratingDistribution}
        totalReviews={TOTAL_GOOGLE_REVIEWS}
        averageRating={AVERAGE_RATING}
      />
    </div>
  );
}
