import HeroSection from "../components/Home/HeroSection";
import ChiffresCles from "../components/Home/ChiffresCles";
import ActualitesSection from "../components/Home/ActualitesSection";
import ServicesSection from "../components/Home/ServicesSection";
import CTABanner from "../components/Home/CTABanner";
import PageWrapper from "../components/layout/PageWrapper";
import usePosts from "../hooks/usePosts";
import useServices from "../hooks/useServices";

function HomePage() {
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    retry: retryPosts,
  } = usePosts(3);
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    retry: retryServices,
  } = useServices(4);

  return (
    <PageWrapper>
      <HeroSection />
      <ChiffresCles />
      <ActualitesSection
        posts={posts}
        loading={postsLoading}
        error={postsError}
        onRetry={retryPosts}
      />
      <ServicesSection
        services={services}
        loading={servicesLoading}
        error={servicesError}
        onRetry={retryServices}
      />
      <CTABanner />
    </PageWrapper>
  );
}

export default HomePage;
