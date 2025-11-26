import { Footer } from "~/app/_components/footer";
import { MainNav } from "./main-nav";
import { api } from "~/trpc/server";
import { HeroSection } from "./landingpage/hero-section";
import { LatestPostsSection } from "./landingpage/latest-posts-section";
import { FeaturesSection } from "./landingpage/features-section";
import { CTASection } from "./landingpage/cta-section";

export default async function LandingPage() {
  const data = await api.post.getLatestPosts({ limit: 8 });
  const posts = data?.posts ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <MainNav
        isLoggedIn={false}
        links={["explore", "about", "contact"]}
        showSearchBar={false}
      />

      <main className="flex-1">
        <HeroSection />
        <LatestPostsSection posts={posts} />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
