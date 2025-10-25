import React from 'react';
import { BlogPost } from '../constants/blogPosts';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
          aria-label="Back to blog list"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>
      </div>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {post.coverImage && (
            <div className="w-full h-64 sm:h-80">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>
        )}
        <div className="p-6 sm:p-8 lg:p-10">
            <header>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500">
                {post.description}
            </p>
            </header>

            <div className="prose prose-lg max-w-none mt-8 text-gray-600">
            {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            </div>
        </div>
      </article>

      <style>{`
        .prose {
            line-height: 1.75;
        }
        .prose p {
            margin-bottom: 1.25em;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BlogPostDetail;
