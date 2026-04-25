import { useState, useEffect } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import PostList from "../components/actualities/PostList";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorBanner from "../components/common/ErrorBanner";
import EmptyState from "../components/common/EmptyState";
import usePosts from "../hooks/usePosts";
import { useLang } from "../context/LangContext";
import { CATEGORIES, POSTS_PER_PAGE } from "../mocks/actualities";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

const pageContent = {
  fr: {
    title: "Actualités & Événements",
    subtitle: "Découvrez les dernières mises à jour, annonces officielles et activités de l'AOS Emploi.",
    searchPlaceholder: "Rechercher une actualité...",
    filterBy: "Filtrer par :",
    all: "Toutes",
    noResults: "Aucun résultat trouvé pour votre recherche.",
    clearFilters: "Effacer les filtres",
    pagination: {
      prev: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur"
    },
    retryLabel: "Réessayer",
  },
  ar: {
    title: "الأخبار والمستجدات",
    subtitle: "اكتشف آخر التطورات والإعلانات الرسمية والأنشطة الخاصة بجمعية الأعمال الاجتماعية.",
    searchPlaceholder: "البحث عن خبر...",
    filterBy: "تصفية حسب:",
    all: "الكل",
    noResults: "لم يتم العثور على نتائج لبحثك.",
    clearFilters: "مسح التصفية",
    pagination: {
      prev: "السابق",
      next: "التالي",
      page: "صفحة",
      of: "من"
    },
    retryLabel: "إعادة المحاولة",
  },
};

function ActualitiesPage() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = pageContent[lang];

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { posts, totalPages, total, loading, error, retry } = usePosts({
    category: selectedCategory,
    search: debouncedSearch,
    page: currentPage,
    perPage: POSTS_PER_PAGE,
  });

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  return (
    <PageWrapper>
      {/* Header Section with Pattern */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 md:pt-44 md:pb-32 text-white">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full bg-white/10 px-5 py-1.5 mb-6 border border-white/20 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              {isArabic ? "آخر الأخبار" : "Dernières Nouvelles"}
            </span>
          </div>
          
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl ${
              isArabic ? "font-bold leading-tight" : "font-extrabold tracking-tight"
            }`}
          >
            {t.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters & Search Bar Section */}
      <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="block w-full ps-11 pe-4 py-2.5 bg-gray-50 border border-gray-200 text-navy text-sm rounded-xl focus:ring-navy focus:border-navy transition-all"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-navy"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Categories Scrollable Area */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <span className="hidden md:inline text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {t.filterBy}
              </span>
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? "bg-navy text-white shadow-md shadow-navy/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {isArabic ? cat.label_ar : cat.label_fr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-12 md:py-16 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Results Summary */}
          {!loading && !error && (searchQuery || selectedCategory !== "all") && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {isArabic ? (
                  <>تم العثور على <span className="font-bold text-navy">{total}</span> نتائج</>
                ) : (
                  <><span className="font-bold text-navy">{total}</span> résultats trouvés</>
                )}
              </p>
              <button 
                onClick={clearFilters}
                className="text-sm font-bold text-brand-orange hover:underline flex items-center gap-1"
              >
                <X size={14} />
                {t.clearFilters}
              </button>
            </div>
          )}

          {/* Grid of Posts */}
          <div className="mt-4">
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <SkeletonCard count={6} />
              </div>
            ) : null}

            {!loading && error ? (
              <ErrorBanner message={error} onRetry={retry} retryLabel={t.retryLabel} />
            ) : null}

            {!loading && !error && posts.length === 0 ? (
              <EmptyState 
                message={searchQuery ? t.noResults : t.emptyMessage} 
                action={searchQuery ? (
                  <button 
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
                  >
                    {t.clearFilters}
                  </button>
                ) : null}
              />
            ) : null}

            {!loading && !error && posts.length > 0 ? (
              <>
                <PostList posts={posts} />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 bg-white text-navy hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">{t.pagination.prev}</span>
                      <ChevronLeft size={20} className="rtl:rotate-180" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">{t.pagination.page}</span>
                      <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-navy text-white text-sm font-bold">
                        {currentPage}
                      </span>
                      <span className="text-sm font-medium text-gray-500">{t.pagination.of} {totalPages}</span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 bg-white text-navy hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">{t.pagination.next}</span>
                      <ChevronRight size={20} className="rtl:rotate-180" />
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default ActualitiesPage;
