import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS, BLOG_POSTS, SITE_INFO } from '../data/siteData';
import { BlogPost } from '../types';
import { HeroSvgPattern } from '../components/HeroSvgPattern';

interface GalleryBlogPageProps {
  onNavigate: (path: string) => void;
  initialTab?: 'gallery' | 'blog';
}

export const GalleryBlogPage: React.FC<GalleryBlogPageProps> = ({ onNavigate, initialTab = 'gallery' }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'blog'>(initialTab);
  
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Single blog post state
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          setLightboxIndex(null);
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex(prev => (prev === null || prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex(prev => (prev === null || prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1));
        }
      }

      if (selectedPost && e.key === 'Escape') {
        setSelectedPost(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, selectedPost]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevPhoto = () => {
    setLightboxIndex(prev => (prev === null || prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setLightboxIndex(prev => (prev === null || prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* PAGE HERO with Aperture / Solar Lens Light & High-Visibility SVG Pattern */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50 via-white to-white border-b border-slate-200/60 overflow-hidden">
        {/* Soft, delicate Crystalline Photovoltaic SVG Pattern */}
        <HeroSvgPattern opacity={0.18} />

        {/* Dynamic Lens / Solar Flare Ring SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-35 overflow-hidden" aria-hidden="true">
          <svg className="absolute -top-12 -right-8 w-[720px] h-[520px]" viewBox="0 0 720 520">
            <defs>
              <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#fb7185" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="560" cy="140" r="300" fill="none" stroke="url(#lensGrad)" strokeWidth="1.2" strokeDasharray="10 6" />
            <circle cx="560" cy="140" r="220" fill="none" stroke="rgba(244, 63, 94, 0.25)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="560" cy="140" r="140" fill="none" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" />
            <line x1="260" y1="140" x2="860" y2="140" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <a
              href="solartechsystems.html"
              onClick={(e) => { e.preventDefault(); onNavigate('solartechsystems.html'); }}
              className="hover:text-rose-600 transition-colors"
            >
              Home
            </a>
            <span>/</span>
            <span className="text-rose-600">Gallery &amp; Blog</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Gallery <span className="text-rose-600">&amp; Insights</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Project photography from Solar Tech Systems installations across Karnataka, paired with technical articles on renewable power engineering.
          </p>

          {/* TAB CONTROLS */}
          <div className="pt-6 flex items-center gap-4 border-b border-slate-200">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'gallery'}
              onClick={() => { setActiveTab('gallery'); setSelectedPost(null); }}
              className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Project Gallery ({GALLERY_PHOTOS.length})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'blog'}
              onClick={() => { setActiveTab('blog'); }}
              className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'blog'
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Technical Blog &amp; Articles ({BLOG_POSTS.length})
            </button>
          </div>
        </div>
      </section>

      {/* TAB PANEL: GALLERY */}
      {activeTab === 'gallery' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            <div className="text-xs sm:text-sm text-slate-500">
              Showing all <strong className="text-slate-900">{GALLERY_PHOTOS.length}</strong> project photographs from Karnataka. Click any photo to expand into the high-resolution lightbox viewer.
            </div>

            {/* Masonry Columns Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
            <div className="masonry-columns">
              {GALLERY_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.file}
                  className="masonry-item group relative overflow-hidden rounded-2xl bg-slate-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={`/images/gallery/${photo.file}`}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle dark gradient overlay with title on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <span className="text-xs font-semibold text-rose-400">Solar Tech Systems</span>
                    <h4 className="text-sm font-bold text-white leading-tight mt-0.5">{photo.title}</h4>
                    {photo.caption && (
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">{photo.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB PANEL: BLOG */}
      {activeTab === 'blog' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            
            {/* If a single post is opened, display reader view */}
            {selectedPost ? (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-4 py-2 rounded-full cursor-pointer"
                >
                  &larr; Back to All Articles
                </button>

                <article className="solar-glass-card p-8 sm:p-12 rounded-3xl space-y-8">
                  {/* Metadata */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-rose-600">{selectedPost.category}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{selectedPost.date}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{selectedPost.readTime}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                      {selectedPost.title}
                    </h1>

                    <div className="pt-2 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">{selectedPost.author}</span>
                      <span className="mx-2 text-slate-400">|</span>
                      <span className="text-slate-500">{selectedPost.authorRole}</span>
                    </div>
                  </div>

                  {/* Featured Hero Image */}
                  <div className="rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={selectedPost.featuredImage}
                      alt={selectedPost.title}
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900">
                      Key Engineering Insights
                    </h3>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      {selectedPost.keyPoints.map((pt, i) => (
                        <li key={i} className="pl-3 border-l-2 border-rose-400">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Article Prose */}
                  <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    {selectedPost.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Consultation Footer */}
                  <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      Published by Solar Tech Systems Engineering Department
                    </div>
                    <a
                      href="contact-us.html"
                      onClick={(e) => { e.preventDefault(); onNavigate('contact-us.html'); }}
                      className="text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 px-5 py-2.5 rounded-full transition-colors"
                    >
                      Discuss Your Project &rarr;
                    </a>
                  </div>
                </article>

                {/* Related Articles */}
                <div className="pt-8 space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {BLOG_POSTS.filter(b => b.id !== selectedPost.id).slice(0, 2).map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => { setSelectedPost(rel); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                        className="solar-glass-card p-5 rounded-2xl transition-all cursor-pointer space-y-3"
                      >
                        <span className="text-xs font-semibold text-rose-600">{rel.category}</span>
                        <h4 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-sky-600 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* All Blog Cards Listing */
              <div className="space-y-8">
                <div className="max-w-2xl space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Latest Technical Insights &amp; Project Studies
                  </h2>
                  <p className="text-sm text-slate-600">
                    Original articles authored by our power engineers, covering megawatt open-access solar, rooftop net metering, and 33 kV grid infrastructure.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {BLOG_POSTS.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => { setSelectedPost(post); window.scrollTo({ top: 380, behavior: 'smooth' }); }}
                      className="group solar-glass-card rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                    >
                      <div>
                        {/* Image slot */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-800 shadow-sm">
                            {post.category}
                          </span>
                        </div>

                        {/* Text */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{post.date}</span>
                            <span aria-hidden="true">&middot;</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          By <span className="font-semibold text-slate-700">{post.author}</span>
                        </div>
                        <span className="text-xs font-semibold text-rose-600 group-hover:text-rose-700">
                          Read Article &rarr;
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Close button text */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 z-50 px-4 py-2 rounded-full bg-white/10 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close &times;
          </button>

          {/* Previous button text */}
          <button
            onClick={prevPhoto}
            aria-label="Previous Photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer hidden sm:block"
          >
            &larr; Prev
          </button>

          {/* Next button text */}
          <button
            onClick={nextPhoto}
            aria-label="Next Photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer hidden sm:block"
          >
            Next &rarr;
          </button>

          {/* Lightbox Image Container */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-3">
            <img
              src={`/images/gallery/${GALLERY_PHOTOS[lightboxIndex].file}`}
              alt={GALLERY_PHOTOS[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center text-white space-y-1">
              <h4 className="text-sm sm:text-base font-semibold">
                {GALLERY_PHOTOS[lightboxIndex].title}
              </h4>
              <p className="text-xs text-slate-400">
                {GALLERY_PHOTOS[lightboxIndex].caption} &bull; Photo {lightboxIndex + 1} of {GALLERY_PHOTOS.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA BAND */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background SVG Sun Flare Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
            <path d="M 0 150 Q 400 0 800 150" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 0 200 Q 400 50 800 200" fill="none" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Send us the details and we will help you plan the right solar setup.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="contact-us.html"
              onClick={(e) => { e.preventDefault(); onNavigate('contact-us.html'); }}
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all"
            >
              <span>Enquire Now &rarr;</span>
            </a>
            <a
              href={SITE_INFO.phoneHref}
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-slate-200 border border-slate-600 hover:bg-slate-800 transition-all"
            >
              <span>Call: {SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
