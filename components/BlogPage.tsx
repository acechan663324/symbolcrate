import React from 'react';
import { BlogPost } from '../constants/blogPosts';
import BlogPostCard from './BlogPostCard';

interface BlogPageProps {
  posts: BlogPost[];
  onPostSelect: (slug: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onPostSelect }) => {
  const featuredPost = posts.find(p => p.featured);
  const otherPosts = posts.filter(p => !p.featured);

  if (!featuredPost) {
    return <p className="text-center text-gray-500">No featured blog post found.</p>;
  }

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8 tracking-tight">
        Nickname Generation Guides
      </h1>

      {/* Featured Post */}
      <section className="mb-12">
        <div
          onClick={() => onPostSelect(featuredPost.slug)}
          className="group relative block w-full rounded-xl shadow-2xl overflow-hidden cursor-pointer h-[450px] bg-gray-900"
        >
          {featuredPost.coverImage && (
            <img
              src={featuredPost.coverImage}
              alt="" // Decorative image
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-300">
                Featured Guide
              </h2>
              <h3 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight">
                {featuredPost.title}
              </h3>
              <p className="mt-4 text-lg text-gray-200 max-w-3xl hidden sm:block">
                {featuredPost.description}
              </p>
              <div className="mt-6 inline-flex items-center font-semibold text-white group-hover:underline">
                Read the full guide
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Posts Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map(post => (
            <BlogPostCard key={post.slug} post={post} onSelect={onPostSelect} />
          ))}
        </div>
      </section>
      
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default BlogPage;
