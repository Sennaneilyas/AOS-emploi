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
  } = usePosts({ perPage: 3 });
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    retry: retryServices,
  } = useServices(4);

  return (
    <PageWrapper>
      <HeroSection />
      <div className="h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
      <ChiffresCles />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <ActualitesSection
        posts={posts}
        loading={postsLoading}
        error={postsError}
        onRetry={retryPosts}
      />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <ServicesSection
        services={services}
        loading={servicesLoading}
        error={servicesError}
        onRetry={retryServices}
      />
      <div className="h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
      <CTABanner />
    </PageWrapper>
  );
}

export default HomePage;
