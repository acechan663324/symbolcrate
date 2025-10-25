import React from 'react';
import { BlogPost } from '../constants/blogPosts';

interface BlogPostCardProps {
  post: BlogPost;
  onSelect: (slug: string) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(post.slug)}
      className="group flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
      role="article"
    >
      {post.coverImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
          {post.title}
        </h3>
        <p className="mt-3 text-gray-500 text-sm flex-grow">
          {post.description}
        </p>
        <div className="mt-4">
          <span className="inline-flex items-center font-semibold text-sm text-purple-600 group-hover:underline">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
